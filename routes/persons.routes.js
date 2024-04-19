const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Person = require("../models/Person.model");

const fileUploader = require("../config/cloudinary.config");

//  POST /api/projects  -  Creates a new person, and when creating has no events attended yet
router.post("/persons", (req, res, next) => {
  const { name, age, profile_image_url, interest, motto, city, email } = req.body;

  Person.create({ name, age, profile_image_url, interest, description, city, email,password, events: [] })
    .then((response) => res.status(200).json(response))
    .catch((err) => res.json(err));
});

//  GET /api/projects -  Retrieves all of the persons
router.get("/persons", (req, res, next) => {
  console.log("persons route");
  Person.find().select('-password')
    .populate("events")
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
  console.log(personId)
  Person.findById(personId)
    .populate("events")
    .then((person) => res.status(200).json(person))
    .catch((error) => res.json(error));
});

// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put("/persons/:personId", (req, res, next) => {
    const { personId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(personId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Person.findByIdAndUpdate(personId, {...req.body, $addToSet: {events: req.body.events}}, { new: true })
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

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  res.json({ fileUrl: req.file.path });
});

module.exports = router;
