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
  },
  prices : {
    1:"42 Euro", 
    2:"24,50 Euro",
    3:"18,66 Euro", 
    4:"15,75 Euro",
    5:"14 Euro"
  },
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;