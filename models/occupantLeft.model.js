// const { url } = require('../config/db.config')
// const express = require('express')
const mongoose = require('mongoose')
const MucOccupantLeft = mongoose.Schema(
  {
    room_jid: {
      type: String,
      required: false
    },
    event_name: {
      type: String,
      required: false
    },
    room_name: {
      type: String,
      required: true
    },
    is_breakout: {
      type: Boolean,
      required: false
    },
    occupant: {
      name: {
        type: String,
        required: false
      },
      email: {
        type: String,
        required: false
      },
      room_jid: {
        type: String,
        required: false
      },
      joined_at: {
        type: Date,
        required: false
      },
      left_at: {
        type: Date,
        required: false
      }
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('MeetingOccupantLeft', MucOccupantLeft)
