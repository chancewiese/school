import { useState, useEffect } from "react";

// Fake user data
const fakeUserData = {
  john: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "012-345-6789",
  },
  jane: {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "987-654-3210",
  },
};

export function useFetch(username) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(fakeUserData[username]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [username]);

  return { data, loading };
}
