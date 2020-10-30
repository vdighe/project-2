const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activityTypeSchema = new Schema({
    type: {
        type: String,
        enum: ["Run", "Bike", "Walk"],
        required: true,
    },
    name: {type:String, default:'',},
    distance: Number,
    duration: Number,
});

// pre-save the name to avoid the duplicates
activityTypeSchema.pre('save', async function(next) {
    if (this.name === '' ) {
        this.name = 'Regular'+Date.now().toDateString();
        return next();
    }
});

const ActivityType = mongoose.model("ActivityType", activityTypeSchema);
module.exports = ActivityType;