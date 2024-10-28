// export async function fetchAvailablePlaces() {
//    const response = await fetch("http://localhost:3000/places");

//    if (!response.ok) {
//       // 200, 300 bad or 400, 500 good
//       throw new Error("Failed to fetch places");
//    }

//    const resData = await response.json();
//    return resData.places;
// }

// export async function fetchUserPlaces() {
//    const response = await fetch("http://localhost:3000/user-places");

//    if (!response.ok) {
//       //200, 300 bad or 400, 500 good
//       throw new Error("Failed to fetch places");
//    }

//    const resData = await response.json();
//    return resData.places;
// }

// export async function updateUserPlaces(places) {
//    const response = await fetch("http://localhost:3000/user-places", {
//       method: "PUT",
//       body: JSON.stringify({ places }),
//       headers: {
//          "Content-Type": "application/json",
//       },
//    });

//    if (!response.ok) {
//       throw new Error("Failed to update user data.");
//    }

//    const resData = await response.json();
//    return resData.message;
// }

// Axios
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function fetchAvailablePlaces() {
   try {
      const response = await axios.get(`${BASE_URL}/places`);
      return response.data.places;
   } catch (error) {
      throw new Error("Failed to fetch places");
   }
}

export async function fetchUserPlaces() {
   try {
      const response = await axios.get(`${BASE_URL}/user-places`);
      return response.data.places;
   } catch (error) {
      throw new Error("Failed to fetch user places");
   }
}

export async function updateUserPlaces(places) {
   try {
      const response = await axios.put(`${BASE_URL}/user-places`, {
         places,
      });
      return response.data.message;
   } catch (error) {
      throw new Error("Failed to update user data.");
   }
}
