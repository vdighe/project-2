const router = require('express').Router();
const User = require('../models/user');
const Activity = require('../models/activity');

// ROUTES
// GET information for all users

router.get('/', async (req,res) => {
    User.find().collation({locale:'en',strength: 2}).sort({username:1})
    .then( (users) =>{ 
        //do your stuff
        console.log(`found and populated all users: ${users}`);
        //res.send('Hello Runners!');
       // res.render('users/index.ejs', { users, currentUser: req.session.CurrentUser });
       res.render('users/index.ejs', { users});
    });
});


module.exports = router;