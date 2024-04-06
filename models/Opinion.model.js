const { Schema, model } = require("mongoose");

const opinionSchema = new Schema({
  description: {
    type: String,
    minLength: 10,
    maxLength: 200,
  },
  date: {
    type: Date,
    require: true,
  },
  person: { type: Schema.Types.ObjectId, ref: "Person" },
  event: { type: Schema.Types.ObjectId, ref: "Event" }
});

const Opinion = model("Event", opinionSchema);

module.exports = Opinion;
