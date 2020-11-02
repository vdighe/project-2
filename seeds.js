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

// CREATE 3 Runners
const seed = function () {
    const jbenoit = User.create({
        username: 'jbenoit',
        fullName: 'Joan Benoit',
        gender: 'female',
        age: 63,
        about: 'I am an American Senior Grand Masters marathon runner and am the first women\'s Olympic Games marathon champion, winning the Gold medal ' +
            'at the 1984 Summer Olympics in Los Angeles. I hold the fastest time for an American woman at the Chicago Marathon for 32 years ' +
            ' after winning the race in 1985. My time at the Boston Marathon was the fastest time by an American woman at that race for 28 years. ' +
            ' I was inducted into the Maine Women\'s Hall of Fame in 2000.',
    });

    const fShorter = User.create({
        username: 'fShorter',
        fullName: 'Frank Shorter',
        gender: 'male',
        age: 70,
        about: 'I am a former long-distance runner who won the gold medal in the marathon at the 1972 Summer Olympics ' +
            ' and the silver medal at the 1976 Summer Olympics. His Olympic success, along ' +
            ' with the achievements of other American runners, is credited with igniting the running boom ' +
            ' in the United States during the 1970s',
    });

    const kSwitzer = User.create({
        username: 'kSwitzer',
        fullName: 'Kathrine Switzer',
        gender: 'female',
        age: 72,
        about: 'I was the first woman to run the Boston Marathon as an officially registered competitor.',
    });
    const vDighe = User.create({
        username: 'vdighe',
        fullName: 'Vaishali Dee',
        gender: 'female',
        age: 42,
        about: 'Amateur Runner. Running since 2001',
    });
};
seed();
