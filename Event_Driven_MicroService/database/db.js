const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    userAction: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    payload: { type: Object, required: true },
});

const EventModel = mongoose.model('Event', eventSchema);

async function saveToDatabase(event) {
    const newEvent = new EventModel(event);
    await newEvent.save();
}

module.exports = { saveToDatabase };
