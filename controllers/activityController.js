
const router = require("express").Router();

const Activity = require('../models/activity');


//ROUTES
//INDEX
router.get("/", (req, res) => {
	Activity.find({}, (error, allActivities) => {
        console.log(allActivities);
	});
});

//NEW Activity FORM
router.get("/new", (req, res) => {
	res.render("activity/new.ejs");
});


module.exports = router;