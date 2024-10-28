export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  if (!response.ok) {
    // 200, 300 bad or 400, 500 good
    const error = new Error("Failed to fetch places");
    throw error;
  }

  return resData.places;
}
