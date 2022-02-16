const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./User');

const groupSchema = new Schema({
  startStation: String,
  endStation: String,
  date: Date,
  
  
  maxPassengers: Number,
  owner: {
      type: Schema.Types.ObjectId,
      ref: User,
  },
  guests: [ 
    {
      type: Schema.Types.ObjectId,
      ref: User,
    }
  ],
  comments: String,
  numOfGuests: {
    type: Number,
    default : 1
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;