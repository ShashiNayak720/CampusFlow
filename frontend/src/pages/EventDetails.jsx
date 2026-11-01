import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const pastEventData = {
  "AI & Machine Learning Workshop": {
    edition: "2025 Edition",
    participants: "54 Students",
    winner: "Team Neural Nexus",
    achievement: "Best AI Project",
    highlight:
      "Students presented practical AI solutions focused on automation, prediction and intelligent campus applications.",
    photos: [
      "https://images.unsplash.com/photo-1758270705317-3ef6142d306f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1778876092192-e76c88c48f12?auto=format&fit=crop&w=1200&q=80"
    ]
  },

  "Campus Hackathon 2026": {
    edition: "2025 Edition",
    participants: "86 Participants",
    winner: "Team CodeCrafters",
    achievement: "Best Innovation Project",
    highlight:
      "Teams worked continuously to develop innovative solutions for real-world campus and community problems.",
    photos: [
      "https://images.unsplash.com/photo-1758270705317-3ef6142d306f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1758270705290-62b6294dd044?auto=format&fit=crop&w=1200&q=80"
    ]
  },

  "Campus Cultural Fest": {
    edition: "2025 Edition",
    participants: "180+ Participants",
    winner: "Team Nritya",
    achievement: "Overall Cultural Champions",
    highlight:
      "The previous edition featured dance, music, art and cultural performances with strong participation from students across departments.",
    photos: [
      "https://images.unsplash.com/photo-1770144149006-b6006ceaec1a?auto=format&fit=crop&w=1200&q=80"
    ]
  },

  "Web Development Bootcamp": {
    edition: "2025 Edition",
    participants: "72 Students",
    winner: "Aarav Mehta",
    achievement: "Top Performer",
    highlight:
      "Participants built responsive web applications while learning modern frontend development, APIs and deployment.",
    photos: [
      "https://images.unsplash.com/photo-1758270705317-3ef6142d306f?auto=format&fit=crop&w=1200&q=80"
    ]
  },

  "Inter-College Sports Meet": {
    edition: "2025 Edition",
    participants: "128 Athletes",
    winner: "CSE Warriors",
    achievement: "Overall Champions",
    highlight:
      "The previous sports meet brought together student teams for competitive matches across multiple sporting events.",
    photos: [
      "https://images.unsplash.com/photo-1746937107789-895b1d2f5c3a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631801751858-9f4f5a2fbdb4?auto=format&fit=crop&w=1200&q=80"
    ]
  },

  "Entrepreneurship Meetup": {
    edition: "2025 Edition",
    participants: "65 Participants",
    winner: "EcoTrack",
    achievement: "Best Startup Pitch",
    highlight:
      "Students presented startup ideas to a panel and received feedback on business models, innovation and market potential.",
    photos: [
      "https://images.unsplash.com/photo-1778876092192-e76c88c48f12?auto=format&fit=crop&w=1200&q=80"
    ]
  }
}

function EventDetails() {

  const { id } = useParams()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {

    const fetchEvent = async () => {

      try {

        // Fetch the specific event using its ID
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/events/${id}`
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


  // Get previous edition information
  const pastEvent = pastEventData[event.title]


  return (
    <main>

      <section className="py-5">

        <div className="container">

          {/* Back Button */}

          <Link
            to="/events"
            className="text-decoration-none"
          >
            ← Back to Events
          </Link>


          {/* Current Event Details */}

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


                  {/* Event Information */}

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


                  {/* Registration Button */}

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


          {/* ================================= */}
          {/* PREVIOUS EDITION HIGHLIGHTS */}
          {/* ================================= */}

          {pastEvent && (

            <div className="row justify-content-center mt-5">

              <div className="col-lg-9">

                {/* Section Heading */}

                <div className="mb-4">

                  <span className="badge bg-light text-primary border">
                    CAMPUSFLOW ARCHIVE
                  </span>

                  <h2 className="fw-bold mt-2 mb-2">
                    Previous Edition Highlights
                  </h2>

                  <p className="text-secondary">
                    Take a look at highlights, achievements and memorable
                    moments from the previous edition of this event.
                  </p>

                </div>


                <div className="row g-4">


                  {/* ========================= */}
                  {/* EVENT PHOTOS */}
                  {/* ========================= */}

                  <div className="col-lg-7">

                    <div className="card border-0 shadow-sm h-100">

                      <div className="card-body p-4">

                        <div className="d-flex justify-content-between align-items-start mb-3">

                          <div>

                            <h5 className="fw-bold mb-1">
                              Event Moments
                            </h5>

                            <small className="text-secondary">
                              {pastEvent.edition}
                            </small>

                          </div>

                          <span className="badge bg-primary-subtle text-primary">
                            Previous Edition
                          </span>

                        </div>


                        <div className="row g-3">

                          {pastEvent.photos.map((photo, index) => (

                            <div
                              className={
                                pastEvent.photos.length === 1
                                  ? "col-12"
                                  : "col-6"
                              }
                              key={index}
                            >

                              <div
                                className="rounded overflow-hidden"
                                style={{
                                  height:
                                    pastEvent.photos.length === 1
                                      ? "280px"
                                      : "180px"
                                }}
                              >

                                <img
                                  src={photo}
                                  alt={`${event.title} previous edition`}
                                  className="w-100 h-100"
                                  style={{
                                    objectFit: "cover"
                                  }}
                                />

                              </div>

                            </div>

                          ))}

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* ========================= */}
                  {/* PREVIOUS WINNER */}
                  {/* ========================= */}

                  <div className="col-lg-5">

                    <div
                      className="card border-0 shadow-sm h-100 text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, #111827, #1f2937)"
                      }}
                    >

                      <div className="card-body p-4">

                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center mb-4"
                          style={{
                            width: "50px",
                            height: "50px",
                            background: "rgba(255,255,255,0.1)",
                            fontSize: "24px"
                          }}
                        >
                          🏆
                        </div>


                        <small
                          className="fw-bold"
                          style={{
                            color: "#a5b4fc",
                            letterSpacing: "1.2px"
                          }}
                        >
                          PREVIOUS EDITION WINNER
                        </small>


                        <h3 className="fw-bold mt-2 mb-1">
                          {pastEvent.winner}
                        </h3>


                        <p
                          className="mb-4"
                          style={{
                            color: "#c7d2fe"
                          }}
                        >
                          {pastEvent.achievement}
                        </p>


                        <hr
                          style={{
                            borderColor: "rgba(255,255,255,0.15)"
                          }}
                        />


                        <div className="d-flex justify-content-between align-items-center my-3">

                          <span
                            style={{
                              color: "#9ca3af"
                            }}
                          >
                            Participation
                          </span>

                          <strong>
                            {pastEvent.participants}
                          </strong>

                        </div>


                        <p
                          className="mb-0"
                          style={{
                            color: "#d1d5db",
                            lineHeight: "1.7"
                          }}
                        >
                          {pastEvent.highlight}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>


                {/* Archive Disclaimer */}

                <div
                  className="alert alert-light border mt-4 small text-secondary"
                  role="alert"
                >
                  ℹ️ Previous edition information is sample archive
                  content created for demonstration purposes.
                </div>

              </div>

            </div>

          )}

        </div>

      </section>

    </main>
  )
}

export default EventDetails
