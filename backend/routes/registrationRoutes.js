const express = require('express')
const Registration = require('../models/Registration')
const Student = require('../models/Student')
const Event = require('../models/Event')

const router = express.Router()

// GET all registrations
router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('studentId')
      .populate('eventId')

    res.json(registrations)
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching registrations'
    })
  }
})

// POST a registration
router.post('/', async (req, res) => {
  try {
    const { studentId, eventId } = req.body

    const student = await Student.findById(studentId)
    const event = await Event.findById(eventId)

    if (!student) {
      return res.status(404).json({
        message: 'Student not found'
      })
    }

    if (!event) {
      return res.status(404).json({
        message: 'Event not found'
      })
    }

    const existingRegistration =
      await Registration.findOne({
        studentId,
        eventId
      })

    if (existingRegistration) {
      return res.status(400).json({
        message: 'Student already registered for this event'
      })
    }

    const registrationCount =
      await Registration.countDocuments({
        eventId,
        status: 'active'
      })

    if (registrationCount >= event.capacity) {
      return res.status(400).json({
        message: 'Event is full'
      })
    }

    const registration = new Registration({
      studentId,
      eventId
    })

    const savedRegistration =
      await registration.save()

    res.status(201).json(savedRegistration)

  } catch (error) {
    res.status(400).json({
      message: 'Error creating registration',
      error: error.message
    })
  }
})

// DELETE a registration
router.delete('/:id', async (req, res) => {
  try {
    const registration =
      await Registration.findByIdAndDelete(
        req.params.id
      )

    if (!registration) {
      return res.status(404).json({
        message: 'Registration not found'
      })
    }

    res.json({
      message: 'Registration cancelled successfully'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error cancelling registration'
    })
  }
})

module.exports = router