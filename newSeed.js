const mongoose = require('mongoose');
const User = require('./models/user');
const Activity = require('./models/activity');
const ActivityType = require('./models/activityType');


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
let activityTypeSeed =  [
    {
        type: "Run",
        name: "SprintRun",
        duration: 120,
        distance: 8
      },
      {
        type: "Walk",
        name: "RelaxedHalloween",
        duration: 20,
        distance: 2
      },
     ];
/*
(async function(){
ActivityType.deleteMany({})   
     .then(() => ActivityType.insertMany(activityTypeSeed))
     .then(data => {
       console.log(data.length +  " records inserted!");
       // console.log(data);
       
     })
     .catch(err => {
       console.error(err);
       process.exit(1);
}); 
})();
let result;
async function fetchAll() {
 result = await ActivityType.find().exec();
 console.log(result);
  }

  fetchAll(); // <--

 const result = ActivityType.find();
 console.log(result);
  */
 let activityArr = []
 async function fetchAll() {
   await ActivityType.find().exec(function(err, results){
        for (let result in results)
            activityArr.push(result);
            console.log(activityArr);
    })};

fetchAll();