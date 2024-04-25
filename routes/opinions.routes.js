const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Opinion = require("../models/Opinion.model");
const Meetup = require("../models/Meetup.model");

//  POST /api/tasks  -  Creates a new opinion
router.post("/opinions", (req, res, next) => {
  const { description, date, person, event } = req.body;

  let createdOpinionId;
  Opinion.create({ description, date, person, event })
    .then((createdOpinion) => {createdOpinionId = createdOpinion._id;
       return Meetup.findByIdAndUpdate(event, {$addToSet: {opinions: createdOpinionId}})})
    .then(() => Opinion.findById(createdOpinionId).populate("person").populate("event"))
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});
//  GET /api/projects -  Retrieves all of the persons
router.get("/opinions", (req, res, next) => {
  Opinion.find()
    .populate("person")
    .populate("event")
    .then((allOpinions) => res.json(allOpinions))
    .catch((err) => res.json(err));
});
//why all of the tasks/opinions missing?
//  GET /api/tasks/:taskId  - Retrieves a specific task by id
router.get("/opinions/:opinionId", (req, res, next) => {
  const { opinionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(opinionId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Opinion.findById(opinionId)
    .populate("person")
    .populate("event")
    .then((opinion) => res.json(opinion))
    .catch((error) => res.json(error));
});

// PUT  /api/tasks/:taskId  - Updates a specific opinion by id
router.put("/opinions/:opinionId", (req, res, next) => {
  const { opinionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(opinionId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Opinion.findByIdAndUpdate(opinionId, req.body, { new: true })
    .then((updatedOpinion) => res.json(updatedOpinion))
    .catch((err) => res.json(err));
});

//  DELETE /api/tasks/:taskId  - Deletes a specific task by id
router.delete("/opinions/:opinionId", (req, res, next) => {
  const { opinionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(opinionId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Opinion.findByIdAndRemove(opinionId)
    .then(() => res.json({ message: `Opinion with ${opinionId} is removed successfully.` }))
    .catch((error) => res.json(error));
});

module.exports = router;
