import { useState } from 'react'

function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    setSubmitted(true)

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  return (
    <main>

      {/* Header */}
      <section className="contact-header py-5">

        <div className="container text-center">

          <span className="section-label">
            GET IN TOUCH
          </span>

          <h1 className="display-5 fw-bold mt-2">
            Contact CampusFlow
          </h1>

          <p className="lead text-secondary">
            Have a question, suggestion or feedback?
            We'd love to hear from you.
          </p>

        </div>

      </section>


      {/* Contact Content */}
      <section className="py-5">

        <div className="container">

          <div className="row g-5">

            {/* Contact Information */}

            <div className="col-lg-5">

              <span className="section-label">
                CONTACT INFORMATION
              </span>

              <h2 className="fw-bold mt-2">
                Let's talk.
              </h2>

              <p className="text-secondary mt-3">
                Whether you are a student looking for an
                event or an organizer planning one, feel free
                to reach out.
              </p>


              <div className="contact-info-list mt-4">

                <div className="contact-info-item">

                  <span>📧</span>

                  <div>
                    <small className="text-secondary">
                      Email
                    </small>

                    <strong>
                      campusflow@example.com
                    </strong>
                  </div>

                </div>


                <div className="contact-info-item">

                  <span>📍</span>

                  <div>
                    <small className="text-secondary">
                      Location
                    </small>

                    <strong>
                      Campus Innovation Center
                    </strong>
                  </div>

                </div>


                <div className="contact-info-item">

                  <span>🕐</span>

                  <div>
                    <small className="text-secondary">
                      Support Hours
                    </small>

                    <strong>
                      Monday – Friday, 9 AM – 5 PM
                    </strong>
                  </div>

                </div>

              </div>

            </div>


            {/* Contact Form */}

            <div className="col-lg-7">

              <div className="contact-form-card">

                {submitted && (

                  <div className="alert alert-success">
                    Your message has been submitted successfully!
                  </div>

                )}

                <h3 className="fw-bold mb-4">
                  Send us a message
                </h3>

                <form onSubmit={handleSubmit}>

                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <label className="form-label fw-semibold">
                        Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />

                    </div>


                    <div className="col-md-6 mb-3">

                      <label className="form-label fw-semibold">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>


                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Subject
                    </label>

                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Message
                    </label>

                    <textarea
                      name="message"
                      className="form-control"
                      rows="5"
                      placeholder="Write your message..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                  >
                    Send Message
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

export default Contact