const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },  
  profile_image_url: {
    type: String,
    default: "https://www.shutterstock.com/image-vector/upcoming-events-isolated-on-white-260nw-1538520572.jpg",
  },
  interest: {
    type: [String],
    enum: ['Chess', 'Cinema', 'Poker', 'Theater', 'Party', 'Restaurants', 'Hiking', 'Football', 'Movie Night', 'Running', 'Language exchange', 'Trips', 'Basketball', 'Literature'],
    required: true,
},
 description: {
    type: String,
    minLength: 10,
    maxLength: 100
 },
  date: {
    type: Date,
    required: true,
  },
  opinions: {
    type: [{type: Schema.Types.ObjectId, ref: 'Opinion'}]
  },
city: {
    type: String,
    enum: ['London', 'Paris', 'Madrid', 'Berlin', 'Athens' ] ,
    required: true}   
    
});

const Event = model('Event', eventSchema)

module.exports = Event
