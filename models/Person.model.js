const { Schema, model } = require("mongoose");

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100,
  },
  profile_image_url: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  interest: {
    type: [String],
    enum: ["Chess", "Cinema", "Poker", "Theater", "Party", "Restaurants", "Hiking", "Football", "Movie Night", "Running", "Language Exchange", "Trips", "Basketball", "Literature"],
    required: true,
    minLength: 2,
  },
  motto: {
    type: String,
    minLength: 25,
    maxLength: 100,
    required: true, 
  },
  events: [{ type: Schema.Types.ObjectId, ref: "Meetup" }],
  city: {
    type: String,
    enum: ["London", "Paris", "Madrid", "Berlin", "Athens"],
    required: true, 
  },
 email:{
  type: String, 
  required: true, 
  unique: true
 }
});

const Person = model("Person", personSchema, "persons");

module.exports = Person;
