import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {

  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const studentId = localStorage.getItem(
    'campusflowStudentId'
  )


  useEffect(() => {

    const fetchRegistrations = async () => {

      try {

        const response = await fetch(
          'http://localhost:5000/api/registrations'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch activities')
        }

        const data = await response.json()

        // Show only current student's registrations
        const studentRegistrations = data.filter(
          (registration) =>
            registration.studentId?._id === studentId
        )

        setRegistrations(studentRegistrations)

      } catch (error) {

        setError(error.message)

      } finally {

        setLoading(false)

      }

    }

    fetchRegistrations()

  }, [studentId])


  if (loading) {
    const handleCancel = async (registrationId) => {

  const confirmCancel = window.confirm(
    'Are you sure you want to cancel this registration?'
  )

  if (!confirmCancel) {
    return
  }


  try {

    const response = await fetch(
      `http://localhost:5000/api/registrations/${registrationId}`,
      {
        method: 'DELETE'
      }
    )


    const data = await response.json()


    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to cancel registration'
      )
    }


    // Remove cancelled registration from UI
    setRegistrations((current) =>
      current.filter(
        (registration) =>
          registration._id !== registrationId
      )
    )

  } catch (error) {

    setError(error.message)

  }

}
    return (
      <main className="py-5">
        <div className="container text-center py-5">

          <div className="spinner-border text-primary"></div>

          <p className="text-secondary mt-3">
            Loading your activities...
          </p>

        </div>
      </main>
    )
  }


  return (
    <main>

      <section className="py-5">

        <div className="container">

          <span className="section-label">
            STUDENT DASHBOARD
          </span>

          <h1 className="display-5 fw-bold mt-2">
            My Activities
          </h1>

          <p className="lead text-secondary">
            Track the events you have registered for.
          </p>


          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}


          {!error && registrations.length === 0 && (

            <div className="text-center py-5">

              <div className="display-4">
                📅
              </div>

              <h4 className="fw-bold mt-3">
                No activities yet
              </h4>

              <p className="text-secondary">
                Register for an event to see it here.
              </p>

              <Link
                to="/events"
                className="btn btn-primary"
              >
                Explore Events
              </Link>

            </div>

          )}


          {registrations.length > 0 && (

            <div className="row g-4 mt-2">

              {registrations.map((registration) => {

                const event = registration.eventId

                return (
                  <div
                    className="col-md-6 col-lg-4"
                    key={registration._id}
                  >

                    <div className="event-card h-100">

                      <span className="badge bg-primary">
                        {event.category}
                      </span>

                      <h4 className="fw-bold mt-3">
                        {event.title}
                      </h4>

                      <p className="text-secondary">
                        {event.description}
                      </p>

                      <div className="event-info">

                        <div>
                          📅 {event.date}
                        </div>

                        <div>
                          🕐 {event.time}
                        </div>

                        <div>
                          📍 {event.venue}
                        </div>

                      </div>


                      <div className="mt-4 d-flex justify-content-between align-items-center">

  <span className="badge bg-success">
    Registered
  </span>

  <button
    className="btn btn-outline-danger btn-sm"
    onClick={() => handleCancel(registration._id)}
  >
    Cancel
  </button>

</div>

                    </div>

                  </div>
                )

              })}

            </div>

          )}

        </div>

      </section>

    </main>
  )
}

export default Dashboard