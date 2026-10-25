const express = require('express')
const Student = require('../models/Student')

const router = express.Router()

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find()

    res.json(students)
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching students'
    })
  }
})


// POST a new student
router.post('/', async (req, res) => {
  try {

    const {
      name,
      email,
      rollNo,
      department,
      semester,
      mobile
    } = req.body


    // Check if student already exists
    const existingStudent = await Student.findOne({
      rollNo
    })

    if (existingStudent) {
      return res.json(existingStudent)
    }


    const student = new Student({
      name,
      email,
      rollNo,
      department,
      semester,
      mobile
    })

    const savedStudent = await student.save()

    res.status(201).json(savedStudent)

  } catch (error) {

    res.status(400).json({
      message: 'Error creating student',
      error: error.message
    })

  }
})


module.exports = router