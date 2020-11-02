const mongoose = require('mongoose');
const activitySchema = new mongoose.Schema({
    user: { type: String, ref: "User", required: true },
    day: {
        type: Date,
        default: Date.now()
    },
    activities: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ActivityType"
    }
    ],
    totalDuration: {
        type: Number,
        default: 0
    } 
});
const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;