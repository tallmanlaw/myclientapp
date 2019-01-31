const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TweetSchema object
const MeetingSchema = new Schema({
  clientId: {
    type: String,
    // required: "You must include some content in your note"
  },
  time: {
    type: String
  },
  
});

// This creates our model from the above schema, using Mongoose's model method
var Meeting = mongoose.model('Meeting', MeetingSchema);

// Export the Tweet model
module.exports = Meeting;