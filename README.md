# Project Overview 
## Project Description 
### RunKeeper App To Keep Track Of Your Activity Profiles
### Keep track of running, walking and/or biking.

## Project Links
[Heroku App Link](https://vdighe-project2.herokuapp.com/)
[GitHub Repo Link](https://github.com/vdighe/project-2)

### WireFrames
### Very Basic Schema
![Basic Schema](https://github.com/vdighe/project-2/blob/main/public/images/RunTracker.png)

### Main Page (Index Page)
![Index Page](https://github.com/vdighe/project-2/blob/main/public/images/mainPage.png)

### Show Runner Details Page
![Show Runner Page](https://github.com/vdighe/project-2/blob/main/public/images/showUser.png)

### Add Runner Page
![Add Runner Page](https://github.com/vdighe/project-2/blob/main/public/images/AddRunner.png)

### Add Workout Page
![Add Tracker Page](https://github.com/vdighe/project-2/blob/main/public/images/AddTracker.png)

### Getting Started.
This project contains basic structure for MVC architecture that is a working full-stack application with
- HTML
- CSS
- Materialize
- Javascipt
- Node.js
- Express
- MongoDB and Mongoose
![MVC](https://github.com/vdighe/project-2/blob/main/public/images/MVC.png)

#### MVP
##### The functionality of the application is based on CRUD models. The login form allows the user to access the user profiles page. The user profile includes username, name, age, gender, about... etc.
#### The activity includes activity type, date, duration, and mileage covered. Each activity belongs to the user profile, while an user profile can have multiple activities associated with it. Each user can create, modify, or delete activity.
#### The sign on form can create new user profiles, and each user can update/delete its profile.
#### __User Stories__
- A Runtracker app should follow the MVC design.
- Two data models are used (userProfile and ActivityProfile) with one to many relationship.
- The CRUD operations should be allowed on both the models.
    - An user can be added/updated/deleted in the application
    - An user can have many activites which can be added/deleted or updated.
- Both sign-on and new user registration allowed.
- All the required routes have been incorporated.

#### Bonus
##### Authentication mechanism is added using session object. Along with authentication, authorization is also plugged in. Each user can only access/update/delete its own activities.

#### Components


### Code Snippets 
#### User Schema
    const userSchema = new mongoose.Schema({
        username: { type: String, unique: true, required: true , trim: true, minlength: 5},
        fullName: { type: String, required: 'Please enter your full name!' },
        gender: {
            type: String,
            enum: ["male", "female"],
            required: 'Please enter your gender!'
        },
        password: {type :String},//==> Add later during authentication process
        age: { type: Number, required: 'Please enter your age!' },
        about: { type: String, required: 'Please write about youself!' },
        created: { type: Date, default: Date.now },
        photo: { type: String },
    }, { timestamps: true });

#### Activity Schema
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

#### Route to create a new activity
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

#### Run Tracker Site Pictures
[![Peek Thru the Pages]](https://imgflip.com/gif/4l8lvy)
### Author 
*Vaishali Dighe-Phanse*

### Issues, Resolutions and Future Enhancements
#### Have used a DatePicker from Materialize design for selecting date. However, conversion of DB date and DatePicker date was a bit tricky so due to lack of time, wasn't able to use for the updates.
#### A dashboard to show the daily/weekly/monthly activities to drill down on the statistics using Cube js or Pusher.

