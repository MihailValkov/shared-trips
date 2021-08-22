const Logger = require('../models/Logger');
const tripModel = require('../models/Trip');
const userModel = require('../models/User');
const createErrorMessage = require('../utils/create-error-message');
const { removeUserPassword } = require('../utils/removeSafeData');
const bsonToJson = data => JSON.parse(JSON.stringify(data));

module.exports = {
    get: {
        async list(req, res) {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const skipIndex = (page - 1) * limit;
            try {
                const count = await tripModel.countDocuments({});
                const trips = await tripModel.find().sort({ _id: 1 }).limit(limit).skip(skipIndex).lean();
                res.status(200).json({ trips, count });
            } catch (error) {
                return res.status(404).json({ message: 'Not Found 404' });
            }
        },
        async ownTrips(req, res) {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const skipIndex = (page - 1) * limit;
            try {
                const count = await tripModel.countDocuments({ creator: req.user._id });
                const trips = await tripModel.find({ creator: req.user._id }).sort({ _id: 1 }).limit(limit).skip(skipIndex).populate({ path: 'buddies' }).lean();
                res.status(200).json({ trips, count });
            } catch (error) {
                return res.status(404).json({ message: 'Not Found 404' });
            }
        },
        async item(req, res) {
            const { tripId } = req.params;
            try {
                const trip = await tripModel.findById(tripId).populate('buddies').populate('creator').lean();
                const info = {
                    isOwner: req.user && req.user._id == trip.creator?._id,
                    alreadyJoined: req.user && trip.buddies.findIndex(x => x._id == req.user._id) > -1
                };
                res.status(200).json({ trip, info });
            } catch (error) {
                return res.status(404).json({ message: 'Not Found 404' });
            }
        },
        async delete(req, res, next) {
            const { tripId } = req.params;
            try {
                const deletedTrip = await tripModel.findByIdAndRemove(tripId);
                const info = {
                    email: req.user.email,
                    avatarImg: req.user.avatarImg,
                    action: 'remove',
                    message: 'delete a trip',
                    status: req.user.status
                };
                await Logger.create(info);

                res.status(200).json(deletedTrip);
            } catch (error) {
                return res.status(404).json({ message: 'Not Found 404' });
            }
        },
        async join(req, res, next) {
            const userId = req.user._id;
            const { tripId } = req.params;
            try {
                const trip = await tripModel.findById(tripId).populate('creator').populate('buddies');
                if (userId == trip.creator._id) { return res.status(403).json({ message: 'Accessing the page or resource you were trying to reach is absolutely forbidden for some reason!' }); }
                if (trip.buddies.findIndex(x => x._id == userId) > -1) { return res.status(403).json({ message: 'User already joined!' }); }
                trip.seats--;
                trip.buddies.push(req.user);
                await trip.save();
                const info = {
                    email: req.user.email,
                    avatarImg: req.user.avatarImg,
                    action: 'join',
                    message: 'join to a trip',
                    status: req.user.status
                };
                const tripInfo = {
                    isOwner: req.user && req.user._id == trip.creator?._id,
                    alreadyJoined: trip.buddies.findIndex(x => x._id == req.user._id) > -1
                };
                await Logger.create(info);
                res.status(200).json({ trip, info: tripInfo });
            } catch (error) {
                return res.status(404).json({ message: 'Not Found 404' });
            }
        }
    },
    post: {
        async create(req, res) {
            const { startPoint, endPoint, date, time, carImage, carBrand, seats, price, description, smoking, eating, drinking, climatic } = req.body;
            const data = { startPoint, endPoint, date, time, carImage, carBrand, seats: +seats, price: +price, description, creator: req.user._id, smoking: !!smoking, eating: !!eating, drinking: !!drinking, climatic: !!climatic };
            try {
                const trip = await tripModel.create(data);
                let user = await userModel.findByIdAndUpdate({ _id: req.user._id }, { $addToSet: { createdTrips: trip._id } }, { new: true }).populate('createdTrips');
                const info = {
                    email: user.email,
                    avatarImg: user.avatarImg,
                    action: 'create',
                    message: 'create new trip',
                    status: user.status
                };
                await Logger.create(info);
                user = removeUserPassword(bsonToJson(user));
                res.status(201).json({ trip, user });
            } catch (error) {
                if (error instanceof TypeError) {
                    console.log(error);
                } else {
                    const message = createErrorMessage(error);
                    res.status(400).json({ message });
                }
            }
        },
        async edit(req, res, next) {
            const { startPoint, endPoint, date, time, carImage, carBrand, seats, price, description, smoking, eating, drinking, climatic } = req.body;
            const data = { startPoint, endPoint, date, time, carImage, carBrand, seats: +seats, price: +price, description, smoking: !!smoking, eating: !!eating, drinking: !!drinking, climatic: !!climatic };
            Object.assign(req.data.trip, data);
            try {
                const trip = await req.data.trip.save();
                const info = {
                    email: req.user.email,
                    avatarImg: req.user.avatarImg,
                    action: 'update',
                    message: `update ${req.user.gender == 'male' ? 'his' : 'her'} trip information`,
                    status: req.user.status
                };
                await Logger.create(info);
                res.status(200).json(trip);
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