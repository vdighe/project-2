const mongoose = require('mongoose');
const User = require('./models/user');
const Activity = require('./models/activity');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'vdighe-project2';
// Connect to Mongo
mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }, () => {
        console.log('the connection with mongod is established');
    }
);
/*
const actSeed = function () {
    ActivityType.create(
    {
        type: "Run",
        name: "SprintRun1",
        duration: 120,
        distance: 8
      })};
      

 username: { type: String, ref: "User", required: true },
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
*/
const vdighe = User.findOne({ username: 'vdighe' }, (err, user) => {
    if(err){
        console.log(err);
    } else {
        console.log(user);
        Activity.create({     
            user : user._id,
            day: new Date().setDate(new Date().getDate()-10),
            activity: {
                type: "Run",
            },
            name: "SprintRun",
            distance: 8,
            duration: 120,
        });   
        Activity.create({     
            user : user._id,
            day: new Date().setDate(new Date().getDate()-9),
            activity: {
                type: "Walk",
            },
            name: "RelaxedWalk",
            distance: 5,
            duration: 60,
        });                       
    }
});
