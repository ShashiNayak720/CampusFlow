import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function EventDetails() {

  const { id } = useParams()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {

    const fetchEvent = async () => {

      try {

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/events`
        )

        if (!response.ok) {
          throw new Error('Event not found')
        }

        const data = await response.json()

        setEvent(data)

      } catch (error) {

        setError(true)

      } finally {

        setLoading(false)

      }
    }

    fetchEvent()

  }, [id])


  if (loading) {
    return (
      <main className="py-5">
        <div className="container text-center py-5">

          <div className="spinner-border text-primary"></div>

          <p className="text-secondary mt-3">
            Loading event details...
          </p>

        </div>
      </main>
    )
  }


  if (error || !event) {
    return (
      <main className="py-5">
        <div className="container text-center py-5">

          <div className="display-4">
            😕
          </div>

          <h3 className="fw-bold mt-3">
            Event not found
          </h3>

          <p className="text-secondary">
            The event you're looking for doesn't exist.
          </p>

          <Link
            to="/events"
            className="btn btn-primary"
          >
            Back to Events
          </Link>

        </div>
      </main>
    )
  }


  return (
    <main>

      <section className="py-5">

        <div className="container">

          <Link
            to="/events"
            className="text-decoration-none"
          >
            ← Back to Events
          </Link>


          <div className="row justify-content-center mt-4">

            <div className="col-lg-9">

              <div className="card border-0 shadow-sm">

                <div className="card-body p-4 p-lg-5">

                  <span className="badge bg-primary">
                    {event.category}
                  </span>

                  <h1 className="display-6 fw-bold mt-3">
                    {event.title}
                  </h1>

                  <p className="lead text-secondary mt-3">
                    {event.description}
                  </p>


                  <hr className="my-4" />


                  <div className="row g-4">

                    <div className="col-md-6">

                      <div className="text-secondary">
                        📅 Date
                      </div>

                      <strong>
                        {event.date}
                      </strong>

                    </div>


                    <div className="col-md-6">

                      <div className="text-secondary">
                        🕐 Time
                      </div>

                      <strong>
                        {event.time}
                      </strong>

                    </div>


                    <div className="col-md-6">

                      <div className="text-secondary">
                        📍 Venue
                      </div>

                      <strong>
                        {event.venue}
                      </strong>

                    </div>


                    <div className="col-md-6">

                      <div className="text-secondary">
                        👤 Organizer
                      </div>

                      <strong>
                        {event.organizer}
                      </strong>

                    </div>


                    <div className="col-md-6">

  <div className="text-secondary">
    👥 Seats Available
  </div>

  <strong>
    {event.availableSeats} / {event.capacity}
  </strong>

</div>
                  </div>


                  <div className="mt-5">

  {event.availableSeats > 0 ? (

    <Link
      to={`/events/${event._id}/register`}
      className="btn btn-primary btn-lg"
    >
      Register for Event
    </Link>

  ) : (

    <button
      className="btn btn-secondary btn-lg"
      disabled
    >
      Event Full
    </button>

  )}

</div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

export default EventDetails