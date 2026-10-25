const express = require('express')
const mongoose = require('mongoose')
const Event = require('../models/Event')

const router = express.Router()


// GET all events with seat information
router.get('/', async (req, res) => {
  try {

    const events = await Event.aggregate([

      {
        $lookup: {
          from: 'registrations',
          let: { eventId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$eventId', '$$eventId'] },
                    { $eq: ['$status', 'active'] }
                  ]
                }
              }
            }
          ],
          as: 'registrations'
        }
      },

      {
        $addFields: {
          registeredCount: {
            $size: '$registrations'
          },

          availableSeats: {
            $subtract: [
              '$capacity',
              { $size: '$registrations' }
            ]
          }
        }
      },

      {
        $project: {
          registrations: 0
        }
      }

    ])

    res.json(events)

  } catch (error) {

    res.status(500).json({
      message: 'Error fetching events',
      error: error.message
    })

  }
})


// GET one event
router.get('/:id', async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid event ID'
      })
    }

    const events = await Event.aggregate([

      {
        $match: {
          _id: new mongoose.Types.ObjectId(
            req.params.id
          )
        }
      },

      {
        $lookup: {
          from: 'registrations',
          let: { eventId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$eventId', '$$eventId'] },
                    { $eq: ['$status', 'active'] }
                  ]
                }
              }
            }
          ],
          as: 'registrations'
        }
      },

      {
        $addFields: {
          registeredCount: {
            $size: '$registrations'
          },

          availableSeats: {
            $subtract: [
              '$capacity',
              { $size: '$registrations' }
            ]
          }
        }
      },

      {
        $project: {
          registrations: 0
        }
      }

    ])


    if (events.length === 0) {
      return res.status(404).json({
        message: 'Event not found'
      })
    }

    res.json(events[0])

  } catch (error) {

    res.status(500).json({
      message: 'Error fetching event',
      error: error.message
    })

  }
})


// POST a new event
router.post('/', async (req, res) => {
  try {

    const event = new Event(req.body)

    const savedEvent = await event.save()

    res.status(201).json(savedEvent)

  } catch (error) {

    res.status(400).json({
      message: 'Error creating event',
      error: error.message
    })

  }
})


// PUT update an event
router.put('/:id', async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid event ID'
      })
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!updatedEvent) {
      return res.status(404).json({
        message: 'Event not found'
      })
    }

    res.json(updatedEvent)

  } catch (error) {

    res.status(400).json({
      message: 'Error updating event',
      error: error.message
    })

  }
})


// DELETE an event
router.delete('/:id', async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid event ID'
      })
    }

    const deletedEvent = await Event.findByIdAndDelete(
      req.params.id
    )

    if (!deletedEvent) {
      return res.status(404).json({
        message: 'Event not found'
      })
    }

    // Remove registrations belonging to this event
    const Registration =
      require('../models/Registration')

    await Registration.deleteMany({
      eventId: req.params.id
    })

    res.json({
      message: 'Event deleted successfully'
    })

  } catch (error) {

    res.status(500).json({
      message: 'Error deleting event',
      error: error.message
    })

  }
})


module.exports = router