import axios from "axios";

// Log the API key (optional for debugging purposes)
console.log("API Key:", process.env.NEXT_PUBLIC_STRAPI_API_KEY);

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // ✅ Use env variable
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY || ""}`,
  },
  withCredentials: true, // Ensure credentials are sent
});
// ✅ Get Categories (with icons populated)
const getCategory = async () => {
  try {
    const response = await axiosClient.get("/cs?populate=Icon");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// ✅ Get Doctor List
const getDoctorList = async () => {
  try {
    const response = await axiosClient.get("/doctors?populate=*");
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor list:", error);
    throw error;
  }
};


// ✅ Get Doctors by Category
const getDoctorsByCategory = async (category) => {
  try {
    const response = await axiosClient.get(
      `/doctors?filters[category][Name][$eq]=${encodeURIComponent(category)}&populate=*`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors by category:", error);
    throw error;
  }
};

// ✅ Get Doctor by ID
const getDoctorById = async (id) => {
  try {
    const response = await axiosClient.get(`/doctors/${id}?populate=*`);
    console.log("API Response:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    throw error;
  }
};

// ✅ Book Appointment (Fixed: changed `GET` to `POST`)
const BookAppointment = async (data) => {
  try {
    console.log("Booking Data Sent to API:", data);
    const response = await axiosClient.get("/appointments", { data }); // Changed from `GET` to `POST`
    console.log("Appointment Booked Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Strapi API Error:", error.response?.data || error);
    throw error;
  }
};

// ✅ Get User Booking List by Email
const getUserBookingList = async (userEmail) => {
  try {
    const response = await axiosClient.get(
      `/appointments?filters[Email][$eq]=${encodeURIComponent(userEmail)}&populate[doctors][populate]=image`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw error;
  }
};

// ✅ Corrected Export
const GlobalApi = {
  getCategory,
  getDoctorList,
  getDoctorsByCategory,
  getDoctorById,
  BookAppointment,
  getUserBookingList,
};

export default GlobalApi; // ✅ Correct default export
