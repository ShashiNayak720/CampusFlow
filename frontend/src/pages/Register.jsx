import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Register() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    department: '',
    semester: '',
    mobile: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }


  const handleSubmit = async (e) => {

    e.preventDefault()

    setError('')


    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.rollNo ||
      !formData.department ||
      !formData.semester ||
      !formData.mobile
    ) {
      setError('Please fill in all fields.')
      return
    }


    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }


    if (formData.mobile.length < 10) {
      setError('Mobile number must contain at least 10 digits.')
      return
    }


    try {

      setLoading(true)


      // STEP 1: Create/find student
      const studentResponse = await fetch(
        'http://localhost:5000/api/students',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(formData)
        }
      )


      const studentData = await studentResponse.json()


      if (!studentResponse.ok) {
        throw new Error(
          studentData.message || 'Student registration failed'
        )
      }


      // Save student ID for My Activities
      localStorage.setItem(
        'campusflowStudentId',
        studentData._id
      )


      // STEP 2: Register student for event
      const registrationResponse = await fetch(
        'http://localhost:5000/api/registrations',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            studentId: studentData._id,
            eventId: id
          })
        }
      )


      const registrationData =
        await registrationResponse.json()


      if (!registrationResponse.ok) {
        throw new Error(
          registrationData.message ||
          'Event registration failed'
        )
      }


      // Registration successful
      navigate('/dashboard')

    } catch (error) {

      setError(error.message)

    } finally {

      setLoading(false)

    }

  }


  return (
    <main>

      <section className="py-5">

        <div className="container">

          <div className="row justify-content-center">

            <div className="col-lg-7">

              <Link
                to={`/events/${id}`}
                className="text-decoration-none"
              >
                ← Back to Event
              </Link>


              <div className="card border-0 shadow-sm mt-4">

                <div className="card-body p-4 p-lg-5">

                  <span className="section-label">
                    EVENT REGISTRATION
                  </span>

                  <h1 className="fw-bold mt-2">
                    Register for Event
                  </h1>

                  <p className="text-secondary">
                    Enter your details to register.
                  </p>


                  {error && (
                    <div className="alert alert-danger">
                      {error}
                    </div>
                  )}


                  <form onSubmit={handleSubmit}>


                    {/* Name */}

                    <div className="mb-3">

                      <label className="form-label fw-semibold">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                      />

                    </div>


                    {/* Email */}

                    <div className="mb-3">

                      <label className="form-label fw-semibold">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                      />

                    </div>


                    {/* Roll Number */}

                    <div className="mb-3">

                      <label className="form-label fw-semibold">
                        Roll Number
                      </label>

                      <input
                        type="text"
                        name="rollNo"
                        className="form-control"
                        placeholder="Enter your roll number"
                        value={formData.rollNo}
                        onChange={handleChange}
                      />

                    </div>


                    {/* Department */}

                    <div className="mb-3">

                      <label className="form-label fw-semibold">
                        Department
                      </label>

                      <select
                        name="department"
                        className="form-select"
                        value={formData.department}
                        onChange={handleChange}
                      >

                        <option value="">
                          Select department
                        </option>

                        <option value="CSE">
                          CSE
                        </option>

                        <option value="CSE(AIML)">
                          CSE(AIML)
                        </option>

                        <option value="ECE">
                          ECE
                        </option>

                        <option value="EEE">
                          EEE
                        </option>

                        <option value="CIVIL">
                          CIVIL
                        </option>

                        <option value="MECH">
                          MECH
                        </option>

                      </select>

                    </div>


                    {/* Semester */}

                    <div className="mb-3">

                      <label className="form-label fw-semibold">
                        Semester
                      </label>

                      <select
                        name="semester"
                        className="form-select"
                        value={formData.semester}
                        onChange={handleChange}
                      >

                        <option value="">
                          Select semester
                        </option>

                        <option value="1st">
                          1st
                        </option>

                        <option value="2nd">
                          2nd
                        </option>

                        <option value="3rd">
                          3rd
                        </option>

                        <option value="4th">
                          4th
                        </option>

                        <option value="5th">
                          5th
                        </option>

                        <option value="6th">
                          6th
                        </option>

                        <option value="7th">
                          7th
                        </option>

                        <option value="8th">
                          8th
                        </option>

                      </select>

                    </div>


                    {/* Mobile */}

                    <div className="mb-4">

                      <label className="form-label fw-semibold">
                        Mobile Number
                      </label>

                      <input
                        type="tel"
                        name="mobile"
                        className="form-control"
                        placeholder="Enter mobile number"
                        value={formData.mobile}
                        onChange={handleChange}
                      />

                    </div>


                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                      disabled={loading}
                    >

                      {loading
                        ? 'Registering...'
                        : 'Complete Registration'
                      }

                    </button>


                  </form>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

export default Register