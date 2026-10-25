import { useEffect, useState } from 'react'

function Admin() {

  const emptyForm = {
    title: '',
    description: '',
    category: 'Technical',
    date: '',
    time: '',
    venue: '',
    organizer: '',
    capacity: ''
  }

  const [events, setEvents] = useState([])
  const [registrations, setRegistrations] = useState([])

  const [formData, setFormData] = useState(emptyForm)

  const [editingId, setEditingId] = useState(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [error, setError] = useState('')


  // Load admin data
  const fetchAdminData = async () => {

    try {

      const [eventsResponse, registrationsResponse] =
        await Promise.all([

          fetch(
            `${import.meta.env.VITE_API_URL}/api/events`
          ),

          fetch(
            `${import.meta.env.VITE_API_URL}/api/registrations`
          )

        ])


      if (
        !eventsResponse.ok ||
        !registrationsResponse.ok
      ) {
        throw new Error(
          'Failed to load admin data'
        )
      }


      const eventsData =
        await eventsResponse.json()

      const registrationsData =
        await registrationsResponse.json()


      setEvents(eventsData)
      setRegistrations(registrationsData)

    } catch (error) {

      setError(error.message)

    } finally {

      setLoading(false)

    }

  }


  useEffect(() => {
    fetchAdminData()
  }, [])


  // Handle form changes
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }


  // Add / Update event
  const handleSubmit = async (e) => {

    e.preventDefault()

    setError('')


    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.time ||
      !formData.venue ||
      !formData.organizer ||
      !formData.capacity
    ) {
      setError('Please fill in all fields.')
      return
    }


    try {

      setSaving(true)


      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/api/events/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/events`


      const method = editingId
        ? 'PUT'
        : 'POST'


      const response = await fetch(
        url,
        {
          method,

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            ...formData,
            capacity: Number(formData.capacity)
          })
        }
      )


      const data = await response.json()


      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to save event'
        )
      }


      // Reset form
      setFormData(emptyForm)
      setEditingId(null)

      // Refresh events
      await fetchAdminData()

    } catch (error) {

      setError(error.message)

    } finally {

      setSaving(false)

    }

  }


  // Start editing
  const handleEdit = (event) => {

    setEditingId(event._id)

    setFormData({
      title: event.title,
      description: event.description,
      category: event.category,
      date: event.date,
      time: event.time,
      venue: event.venue,
      organizer: event.organizer,
      capacity: event.capacity
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

  }


  // Cancel editing
  const handleCancelEdit = () => {

    setEditingId(null)
    setFormData(emptyForm)

  }


  // Delete event
  const handleDelete = async (eventId) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this event?'
    )

    if (!confirmDelete) {
      return
    }


    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}`,
        {
          method: 'DELETE'
        }
      )


      const data = await response.json()


      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to delete event'
        )
      }


      await fetchAdminData()

    } catch (error) {

      setError(error.message)

    }

  }


  if (loading) {
    return (
      <main className="py-5">

        <div className="container text-center py-5">

          <div className="spinner-border text-primary"></div>

          <p className="text-secondary mt-3">
            Loading admin dashboard...
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
            ADMINISTRATION
          </span>

          <h1 className="display-5 fw-bold mt-2">
            Admin Dashboard
          </h1>

          <p className="lead text-secondary">
            Manage campus events and monitor participation.
          </p>


          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}


          {/* Statistics */}

          <div className="row g-4 mt-3">

            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body">

                  <div className="text-secondary">
                    Total Events
                  </div>

                  <div className="display-5 fw-bold">
                    {events.length}
                  </div>

                </div>

              </div>

            </div>


            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body">

                  <div className="text-secondary">
                    Total Registrations
                  </div>

                  <div className="display-5 fw-bold">
                    {registrations.length}
                  </div>

                </div>

              </div>

            </div>


            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body">

                  <div className="text-secondary">
                    Active Participation
                  </div>

                  <div className="display-5 fw-bold">
                    {registrations.length}
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Event Form */}

          <div className="card border-0 shadow-sm mt-5">

            <div className="card-body p-4">

              <h3 className="fw-bold mb-4">

                {editingId
                  ? 'Edit Event'
                  : 'Add New Event'
                }

              </h3>


              <form onSubmit={handleSubmit}>

                <div className="row g-3">


                  <div className="col-md-6">

                    <label className="form-label">
                      Event Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Event title"
                    />

                  </div>


                  <div className="col-md-6">

                    <label className="form-label">
                      Category
                    </label>

                    <select
                      name="category"
                      className="form-select"
                      value={formData.category}
                      onChange={handleChange}
                    >

                      <option value="Technical">
                        Technical
                      </option>

                      <option value="Innovation">
                        Innovation
                      </option>

                      <option value="Cultural">
                        Cultural
                      </option>

                      <option value="Sports">
                        Sports
                      </option>

                    </select>

                  </div>


                  <div className="col-12">

                    <label className="form-label">
                      Description
                    </label>

                    <textarea
                      name="description"
                      className="form-control"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Event description"
                    />

                  </div>


                  <div className="col-md-6">

                    <label className="form-label">
                      Date
                    </label>

                    <input
                      type="text"
                      name="date"
                      className="form-control"
                      value={formData.date}
                      onChange={handleChange}
                      placeholder="November 25, 2026"
                    />

                  </div>


                  <div className="col-md-6">

                    <label className="form-label">
                      Time
                    </label>

                    <input
                      type="text"
                      name="time"
                      className="form-control"
                      value={formData.time}
                      onChange={handleChange}
                      placeholder="10:00 AM"
                    />

                  </div>


                  <div className="col-md-6">

                    <label className="form-label">
                      Venue
                    </label>

                    <input
                      type="text"
                      name="venue"
                      className="form-control"
                      value={formData.venue}
                      onChange={handleChange}
                      placeholder="Seminar Hall"
                    />

                  </div>


                  <div className="col-md-6">

                    <label className="form-label">
                      Organizer
                    </label>

                    <input
                      type="text"
                      name="organizer"
                      className="form-control"
                      value={formData.organizer}
                      onChange={handleChange}
                      placeholder="Department / Club"
                    />

                  </div>


                  <div className="col-md-6">

                    <label className="form-label">
                      Capacity
                    </label>

                    <input
                      type="number"
                      name="capacity"
                      className="form-control"
                      value={formData.capacity}
                      onChange={handleChange}
                      min="1"
                      placeholder="60"
                    />

                  </div>


                  <div className="col-12">

                    <button
                      type="submit"
                      className="btn btn-primary me-2"
                      disabled={saving}
                    >

                      {saving
                        ? 'Saving...'
                        : editingId
                          ? 'Update Event'
                          : 'Add Event'
                      }

                    </button>


                    {editingId && (

                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancelEdit}
                      >
                        Cancel Edit
                      </button>

                    )}

                  </div>

                </div>

              </form>

            </div>

          </div>


          {/* Event Management Table */}

          <div className="mt-5">

            <h3 className="fw-bold mb-4">
              Manage Events
            </h3>


            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead>

                  <tr>

                    <th>Event</th>
                    <th>Category</th>
                    <th>Capacity</th>
                    <th>Registered</th>
                    <th>Available</th>
                    <th>Actions</th>

                  </tr>

                </thead>


                <tbody>

                  {events.map((event) => (

                    <tr key={event._id}>

                      <td>

                        <div className="fw-semibold">
                          {event.title}
                        </div>

                        <small className="text-secondary">
                          {event.date}
                        </small>

                      </td>


                      <td>
                        {event.category}
                      </td>


                      <td>
                        {event.capacity}
                      </td>


                      <td>
                        {event.registeredCount}
                      </td>


                      <td>

                        <span
                          className={
                            event.availableSeats === 0
                              ? 'badge bg-danger'
                              : 'badge bg-success'
                          }
                        >
                          {event.availableSeats}
                        </span>

                      </td>


                      <td>

                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() =>
                            handleEdit(event)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            handleDelete(event._id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>


          {/* Registrations */}

          <div className="mt-5">

            <h3 className="fw-bold mb-4">
              Student Registrations
            </h3>


            <div className="table-responsive">

              <table className="table table-hover">

                <thead>

                  <tr>

                    <th>Student</th>
                    <th>Roll No</th>
                    <th>Event</th>
                    <th>Status</th>

                  </tr>

                </thead>


                <tbody>

                  {registrations.map((registration) => (

                    <tr key={registration._id}>

                      <td>
                        {registration.studentId?.name}
                      </td>

                      <td>
                        {registration.studentId?.rollNo}
                      </td>

                      <td>
                        {registration.eventId?.title}
                      </td>

                      <td>

                        <span className="badge bg-success">
                          {registration.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

export default Admin