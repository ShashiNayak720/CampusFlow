import { Link } from 'react-router-dom'
import WeatherCard from '../components/WeatherCard'
function Home() {
  return (
    <>


      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">

          <div className="row align-items-center min-vh-75">

            <div className="col-lg-7">

              <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
                Smart Campus Engagement Platform
              </span>

              <h1 className="display-3 fw-bold mb-4">
                Your Campus.
                <br />
                Your <span className="text-primary">Experience.</span>
              </h1>

              <p className="lead text-secondary mb-4 hero-text">
                Discover campus events, connect with students,
                participate in activities, and make the most
                of your college experience.
              </p>

              <div className="d-flex gap-3 flex-wrap">

                <Link
                  to="/events"
                  className="btn btn-primary btn-lg px-4"
                >
                  Explore Events →
                </Link>

                <Link
                  to="/about"
                  className="btn btn-outline-dark btn-lg px-4"
                >
                  Learn More
                </Link>

              </div>

            </div>

            <div className="col-lg-5 mt-5 mt-lg-0">

              <div className="hero-card">

                <div className="hero-icon">
                  🎓
                </div>

                <h3 className="fw-bold mt-3">
                  CampusFlow
                </h3>

                <p className="text-secondary">
                  Discover. Participate. Connect.
                </p>

                <div className="row text-center mt-4">

                  <div className="col-4">
                    <h4 className="fw-bold text-primary">36+</h4>
                    <small className="text-secondary">
                      Events
                    </small>
                  </div>

                  <div className="col-4">
                    <h4 className="fw-bold text-primary">420+</h4>
                    <small className="text-secondary">
                      Students
                    </small>
                  </div>

                  <div className="col-4">
                    <h4 className="fw-bold text-primary">1.2K+</h4>
                    <small className="text-secondary">
                      Registrations
                    </small>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Why CampusFlow */}
      <section className="py-5 bg-white">

        <div className="container">

          <div className="text-center mb-5">

            <span className="section-label">
              WHY CAMPUSFLOW?
            </span>

            <h2 className="fw-bold mt-2">
              Everything happening on campus,
              <br />
              in one place.
            </h2>

          </div>


          <div className="row g-4">

            <div className="col-md-4">

              <div className="feature-card h-100">

                <div className="feature-icon">
                  🔎
                </div>

                <h4 className="fw-bold">
                  Discover
                </h4>

                <p className="text-secondary">
                  Find workshops, hackathons, cultural
                  programs, sports events and more.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="feature-card h-100">

                <div className="feature-icon">
                  🎯
                </div>

                <h4 className="fw-bold">
                  Participate
                </h4>

                <p className="text-secondary">
                  Register for events and keep track
                  of all your campus activities.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="feature-card h-100">

                <div className="feature-icon">
                  🤝
                </div>

                <h4 className="fw-bold">
                  Connect
                </h4>

                <p className="text-secondary">
                  Build experiences, meet people and
                  become an active part of campus life.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Upcoming Events */}
      <section className="py-5">

        <div className="container">

          <div className="d-flex justify-content-between align-items-end mb-4">

            <div>

              <span className="section-label">
                DON'T MISS OUT
              </span>

              <h2 className="fw-bold mt-2">
                Upcoming Events
              </h2>

            </div>

            <Link
              to="/events"
              className="btn btn-outline-primary"
            >
              View All
            </Link>

          </div>


          <div className="row g-4">

            <div className="col-md-4">

              <div className="event-preview-card">

                <span className="badge bg-primary mb-3">
                  Technical
                </span>

                <h4 className="fw-bold">
                  AI & Machine Learning Workshop
                </h4>

                <p className="text-secondary">
                  Learn practical applications of
                  modern AI technologies.
                </p>

                <div className="small text-secondary">
                  📅 October 25, 2026
                  <br />
                  📍 Computer Lab 3
                </div>

              </div>

            </div>


            <div className="col-md-4">

              <div className="event-preview-card">

                <span className="badge bg-success mb-3">
                  Innovation
                </span>

                <h4 className="fw-bold">
                  Campus Hackathon 2026
                </h4>

                <p className="text-secondary">
                  Build innovative solutions to
                  real-world problems.
                </p>

                <div className="small text-secondary">
                  📅 November 02, 2026
                  <br />
                  📍 Main Auditorium
                </div>

              </div>

            </div>


            <div className="col-md-4">

              <div className="event-preview-card">

                <span className="badge bg-warning text-dark mb-3">
                  Cultural
                </span>

                <h4 className="fw-bold">
                  Campus Cultural Fest
                </h4>

                <p className="text-secondary">
                  Music, dance, art and unforgettable
                  campus experiences.
                </p>

                <div className="small text-secondary">
                  📅 November 08, 2026
                  <br />
                  📍 Open Air Theatre
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
      <section className="py-5">
  <div className="container">

    <div className="quiz-promo">

      <div>
        <span className="section-label">
          CAMPUS CHALLENGE
        </span>

        <h2 className="fw-bold mt-2">
          Think You Know CampusFlow?
        </h2>

        <p className="text-secondary mb-0">
          Take a quick 5-question quiz and test your
          knowledge of web development and CampusFlow.
        </p>
      </div>

      <Link
        to="/quiz"
        className="btn btn-primary btn-lg px-4"
      >
        Take the Challenge →
      </Link>

    </div>

  </div>
</section>
  <WeatherCard />


      {/* CTA */}
      <section className="cta-section py-5">

        <div className="container text-center">

          <h2 className="fw-bold">
            Ready to experience campus differently?
          </h2>

          <p className="mb-4">
            Discover what's happening around you.
          </p>

          <Link
            to="/events"
            className="btn btn-light btn-lg px-5"
          >
            Explore Campus Events
          </Link>

        </div>

      </section>

    </>
  )
}

export default Home