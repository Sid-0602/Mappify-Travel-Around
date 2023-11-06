const router = require("express").Router();

const Pin = require("../models/Pin");

//create a Pin:
router.post("/",async(req,res)=>{

    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save();
        console.log("POST REQUEST HIT")
        res.status(200).json(savedPin);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get a Pin: 

router.get("/",async(req,res)=>{

    try{
        const pins = await Pin.find(); //this finds all pins inside database.
        console.log("GET REQUEST HIT")
        res.status(200).json(pins);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports = router