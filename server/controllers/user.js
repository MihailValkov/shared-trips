const userModel = require('../models/User');
const jwt = require('../utils/jwt');
const createErrorMessage = require('../utils/create-error-message');
const { cookie_name } = require('../config/config');
const { removeUserPassword } = require('../utils/removeSafeData');
const Logger = require('../models/Logger');

const createToken = ({ _id, email, avatarImg, status, gender }) => jwt.create({ _id, email, avatarImg, status, gender });
const bsonToJson = data => JSON.parse(JSON.stringify(data));

module.exports = {
    get: {
        async profile(req, res) {
            try {
                const user = await userModel.findById(req.user._id).populate({ path: 'createdTrips', populate: { path: 'buddies' } }).lean();
                const data = removeUserPassword(bsonToJson(user));
                return res.status(200).json(data);
            } catch (error) {
                return res.status(404).json({ message: 'Not Found 404' });
            }
        },
        async logout(req, res, next) {
            const info = {
                email: req?.user.email,
                avatarImg: req?.user.avatarImg,
                action: 'leave',
                message: 'logged out',
                status: req?.user.status
            };
            try {
                await Logger.create(info);
                await userModel.findByIdAndUpdate(req.user._id, { isOnline: false });
                req.user = null;
                res.status(204).clearCookie(cookie_name, { maxAge: 0, httpOnly: true }).json({ message: 'Logout is successful' });
            } catch (error) {
                return res.status(400).json({ message: 'Something went wrong please try again' });
            }

        },
    },
    post: {
        async login(req, res, next) {
            const { email, password } = req.body;
            if (email == '' || password == '') {
                return res.status(400).json({ message: 'All fields are required!' });
            }
            try {
                const user = await userModel.findOne({ 'email': { '$regex': email, $options: 'i' } });
                if (!user) {
                    return res.status(409).json({ message: 'Email or Password don\'t match!' });
                }
                const match = await user.comparePasswords(password);
                if (!match) {
                    return res.status(409).json({ message: 'Email or Password don\'t match!' });
                }
                const token = createToken(user);
                user.isOnline = true;
                user.save();
                const data = removeUserPassword(bsonToJson(user));
                const info = {
                    email: data.email,
                    avatarImg: data.avatarImg,
                    action: 'join',
                    message: 'was logged-in',
                    status: data.status
                };

                await Logger.create(info);
                res.cookie(cookie_name, token).status(200).json(data);
            } catch (error) {
                if (error instanceof TypeError) {
                    console.log(error);
                } else {
                    const message = createErrorMessage(error);
                    res.status(400).json({ message });
                }
            }
        },
        async register(req, res, next) {
            const { email, password, repeatPassword, gender } = req.body;
            if (password != repeatPassword) {
                return res.status(409).json({ message: 'Passwords don\'t match!' });
            }
            let user = await userModel.findOne({ 'email': { '$regex': email, $options: 'i' } });
            if (user) {
                return res.status(409).json({ message: 'Email is already taken!' });
            }
            try {
                user = await userModel.create({ email, password, gender, isOnline: true });
                const token = createToken(user);
                const data = removeUserPassword(bsonToJson(user));

                const info = {
                    email: user.email,
                    avatarImg: user.avatarImg,
                    action: 'create',
                    message: 'account was created',
                    status: 'Member'
                };

                await Logger.create(info);

                res.cookie(cookie_name, token, { httpOnly: true }).status(201).json(data);
            } catch (error) {
                if (error instanceof TypeError) {
                    console.log(error);
                } else {
                    const message = createErrorMessage(error);
                    res.status(400).json({ message });
                }
            }
        },
        async editProfile(req, res, next) {
            const { city, company, password, repeatPassword, profession, username } = req.body;
            if (password != repeatPassword) {
                return res.status(409).json({ message: 'Passwords don\'t match!' });
            }

            try {
                const user = await userModel.findOne({ 'email': { '$regex': req.user.email, $options: 'i' } });
                Object.assign(user, { city, company, password, profession, username });
                user.save();
                const data = removeUserPassword(bsonToJson(user));
                const info = {
                    email: data.email,
                    avatarImg: data.avatarImg,
                    action: 'update',
                    message: `updated ${data.gender == 'male' ? 'his' : 'her'} profile information`,
                    status: data.status
                };

                await Logger.create(info);
                res.status(200).json(data);
            } catch (error) {
                if (error instanceof TypeError) {
                    console.log(error);
                } else {
                    const message = createErrorMessage(error);
                    res.status(400).json({ message });
                }
            }

        },
        async editUserPhoto(req, res) {
            const { avatarImg, coverImg } = req.body;
            try {
                const user = await userModel.findOne({ 'email': { '$regex': req.user.email, $options: 'i' } });
                Object.assign(user, avatarImg ? { avatarImg } : { coverImg });
                user.save();
                const data = removeUserPassword(bsonToJson(user));
                const info = {
                    email: data.email,
                    avatarImg: data.avatarImg,
                    action: 'update',
                    message: `updated ${data.gender == 'male' ? 'his' : 'her'} ${avatarImg ? 'avatar' : 'cover'} image`,
                    status: data.status
                };

                await Logger.create(info);
                res.status(200).json(data);
            } catch (error) {
                if (error instanceof TypeError) {
                    console.log(error);
                } else {
                    const message = createErrorMessage(error);
                    res.status(400).json({ message });
                }
            }
        }
    }
};