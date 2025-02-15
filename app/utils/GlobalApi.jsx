// axiosClient setup
const axios = require('axios');

// Get the API Key from environment variables
const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

// Create an axios instance
const axiosClient = axios.create({
  baseURL: 'https://backend-strapi-co9k.onrender.com/api',
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
  },
});

// Get Categories function (with icons populated)
const getCategory = async () => {
  try {
    const response = await axiosClient.get('/cs?populate=Icon');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get the full doctor list
const getDoctorList = async () => {
  try {
    const response = await axiosClient.get('doctors?populate=*');
    console.log("Fetched Doctors Data:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor list:', error);
    throw error;
  }
};


// Get doctors by category
const getDoctorsByCategory = (category) => {
  // Using `encodeURIComponent` to safely encode the category
  return axiosClient.get(`/doctors?filters[category][Name][$eq]=${encodeURIComponent(category)}&populate=*`);
};
const getDoctorById = async (id) => {
  try {
    const response = await axiosClient.get(`/doctors/${id}?populate=*`);
    console.log("API Response:", response.data); // ✅ Ensure correct structure
    return response.data.data; // ✅ Return correct object
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    throw error;
  }
};
const BookAppointment = async (data) => {
  try {
    console.log("Booking Data Sent to API:", data); // ✅ Log request
    const response = await axiosClient.get("/appointments", { data });
    console.log("Appointment Booked Successfully:", response.data); // ✅ Log response
    return response.data;
  } catch (error) {
    console.error("Strapi API Error:", error.response?.data || error); // ✅ Log detailed error
    throw error;
  }
};
const sendEmail=(data)=>axios.post('/api/sendEmail',data);


const getUserBookingList = (userEmail) => {
  return axiosClient.get(
    `/appointments?filters[Email][$eq]=${encodeURIComponent(userEmail)}&populate[doctors][populate]=image`
  );
};



// Export the functions or axiosClient for use elsewhere
module.exports = {
  getCategory,
  getDoctorList,
  getDoctorsByCategory,
   getDoctorById,
   BookAppointment,
   sendEmail,
   getUserBookingList,
};
