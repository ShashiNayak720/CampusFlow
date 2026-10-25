function About() {
  return (
    <main>

      {/* Header */}
      <section className="about-header py-5">

        <div className="container text-center">

          <span className="section-label">
            ABOUT CAMPUSFLOW
          </span>

          <h1 className="display-5 fw-bold mt-2">
            Connecting Students with Campus Life
          </h1>

          <p className="lead text-secondary mx-auto about-intro">
            CampusFlow is a smart campus engagement platform
            designed to help students discover, participate in
            and keep track of meaningful campus activities.
          </p>

        </div>

      </section>


      {/* Mission */}
      <section className="py-5">

        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <span className="section-label">
                OUR MISSION
              </span>

              <h2 className="fw-bold mt-2">
                Making campus participation simple.
              </h2>

              <p className="text-secondary mt-3">
                Students often miss workshops, hackathons,
                cultural programs and other activities because
                information is scattered across different
                channels.
              </p>

              <p className="text-secondary">
                CampusFlow brings these experiences together
                in one simple platform where students can
                discover events, register and manage their
                activities.
              </p>

            </div>

            <div className="col-lg-6">

              <div className="about-highlight">

                <div className="display-3">
                  🎓
                </div>

                <h3 className="fw-bold mt-3">
                  Your Campus.
                  <br />
                  Your Experience.
                </h3>

                <p className="text-secondary mb-0">
                  Discover more. Participate more. Connect more.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Features */}
      <section className="py-5 bg-white">

        <div className="container">

          <div className="text-center mb-5">

            <span className="section-label">
              WHAT WE OFFER
            </span>

            <h2 className="fw-bold mt-2">
              Everything in one place
            </h2>

          </div>

          <div className="row g-4">

            <div className="col-md-4">

              <div className="about-feature">

                <div className="feature-icon">
                  🔎
                </div>

                <h4 className="fw-bold">
                  Discover
                </h4>

                <p className="text-secondary">
                  Find technical, cultural, sports and
                  innovation events happening around campus.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="about-feature">

                <div className="feature-icon">
                  🎟️
                </div>

                <h4 className="fw-bold">
                  Participate
                </h4>

                <p className="text-secondary">
                  Register for events quickly and keep track
                  of your campus activities.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="about-feature">

                <div className="feature-icon">
                  📊
                </div>

                <h4 className="fw-bold">
                  Manage
                </h4>

                <p className="text-secondary">
                  Organizers can manage events and understand
                  participation through analytics.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Technology */}
      <section className="py-5">

        <div className="container text-center">

          <span className="section-label">
            TECHNOLOGY
          </span>

          <h2 className="fw-bold mt-2">
            Built with modern web technologies
          </h2>

          <p className="text-secondary mx-auto about-intro">
            CampusFlow combines the technologies learned
            throughout the Full Stack Development course
            into one integrated application.
          </p>

          <div className="tech-list mt-4">

            <span>React</span>
            <span>Bootstrap</span>
            <span>JavaScript</span>
            <span>Express</span>
            <span>Node.js</span>
            <span>MongoDB</span>

          </div>

        </div>

      </section>

    </main>
  )
}

export default About