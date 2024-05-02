const { Schema, model } = require("mongoose");

const opinionSchema = new Schema({
  description: {
    type: String,
    minLength: 10,
    maxLength: 200,
    required: true
  },
  person: { type: Schema.Types.ObjectId, ref: "Person" },
  event: { type: Schema.Types.ObjectId, ref: "Meetup" }
});

const Opinion = model("Opinion", opinionSchema);

module.exports = Opinion;
