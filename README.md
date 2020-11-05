# RunKeeper App To Keep Track Of Your Activity Profiles
## Keep track of running, walking and/or biking.
#### Very Basic Schema
![Basic Schema](https://github.com/vdighe/project-2/blob/main/public/images/RunTracker.png)

#### Main Page (Index Page)
![Index Page](https://github.com/vdighe/project-2/blob/main/public/images/mainPage.png)

#### Show Runner Details Page
![Show Runner Page](https://github.com/vdighe/project-2/blob/main/public/images/showUser.png)

#### Add Runner Page
![Add Runner Page](https://github.com/vdighe/project-2/blob/main/public/images/AddRunner.png)

#### Add Workout Page
![Add Tracker Page](https://github.com/vdighe/project-2/blob/main/public/images/AddTracker.png)

#### Getting Started.
1. Build a working full-stack application using Node.js, MongoDB, Express and EJS.
2. 

#### Code Snippets 
##### User Schema
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

##### Activity Schema
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

##### Route to create a new activity
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

    ### Copyrights