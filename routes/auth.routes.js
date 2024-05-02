const express = require("express");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const Person = require("../models/Person.model");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post("/persons", (req, res, next) => {
  const { name, age, profile_image_url, interest, description,password, city, email } = req.body;

  console.log(req.body)
  // Check if email or password or name are provided as empty strings
  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }
if (age < 18){
  res.status(400).json({ message: "User must be older than 18" });
    return;
}

if (age > 100){
  res.status(400).json({ message: "User must be younger than 100" });
    return;
}

if (name.length < 2 || name.length > 30){
  res.status(400).json({ message: "User name must have between 2 and 30 charcters" });
    return;
}

if (city === "" ) {
  res.status(400).json({ message: "Select a city" });
  return;
}

if (description.length < 25 || description.length > 100){
  res.status(400).json({ message: "User name must have between 25 and 100 charcters" });
    return;
}

  // This regular expression check that the email is of a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // This regular expression checks password for special characters and minimum length
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  // Check the users collection if a user with the same email already exists
  Person.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return Person.create({ email, password: hashedPassword, name, age, profile_image_url, interest, description, city });
    })
    .then((createdPerson) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, name, _id } = createdPerson;

      // Create a new object that doesn't expose the password
      const person = { email, name, _id, profile_image_url, interest };

      // Send a json response containing the user object
      res.status(201).json({ user: person });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  Person.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, name };
<<<<<<< HEAD

=======
        console.log(payload)
>>>>>>> d3f7cf7916ad99323edcc9a7381afb2d69d76a78
        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
<<<<<<< HEAD
router.get("/verify",isAuthenticated, (req, res, next) => {
=======
router.get("/verify", isAuthenticated, (req, res, next) => {
>>>>>>> d3f7cf7916ad99323edcc9a7381afb2d69d76a78
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

module.exports = router;
