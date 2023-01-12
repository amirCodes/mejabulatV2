const mongoose = require('mongoose')

const MucRoomDestroyed = mongoose.Schema(
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
      id: {
        type: String,
        required: false
      },
      occupant_jid: {
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
module.exports = mongoose.model('MeetingRoomDestroyed', MucRoomDestroyed)
