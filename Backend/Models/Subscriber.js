const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriberSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address'
        ],
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    }
});

const SubscriberModel = mongoose.model('subscribers', SubscriberSchema);
module.exports = SubscriberModel;
