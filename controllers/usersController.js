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

// ADD NEW HERE FIRST
router.get('/new', (req, res) => {   
    res.render(
      'users/new.ejs'
    )
  })

// SHOW ACTIVITY PAGE HERE
router.get('/:userId/activity/', async (req,res) => {
  console.log(`Calling the show activity page`);
  const userId = req.params.userId;
  let user = await User.findById(userId);
  console.log(user.fullName);
  Activity.find({user:userId}, (err, allActivity) => {
      console.log(allActivity);
      res.render('activity/show.ejs', {user, allActivity});
  });
});
// ADD SHOW PAGE HERE
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (error, user) => {
        res.render('users/show.ejs', {user});
    });
  });  

// EDIT PAGE
router.get('/:id/edit', (req, res) => {
    console.log(`Calling the edit user`);
    User.findById(req.params.id, (error, user) => {
        res.render('users/edit.ejs', {user});
  });
});


  
// DELETE
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      res.redirect('/users')
    })
  });

  // UPDATE
router.put('/:id',  (req, res) => {
    console.log(req.body);
    User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (error, updatedModel) => {
        res.redirect('/users')
      }
    )
  })

  // CREATE PROFILE OF USER
router.post('/', (req, res) => {
    console.log(req.body);
    try {
       let newUser = User.create(req.body);
       res.redirect('/users')
    } catch (error){
        res.send(error);
    }
    
  })

module.exports = router;