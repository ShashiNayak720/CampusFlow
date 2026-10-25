import { Link } from 'react-router-dom'

function EventCard({ event }) {

  const getBadgeClass = (category) => {

    if (category === 'Technical') {
      return 'bg-primary'
    }

    if (category === 'Innovation') {
      return 'bg-success'
    }

    if (category === 'Cultural') {
      return 'bg-warning text-dark'
    }

    if (category === 'Sports') {
      return 'bg-danger'
    }

    return 'bg-secondary'
  }


  return (
    <div className="col-md-6 col-lg-4">

      <div className="event-card h-100">

        <div className="event-card-top">

          <span
            className={`badge ${getBadgeClass(event.category)}`}
          >
            {event.category}
          </span>

          <span className="event-date">
            {event.date}
          </span>

        </div>


        <h4 className="fw-bold mt-3">
          {event.title}
        </h4>


        <p className="text-secondary">
          {event.description}
        </p>


        <div className="event-info">

          <div>
            📍 {event.venue}
          </div>

          <div>
            🕐 {event.time}
          </div>

          <div>
            👥 {event.availableSeats} seats available
          </div>

        </div>


        <Link
          to={`/events/${event._id}`}
          className="btn btn-outline-primary w-100 mt-4"
        >
          View Details
        </Link>

      </div>

    </div>
  )
}

export default EventCard