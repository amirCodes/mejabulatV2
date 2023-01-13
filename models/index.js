const dbConfig = require('../config/db.config.js')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.MejabulatMeetingInfo = require('./postMeeting.model.js')(mongoose)
db.MejabulatMeetingInfo = require('./occupantJoined.model.js')(mongoose)
db.MejabulatMeetingInfo = require('./occupantDestroyed.model.js')(mongoose)
db.MejabulatMeetingInfo = require('./occupantLeft.model.js')(mongoose)
module.exports = db
