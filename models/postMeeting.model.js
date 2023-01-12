// const { url } = require('../config/db.config')
// const express = require('express')
const mongoose = require('mongoose')

const PostMeetingSchema = mongoose.Schema(
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
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('MInfov2', PostMeetingSchema)
// module.exports = mongoose.model('MInfov2', MucOccupantJoined)
// module.exports = mongoose.model('MInfov2', MucRoomDestroyed)

// module.exports = (mongoose) => {
//   const schema = mongoose.Schema(
//     {
//       event_name: String,
//       room_name: String,
//       room_jid: String,
//       is_breakout: Boolean,
//       created_at: Date,
//       occupant: {
//         name: String,
//         email: String
//       }
//     },
//     { timestamps: true }
//   )
//   schema.method('toJSON', function () {
//     const { __v, _id, ...object } = this.toObject()
//     object.id = _id
//     return object
//   })

//   const MeetingInfo = mongoose.model('MInfov2', schema)
//   return MeetingInfo
// }
