const express = require("express");
const router = express.Router();
const Event = require("../models/Event.model")
router.post("/persons", (req, res, next) => {
    const { name, age, profile_image_url, interest, motto, city } = req.body;
  
    Person.create({ name, age, profile_image_url, interest, motto, city, events: [] })
      .then((response) => res.status(200).json(response))
      .catch((err) => res.json(err));
  });
  
  router.get("/events", (req, res) =>{
    Event.find()
    .populate("opinions")
    .then((allEvents) =>{
      res.status(200).json(allEvents)
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).json({message: "Error while getting all the events"})  
    })
  })
  
  router.get("/events/:id", (req, res) =>{
    Event.findById(req.params.id)
    .populate("opinions")
    .then((event) =>{
        res.status(201).json(event)
    })
    .catch((err)=>{
        res.status(500).json({message: "Error while getting this event"})
    })
  })
  
  router.post("/events", (req, res) =>{
    Event.create({
      name: req.body.name,
      profile_image_url: req.body.profile_image_url,
      interest: req.body.interest, 
      description: req.body.description, 
      date: req.body.date,
      city: req.body.city,
    })
    .then((createdEvent) => {
      res.status(201).json(createdEvent);
  })
  .catch((err)=>{
    console.log(err)
  })
  })
  
  router.put("/events/:id" , (req, res) =>{
    Event.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .populate("opinions")
    .then((eventUpdated) =>{
        res.status(201).json(eventUpdated)
    })
    .catch((err)=>{
        res.status(500).json({message: "Error while upddating this event"})
    })
    })
  
    router.delete("/events/:id", (req,res) =>{
      Event.findByIdAndDelete(req.params.id)
      .then(() =>{
          res.status(204).send()
      })
      .catch((err)=>{
          res.status(500).json({message: "Error while upddating this recipe"})
      })
  })

  module.exports = router;
