const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Person = require('../models/Person.model')

router.post("/persons", (req, res, next) => {
    const { title, description } = req.body;
  
    Project.create({ title, description, tasks: [] })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });


  router.get("/persons", (req, res, next) => {
    Person.find()
      .populate("tasks")
      .then((allProjects) => res.json(allProjects))
      .catch((err) => res.json(err));
  });
