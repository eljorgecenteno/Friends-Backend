const express = require("express");
const router = express.Router();
const Meetup = require('../models/Meetup.model')
const mongoose = require("mongoose");

  
  router.get("/meetups", (req, res) =>{
    Meetup.find()
    .populate("opinions")
    .then((allMeetups) =>{
      res.status(200).json(allMeetups)
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).json({message: err})  
    })
  })
  
  router.get("/meetups/:id", (req, res) =>{
    Meetup.findById(req.params.id)
    .populate("opinions")
    .then((Meetup) =>{
        res.status(201).json(Meetup)
    })
    .catch((err)=>{
        res.status(500).json({message: "Error while getting this Meetup"})
    })
  })
  
  router.post("/meetups", (req, res) =>{
    Meetup.create({
      name: req.body.name,
      profile_image_url: req.body.profile_image_url,
      interest: req.body.interest, 
      description: req.body.description, 
      date: req.body.date,
      city: req.body.city,
    })
    .then((createdMeetup) => {
      res.status(201).json(createdMeetup);
  })
  .catch((err)=>{
    console.log(err)
  })
  })
  
  router.put("/meetups/:id" , (req, res) =>{
    Meetup.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .populate("opinions")
    .then((MeetupUpdated) =>{
        res.status(201).json(MeetupUpdated)
    })
    .catch((err)=>{
        res.status(500).json({message: "Error while upddating this Meetup"})
    })
    })
  
    router.delete("/meetups/:id", (req,res) =>{
      Meetup.findByIdAndDelete(req.params.id)
      .then(() =>{
          res.status(204).send()
      })
      .catch((err)=>{
          res.status(500).json({message: "Error while upddating this recipe"})
      })
  })

  module.exports = router;
