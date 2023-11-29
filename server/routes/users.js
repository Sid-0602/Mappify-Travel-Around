const router = require("express").Router();
const bcrypt = require('bcrypt');
const User = require("../models/User");

//register new user:

router.post("/register",async(req,res)=>{

    try{
        //generate new hashed password:
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        //create new user:
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save current user and OK:
        const user = await newUser.save();
        res.status(200).json(user._id);   
    }catch(err){
        console.log(err);
        res.status(500).json(err); 
    }
})

//login existing user:

router.post("/login",async(req,res)=>{
    try{
        //find user:
        const user = await User.findOne({username: req.body.username });
        if(!user){
            return res.status(401).json("Wrong Username or password!");
        }

        //validate password:
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!validPassword){
            return res.status(401).json("Wrong Username or password!");
        }

        res.status(200).json({_id:user._id, username: user.username});
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router
