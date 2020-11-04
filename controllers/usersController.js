// Create a schema for password

const bcrypt = require('bcrypt')
const express = require('express')
const router = require('express').Router();
const User = require('../models/user');
const Activity = require('../models/activity');

// ROUTES
// GET information for all users
// Authetication
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

const isAuthorized = async (req, res, next) =>{
  console.log(`checking authorized user`);
  if (req.session.currentUser) {
    await User.findById(req.params.id, (error, user) => {
        if (user.username === req.session.currentUser)
          return next();
    });
  } else {
    res.redirect('/sessions/new')
  }
}

router.get('/', isAuthenticated, async (req, res) => {
  User.find().collation({ locale: 'en', strength: 2 }).sort({ username: 1 })
    .then((users) => {
      res.render('users/index.ejs', 
      { users, currentUser: req.session.currentUser });
    });
});

// ADD NEW HERE FIRST
router.get('/new', (req, res) => {
  res.render(
    'users/new.ejs'
    , { currentUser: req.session.currentUser }
  )
});

//
// EDIT THE ACTIVITY PAGE
//
router.get('/:userId/activity/:activityId/edit', isAuthenticated, async (req, res) => {
  const userId = req.params.userId;
  let user = await User.findById(userId);
  console.log(user);
  const activityId = req.params.activityId;
  Activity.findById(activityId, (err, activity) => {
    console.log(activity);
    console.log(activity.day.toLocaleDateString());
    res.render('activity/edit.ejs', { user, activity, currentUser: req.session.currentUser });
  });
});

// CREATE NEW ACTIVITY HERE
router.get("/:userId/activity/new", async (req, res) => {
  const userId = req.params.userId;
  let user = await User.findById(userId);
  console.log(`Calling the new activity page for ${user.fullName}`);
  res.render(
    'activity/new.ejs', { user, currentUser: req.session.currentUser }
  );
});

// SHOW ACTIVITY PAGE HERE
router.get('/:userId/activity/', async (req, res) => {
  const userId = req.params.userId;
  let user = await User.findById(userId);
  Activity.find({ user: userId }, (err, allActivity) => {
    console.log(allActivity);
    res.render('activity/show.ejs', { user, allActivity, currentUser: req.session.currentUser });
  });
});


// ADD SHOW PAGE HERE
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (error, user) => {
    res.render('users/show.ejs', { user, currentUser: req.session.currentUser  });
  });
});

// EDIT PAGE
router.get('/:id/edit', isAuthenticated, (req, res) => {
  console.log(`Calling the edit user`);
  User.findById(req.params.id, (error, user) => {
    res.render('users/edit.ejs', { user, currentUser: req.session.currentUser});
  });
});

router.delete('/:id/activity/:activityId', isAuthenticated, async (req, res) => {
  console.log(`Calling the delete activity `);
  await Activity.findByIdAndDelete(req.params.activityId);
  res.redirect(`/users/${req.params.id}/activity`);
});


// DELETE THE USER PROFILE
// DELETE ALL THE USER ACTIVITES FIRST
router.delete('/:id', async (req, res) => {
  await Activity.find().where({ user: req.params.id }).remove().exec();
  await User.findByIdAndRemove(req.params.id, (err, user) => {
     res.redirect('/users');
  });  
});

// UPDATE THE ACTIVITY ROUTE
// PUT /users/5fa0b7e55d3e325496809e2b/activity/5fa1d8797c1bc327c819a035
router.put('/:id/activity/:actvityId', async (req, res) => {
  let user = await User.findById(req.params.id);
  Activity.findByIdAndUpdate(
    req.params.actvityId,
    req.body,
    { new: true },
    (error, updateActivity) => {
      res.redirect(`/users/${user._id}/activity`);
    }
  )
});

// UPDATE
router.put('/:id', isAuthenticated, (req, res) => {
  console.log(req.body);
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedModel) => {
      res.redirect('/users')
    });
});

// Create User ACTIVITY
router.post('/:userId/activity', async (req, res) => {
  console.log(req.body);
  const userId = req.params.userId;
  let user = await User.findById(userId);
  await Activity.create({
    user: user._id,
    day: new Date(req.body.date),
    activity: {
      type: req.body.type,
    },
    name: req.body.name,
    distance: req.body.distance,
    duration: req.body.duration,
  }, (err, newActivity) => {
    res.redirect(`/users/${user._id}/activity`);
  });
});

//
// CREATE PROFILE OF USER
// Hash the password later
router.post('/', (req, res) => {
  console.log(req.body);
  try {
    //overwrite the user password with the hashed password, then pass that in to our database
    //req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    let newUser = User.create(req.body);
    res.redirect('/users')
  } catch (error) {
    res.send(error);
  }
})

module.exports = router;