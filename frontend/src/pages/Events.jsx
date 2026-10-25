import { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'

function Events() {

  const [events, setEvents] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/events'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }

        const data = await response.json()

        setEvents(data)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const categories = [
    'All',
    'Technical',
    'Innovation',
    'Cultural',
    'Sports'
  ]

  const filteredEvents = events.filter((event) => {

    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' ||
      event.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <main>

      <section className="events-header py-5">
        <div className="container">

          <span className="section-label">
            CAMPUS ACTIVITIES
          </span>

          <h1 className="display-5 fw-bold mt-2">
            Explore Events
          </h1>

          <p className="lead text-secondary">
            Discover what's happening around campus.
          </p>

        </div>
      </section>

      <section className="py-4 bg-white">
        <div className="container">

          <div className="row g-3">

            <div className="col-lg-7">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search events..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <div className="col-lg-5">
              <select
                className="form-select form-select-lg"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </div>
      </section>

      <section className="py-5">
        <div className="container">

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p className="text-secondary mt-3">
                Loading events...
              </p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              Unable to load events. Make sure the backend server is running.
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">

                <h3 className="fw-bold mb-0">
                  Upcoming Events
                </h3>

                <span className="text-secondary">
                  {filteredEvents.length} events found
                </span>

              </div>

              {filteredEvents.length > 0 ? (

                <div className="row g-4">

                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event._id}
                      event={event}
                    />
                  ))}

                </div>

              ) : (

                <div className="empty-state text-center py-5">

                  <div className="display-4">
                    🔎
                  </div>

                  <h4 className="fw-bold mt-3">
                    No events found
                  </h4>

                  <p className="text-secondary">
                    Try changing your search or category.
                  </p>

                </div>

              )}

            </>
          )}

        </div>
      </section>

    </main>
  )
}

export default Events