const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Person = require("../models/Person.model");

//  POST /api/projects  -  Creates a new person, and when creating has no events attended yet
router.post("/persons", (req, res, next) => {
  const { name, age, profile_image_url, interest, motto, city } = req.body;

  Person.create({ name, age, profile_image_url, interest, motto, city, events: [] })
    .then((response) => res.status(200).json(response))
    .catch((err) => res.json(err));
});

//  GET /api/projects -  Retrieves all of the persons
router.get("/persons", (req, res, next) => {
  Person.find()
    //.populate("events")
    .then((allPersons) => res.status(200).json(allPersons))
    .catch((err) => res.json(err));
});

//  GET /api/projects/:projectId -  Retrieves a specific project by id
router.get("/persons/:personId", (req, res, next) => {
  const { personId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(personId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Person.findById(personId)
    .populate("events")
    .then((person) => res.status(200).json(person))
    .catch((error) => res.json(error));
});

// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put("/person/:personId", (req, res, next) => {
    const { personId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(personId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Person.findByIdAndUpdate(personId, req.body, { new: true })
      .then((updatedPerson) => res.json(updatedPerson))
      .catch((error) => res.json(error));
  });

  // DELETE  /api/projects/:projectId  -  Deletes a specific project by id
router.delete("/persons/:personId", (req, res, next) => {
    const { personId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(personId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Person.findByIdAndRemove(personId)
      .then(() =>
        res.json({
          message: `Person with ${personId} is removed successfully.`,
        })
      )
      .catch((error) => res.json(error));
  });
  
  module.exports = router;