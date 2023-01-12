const express = require('express')
const mongoose = require('mongoose')

const postAlertSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: false
    },
    user_id: {
      type: String,
      required: false
    },
    iDerasUser: {
      type: String,
      required: false
    },
    Message: {
      type: String,
      required: true
    },
    sourceIP: {
      type: String,
      required: false
    },
    destinationIP: {
      type: String,
      required: false
    },
    escalation_state: {
      type: String,
      required: false
    },
    transaction_id: {
      type: String,
      required: false
    },
    submission_date_time: {
      type: Date,
      default: Date.now
    },
    site_id: {
      type: String,
      required: false
    },
    alarm_group_id: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: false
    },
    closedby: {
      type: String,
      required: false
    },
    closedbyusername: {
      type: String,
      required: false
    },
    status: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("alertsV2", postAlertSchema);
