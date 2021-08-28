const Logger = require('../models/Logger');
const tripModel = require('../models/Trip');
const userModel = require('../models/User');
const createErrorMessage = require('../utils/create-error-message');
const { removeUserPassword } = require('../utils/removeSafeData');

const bsonToJson = data => JSON.parse(JSON.stringify(data));
module.exports = {
    get: {
        async statistics(req, res, next) {
            try {
                const totalUsers = await userModel.countDocuments({});
                const totalAdmins = await userModel.countDocuments({ status: 'Admin' });
                const onlineUsers = await userModel.countDocuments({ isOnline: true });
                const totalTrips = await tripModel.countDocuments({});
                res.status(200).json({ totalUsers, totalAdmins, totalTrips, onlineUsers });
            } catch (error) {
                return res.status(404).json({ message: 'Not Found 404' });
            }
        },
        async logs(req, res, next) {
            try {
                const admin = await Logger.find({ status: 'Admin' }).sort({ time: -1 }).limit(5).lean();
                const member = await Logger.find({ status: 'Member' }).sort({ time: -1 }).limit(5).lean();
                res.status(200).json({ admin, member });
            } catch (error) {
                return res.status(404).json({ message: 'Not Found 404' });
            }
        },
        async expensiveTrips(req, res, next) {
            try {
                const trips = await tripModel.find({}).sort({ price: 'desc' }).limit(10).populate('creator').lean();
                const data = trips.reduce((a, b) => a.concat({ destination: `${b.startPoint} - ${b.endPoint}`, creator: b.creator.email, price: +b.price }), []);
                res.status(200).json({ trips: data });
            } catch (error) {
                return res.status(404).json({ message: 'Not Found 404' });
            }
        },
        async deleteUserById(req, res, next) {
            const { id } = req.params;
            try {
                const user = await userModel.findByIdAndDelete(id).lean();
                await tripModel.deleteMany({ creator: user._id });
                const info = {
                    email: req.user.email,
                    avatarImg: req.user.avatarImg,
                    action: 'remove',
                    message: `delete ${user.email}'s account and ${user.gender === 'male' ? 'his' : 'her'} trips`,
                    status: req.user.status
                };
                await Logger.create(info);
                return res.status(200).json({ message: 'resource deleted successfully' });
            } catch (error) {
                return res.status(404).json({ message: 'Not Found 404' });
            }
        },
        async getUserById(req, res, next) {
            const { id } = req.params;
            try {
                const user = await userModel.findById(id).populate({ path: 'createdTrips', populate: { path: 'buddies' } }).lean();
                const data = removeUserPassword(bsonToJson(user));
                return res.status(200).json(data);
            } catch (error) {
                return res.status(404).json({ message: 'Not Found 404' });
            }
        },
        async getUsers(req, res, next) {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const regex = new RegExp(req.query.search || '', 'i');
            const searchParams = { [req.query.filter]: regex };
            const skipIndex = (page - 1) * limit;
            try {
                const count = req.query.search ? await userModel.countDocuments(searchParams) : await userModel.countDocuments({});
                const users = await userModel.find(req.query.filter ? searchParams : {}).sort({ _id: 1 }).limit(limit).skip(skipIndex).lean();
                const data = users.map(removeUserPassword);
                return res.status(200).json({ users: data, count });
            } catch (error) {
                return res.status(404).json({ message: 'Not Found 404' });
            }
        },
        async getTrips(req, res, next) {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const regex = new RegExp(req.query.search || '', 'i');
            const searchParams = { [req.query.filter]: req.query.filter == 'seats' || req.query.filter == 'price' ? Number(req.query.search) : regex };
            const skipIndex = (page - 1) * limit;
            try {
                const count = req.query.search ? await tripModel.countDocuments(searchParams) : await tripModel.countDocuments({});
                const trips = await tripModel.find(req.query.filter ? searchParams : {}).sort({ _id: 1 }).limit(limit).skip(skipIndex).populate('creator').lean();
                res.status(200).json({ trips, count });
            } catch (error) {
                return res.status(404).json({ message: 'Not Found 404' });
            }
        },
        async deleteTripById(req, res, next) {
            const { id } = req.params;
            try {
                const trip = await tripModel.findByIdAndDelete(id).populate('creator').lean();
                const info = {
                    email: req.user.email,
                    avatarImg: req.user.avatarImg,
                    action: 'remove',
                    message: `delete ${trip.creator.email}'s trip`,
                    status: req.user.status
                };
                await Logger.create(info);
                return res.status(200).json({ message: 'resource deleted successfully' });
            } catch (error) {
                return res.status(404).json({ message: 'Not Found 404' });
            }
        }
    },
    post: {
        async updateUser(req, res, next) {
            const { id } = req.params;
            const { city, company, email, password, repeatPassword, profession, username, status } = req.body;
            if (password != repeatPassword) {
                return res.status(409).json({ message: 'Passwords don\'t match!' });
            }

            try {
                const user = await userModel.findById(id);
                Object.assign(user, { city, company, profession, username, email, status });
                if (password !== '') { Object.assign(user, { password }); }
                user.save();
                const data = removeUserPassword(bsonToJson(user));
                const info = {
                    email: req.user.email,
                    avatarImg: req.user.avatarImg,
                    action: 'update',
                    message: `update ${user.username}'s profile information`,
                    status: req.user.status
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
        async updateUserAvatar(req, res) {
            const { avatarImg } = req.body;
            const { id } = req.params;
            try {
                const user = await userModel.findById(id);
                Object.assign(user, { avatarImg });
                user.save();
                const data = removeUserPassword(bsonToJson(user));
                const info = {
                    email: req.user.email,
                    avatarImg: req.user.avatarImg,
                    action: 'update',
                    message: `update ${req.user._id === data._id ? 'his own' : `${data.username}'s`} avatar image`,
                    status: req.user.status
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