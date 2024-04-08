const { Schema, model } = require("mongoose");

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
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
    enum: ['Chess', 'Cinema', 'Poker', 'Theater', 'Party', 'Restaurants', 'Hiking', 'Football', 'Movie Night', 'Running', 'Language exchange', 'Trips', 'Basketball', 'Literature'],
    required: true,
}, 
motto: {
    type: String,
    minLength: 5,
    maxLength: 100
},
city: {
    type: String,
    enum: ['London', 'Paris', 'Madrid', 'Berlin', 'Athens' ]}   
  
});

const Person = model('Person', personSchema)

module.exports = Person
