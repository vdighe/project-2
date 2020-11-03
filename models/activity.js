const mongoose = require('mongoose');
const activitySchema = new mongoose.Schema({
    user: { type: String, ref: "User", required: true },
    day: {
        type: Date,
        default: Date.now()
    },
    activity: 
    {
        type: {
            type: String,
            enum: ["Run", "Bike", "Walk"],
            required: true,
        },
    },
    name: {type:String, default:'',},
    distance: {type:Number, default:0},
    duration: {type:Number,default:0},
},  { timestamps: true });
const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;