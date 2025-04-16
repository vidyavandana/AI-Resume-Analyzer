const API_BASE_URL = "http://localhost:5000/api/auth"; // Updated the URL to match the structure

// Function to register a user
export const register = async (name, email, password, role) => {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });

  const data = await res.json();
  return data;
};

// Function to login a user
export const login = async (email, password) => {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};
