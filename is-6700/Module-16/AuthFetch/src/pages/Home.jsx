import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <h1>Welcome to AuthFetch</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
