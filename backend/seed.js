const mongoose = require('mongoose')
require('dotenv').config()

const Event = require('./models/Event')

const events = [
  {
    title: 'AI & Machine Learning Workshop',
    description:
      'Learn practical applications of modern AI technologies and machine learning.',
    category: 'Technical',
    date: 'October 25, 2026',
    time: '10:00 AM',
    venue: 'Computer Lab 3',
    organizer: 'AIML Department',
    capacity: 60
  },
  {
    title: 'Campus Hackathon 2026',
    description:
      'Build innovative solutions to real-world problems and compete with fellow students.',
    category: 'Innovation',
    date: 'November 02, 2026',
    time: '09:00 AM',
    venue: 'Main Auditorium',
    organizer: 'Innovation Club',
    capacity: 100
  },
  {
    title: 'Campus Cultural Fest',
    description:
      'Experience music, dance, art and unforgettable campus moments.',
    category: 'Cultural',
    date: 'November 08, 2026',
    time: '04:00 PM',
    venue: 'Open Air Theatre',
    organizer: 'Cultural Committee',
    capacity: 200
  },
  {
    title: 'Web Development Bootcamp',
    description:
      'Build modern responsive websites using HTML, CSS, JavaScript and React.',
    category: 'Technical',
    date: 'November 12, 2026',
    time: '10:00 AM',
    venue: 'Innovation Lab',
    organizer: 'Web Development Club',
    capacity: 80
  },
  {
    title: 'Inter-College Sports Meet',
    description:
      'Compete across multiple sports and represent your department.',
    category: 'Sports',
    date: 'November 15, 2026',
    time: '08:00 AM',
    venue: 'College Sports Ground',
    organizer: 'Sports Committee',
    capacity: 150
  },
  {
    title: 'Entrepreneurship Meetup',
    description:
      'Connect with aspiring entrepreneurs and explore ideas, startups and innovation.',
    category: 'Innovation',
    date: 'November 20, 2026',
    time: '02:00 PM',
    venue: 'Seminar Hall',
    organizer: 'Entrepreneurship Cell',
    capacity: 75
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    await Event.deleteMany()

    await Event.insertMany(events)

    console.log('6 CampusFlow events inserted successfully ✅')

    await mongoose.connection.close()
  } catch (error) {
    console.log('Seeding error:', error.message)
  }
}

seedDatabase()