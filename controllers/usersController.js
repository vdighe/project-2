const router = require('express').Router();
const User = require('../models/user');
const Activity = require('../models/activity');

// ROUTES
// GET information for all users

router.get('/', async (req, res) => {
  User.find().collation({ locale: 'en', strength: 2 }).sort({ username: 1 })
    .then((users) => {
      //do your stuff
      console.log(`found and populated all users: ${users}`);
      //res.send('Hello Runners!');
      // res.render('users/index.ejs', { users, currentUser: req.session.CurrentUser });
      res.render('users/index.ejs', { users });
    });
});

// ADD NEW HERE FIRST
router.get('/new', (req, res) => {
  res.render(
    'users/new.ejs'
  )
})
// CREATE NEW ACTIVITY HERE
router.get("/:userId/activity/new", async (req, res) => {
  const userId = req.params.userId;
  let user = await User.findById(userId);
  console.log(`Calling the new activity page for ${user.fullName}`);
  res.render(
    'activity/new.ejs', { user }
  );
});

// SHOW ACTIVITY PAGE HERE
router.get('/:userId/activity/', async (req, res) => {
  console.log(`Calling the show activity page`);
  const userId = req.params.userId;
  let user = await User.findById(userId);
  console.log(user.fullName);
  Activity.find({ user: userId }, (err, allActivity) => {
    console.log(allActivity);
    res.render('activity/show.ejs', { user, allActivity });
  });
});


// ADD SHOW PAGE HERE
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (error, user) => {
    res.render('users/show.ejs', { user });
  });
});

// EDIT PAGE
router.get('/:id/edit', (req, res) => {
  console.log(`Calling the edit user`);
  User.findById(req.params.id, (error, user) => {
    res.render('users/edit.ejs', { user });
  });
});
router.delete('/:id/activity/:activityId', (req, res) => {
  console.log(`Calling the delete activity `);
  //Movie.findByIdAndDelete(req.params.id);
  //res.redirect('/movies');
});

/*
router.delete('/:id/activity', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.redirect('/movies');
});
*/
// DELETE
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    res.redirect('/users')
  })
});

// UPDATE
router.put('/:id', (req, res) => {
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

// Create User ACTIVITY
router.post('/:userId/activity', async (req, res) => {
  console.log(req.body);
  const userId = req.params.userId;
  let user = await User.findById(userId);
  await Activity.create({
      user: user._id,
      day:new Date(req.body.date),
      activity: {
        type: req.body.type,
      },    
      name: req.body.name,
      distance: req.body.distance,
      duration: req.body.duration,
    }, (err, newActivity) => {
      res.redirect(  `/users/${user._id}/activity`);    
    });
});


// CREATE PROFILE OF USER
router.post('/', (req, res) => {
  console.log(req.body);
  try {
    let newUser = User.create(req.body);
    res.redirect('/users')
  } catch (error) {
    res.send(error);
  }
})

module.exports = router;