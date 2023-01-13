const express = require('express')
const router = express.Router()
// whenever we want to post or get data we have to use this model
const PostMeeting = require('../models/postMeeting.model') // post/get meeting schema
const MucOccupantJoined = require('../models/occupantJoined.model')
const MucOccupantLeft = require('../models/occupantLeft.model')
const MucRoomDestroyed = require('../models/occupantDestroyed.model')

// get all the alert in dabase
router.get('/all', async (req, res) => {
  const RoomName = req.query.room_name
  const condition = RoomName
    ? { RoomName: { $regex: new RegExp(RoomName), $options: 'i' } }
    : {}
  const limit = parseInt(req.query.limit) // Make sure to parse the limit to number
  try {
    const getMeeting = await PostMeeting.find(condition).sort({ _id: -1 }).limit(limit)
    // const getMeeting = await PostMeeting.find(condition)
    res.status(200).json(getMeeting)
  } catch (error) {
    res.status(400).json({ message: 'Could not get the meeting,', error })
  }
})

// get single alert
router.get('/room/:id', async (req, res) => {
  const myID = req.params.id
  try {
    const getSingleMeeting = await PostMeeting.findById(myID)
    if (!getSingleMeeting) {
      res.status(404).send({ message: 'Not found meeting with id', myID })
    } else {
      res.status(200).json(getSingleMeeting)
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving meeting with id=', myID })
  }
})

// Post a new alert
router.post('/room/created', async (req, res) => {
  // const current_date = new Date().toISOString().slice(0, -14)
  if (!req.body.room_name) {
    res.status(400).json({ message: 'Content can not be empty!' })
    return
  }
  const { NewMeeting } = req.body.room_name
  const addNewMeeting = new PostMeeting({
    room_jid: req.body.room_jid,
    event_name: req.body.event_name,
    room_name: req.body.room_name,
    is_breakout: req.body.is_breakout
    // occupant: {
    //   name: req.body.occupant.name,
    //   email: req.body.occupant.email
    // }
  })
  try {
    const Getexisteddata = await PostMeeting.findOne({ NewMeeting: NewMeeting }).sort({ createdAt: -1 }).limit(1)
    const { room_name, createdAt } = Getexisteddata
    const DateFromDB = new Date(createdAt).toISOString().slice(0, -14)
    // const myNewAlert = (( room_name === req.body.Message) && (DateFromDB === createdAt))
    const checkNewExistMeeting = (( room_name === req.body.room_name) && (DateFromDB === createdAt.toLocaleDateString('en-CA')))
    if (checkNewExistMeeting) {
      return res.status(400).json({ message: 'Meeting already exist' })
    }
    const saveNewMeeting = await addNewMeeting.save()
    res.status(200).json(saveNewMeeting)
  } catch (error) {
    res.status(400).json({ message: 'Something wrong happend,', error })
  }
  // addNewMeeting.save() // just refactor it to work with async and await
  // // .exec()
  // .then( data => {
  //     res.status(200).json(data);
  // })
  // .catch(err => {
  //     res.status(400).json({message: "Something wrong happend,"+err});
  // })
})

// ****************** Room destroyed  *******************
router.post('/room/destroyed', async (req, res) => {
  // const current_date = new Date().toISOString().slice(0, -14)
  if (!req.body.room_name) {
    res.status(400).json({ message: 'Content can not be empty!' })
    return
  }
  try {
    const { NewMeeting } = req.body.room_name
    const Getexisteddata = await PostMeeting.findOne({ NewMeeting: NewMeeting }).sort({ createdAt: -1 }).limit(1)
    const { room_name, createdAt } = Getexisteddata
    const DateFromDB = new Date(createdAt).toISOString().slice(0, -14)

    const addMucRoomDestroyed = new MucRoomDestroyed({
      room_jid: req.body.room_jid,
      even_name: req.body.even_name,
      room_name: req.body.room_name,
      is_breakout: req.body.is_breakout,
      occupant: {
        name: req.body.occupant.name,
        email: req.body.occupant.email,
        id: req.body.occupant.id,
        occupant_jid: req.body.occupant.room_jid,
        joined_at: DateFromDB,
        left_at: req.body.occupant.left_at
      }
    })

    // const myNewAlert = (( room_name === req.body.Message) && (DateFromDB === createdAt))
    const checkNewExistMeeting = (( room_name === req.body.room_name) && (DateFromDB === createdAt.toLocaleDateString('en-CA')))
    if (checkNewExistMeeting) {
      return res.status(400).json({ message: 'Meeting already exist' })
    }
    const saveNewMeeting = await addMucRoomDestroyed.save()
    res.status(200).json(saveNewMeeting)
  } catch (error) {
    res.status(400).json({ message: 'Something wrong happend,', error })
  }
})

//  *******************************************************************************
// ****************** Occupant joined meeting   *******************
router.post('/occupant/joined', async (req, res) => {
  // const current_date = new Date().toISOString().slice(0, -14)
  if (!req.body.room_name) {
    res.status(400).json({ message: 'Content can not be empty!' })
    return
  }
  try {
    const { NewMeeting } = req.body.room_name
    const Getexisteddata = await PostMeeting.findOne({ NewMeeting: NewMeeting }).sort({ createdAt: -1 }).limit(1)
    const { room_name, createdAt } = Getexisteddata
    const DateFromDB = new Date(createdAt).toISOString().slice(0, -14)

    const addOccupantJoined = new MucOccupantJoined({
      room_jid: req.body.room_jid,
      even_name: req.body.even_name,
      room_name: req.body.room_name,
      is_breakout: req.body.is_breakout,
      occupant: {
        name: req.body.occupant.name,
        email: req.body.occupant.email,
        id: req.body.occupant.id,
        occupant_jid: req.body.occupant.room_jid,
        joined_at: req.body.occupant.joined_at
      }
    })

    // const myNewAlert = (( room_name === req.body.Message) && (DateFromDB === createdAt))
    const checkNewExistMeeting = (( room_name === req.body.room_name) && (DateFromDB === createdAt.toLocaleDateString('en-CA')))
    if (checkNewExistMeeting) {
      return res.status(400).json({ message: 'Meeting already exist' })
    }
    const saveNewOccupantJoined = await addOccupantJoined.save()
    res.status(200).json(saveNewOccupantJoined)
  } catch (error) {
    res.status(400).json({ message: 'Something wrong happend,', error })
  }
})


//  *******************************************************************************
// ****************** Occupant left meeting   *******************
router.post('/occupant/left', async (req, res) => {
  // const current_date = new Date().toISOString().slice(0, -14)
  if (!req.body.room_name) {
    res.status(400).json({ message: 'Content can not be empty!' })
    return
  }
  try {
    const { NewMeeting } = req.body.room_name
    const Getexisteddata = await MucOccupantLeft.findOne({ NewMeeting: NewMeeting }).sort({ createdAt: -1 }).limit(1)
    const { room_name, createdAt } = Getexisteddata
    const DateFromDB = new Date(createdAt).toISOString().slice(0, -14)

    const addMucOccupantLeft = new MucOccupantLeft({
      room_jid: req.body.room_jid,
      even_name: req.body.even_name,
      room_name: req.body.room_name,
      is_breakout: req.body.is_breakout,
      occupant: {
        name: req.body.occupant.name,
        email: req.body.occupant.email,
        id: req.body.occupant.id,
        occupant_jid: req.body.occupant.room_jid,
        joined_at: req.body.occupant.joined_at,
        left_at: req.body.occupant.left_at
      }
    })

    // const myNewAlert = (( room_name === req.body.Message) && (DateFromDB === createdAt))
    const checkNewExistMeeting = (( room_name === req.body.room_name) && (DateFromDB === createdAt.toLocaleDateString('en-CA')))
    if (checkNewExistMeeting) {
      return res.status(400).json({ message: 'Meeting already exist' })
    }
    const saveNewMucOccupantLeft = await addMucOccupantLeft.save()
    res.status(200).json(saveNewMucOccupantLeft)
  } catch (error) {
    res.status(400).json({ message: 'Something wrong happend,', error })
  }
})

// ***************** Delete Meeting with single ID **********************
router.delete('/room/:id', async (req, res) => {
  try {
    const deleteExMeeting = await PostMeeting.deleteOne({ _id: req.params.id })
    res.status(200).json(deleteExMeeting)
  } catch (error) {
    res.status(400).json({ message: 'Could not delete the meeting', error })
  }
})
// delete all the rooms
router.delete('/delete/all', async (req, res) => {
  try {
    const deleteExMeeting = await PostMeeting.deleteMany()
    res.status(200).json(deleteExMeeting)
  } catch (error) {
    res.status(400).json({ message: 'Could not delete the meeting', error })
  }
})

// ********************** Update single Meeting room ********************
router.put('/room/:id', async (req, res) => {
  try {
    const updateExMeeting = await PostMeeting.updateOne(
      { _id: req.params.id },
      {
        $set: {
          room_jid: req.body.room_jid,
          even_name: req.body.even_name,
          room_name: req.body.room_name,
          is_breakout: req.body.is_breakout,
          occupant: {
            name: req.body.even_name,
            email: req.body.even_name
          }
        } // here we only update the message
      }
    )
    if (!updateExMeeting) {
      res.status(404).send({ message: 'Not found meeting to update' })
    } else {
      res.status(200).json(updateExMeeting)
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving meeting not updated' })
  }
})

module.exports = router
