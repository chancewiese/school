import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";

export function Profile() {
  const { user, logout } = useAuth();
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users/1"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {user.username}!</p>
      <h2>User Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
