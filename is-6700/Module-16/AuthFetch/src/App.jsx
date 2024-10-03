import React, { useState } from "react";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [user, setUser] = useState(null);
  const { data, loading } = useFetch(user?.username);

  const login = (username) => {
    if (
      username.toLowerCase() === "john" ||
      username.toLowerCase() === "jane"
    ) {
      setUser({ username: username.toLowerCase() });
    } else {
      alert('Invalid username. Please enter "John" or "Jane".');
    }
  };

  const logout = () => {
    setUser(null);
  };

  if (loading && user) return <div>Loading...</div>;

  return (
    <div>
      <h1>AuthFetch Demo</h1>
      <p>Enter "Jane" or "John" to login</p>
      {user ? (
        <>
          <p>Welcome, {data ? data.name : user.username}!</p>
          <button onClick={logout}>Logout</button>
          {data && (
            <>
              <h2>User Data:</h2>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </>
          )}
        </>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(e.target.username.value);
          }}
        >
          <input name="username" placeholder="Enter username" />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default App;
