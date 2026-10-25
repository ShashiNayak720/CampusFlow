import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container py-2">

        <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">
          CampusFlow
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/events">
                Events
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                My Activities
              </Link>
            </li>
            <li className="nav-item">
  <Link className="nav-link" to="/quiz">
    Campus Challenge
  </Link>
</li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

            <li className="nav-item ms-lg-2">
              <Link className="btn btn-primary px-4" to="/events">
                Explore Events
              </Link>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Navbar