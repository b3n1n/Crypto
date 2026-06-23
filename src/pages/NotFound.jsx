import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="container vh-100 d-flex flex-column justify-content-center align-items-center"
    >
      <h1 className="display-1 fw-bold">
        404
      </h1>

      <h3>
        Page not found
      </h3>

      <Link
        to="/"
        className="btn btn-primary mt-3"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;