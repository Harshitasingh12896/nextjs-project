"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/utils/GlobalApi";
import DoctorDetails from "../components/Doctordetails"; // Import the component

const Details = ({ params }) => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (params.recordId) {
      getDoctorById();
    }
  }, [params.recordId]);

  const getDoctorById = async () => {
    try {
      const data = await GlobalApi.getDoctorById(params.recordId);
      console.log("Doctor Data:", data); // Debugging
      setDoctor(data); // ✅ Store doctor object
    } catch (error) {
      console.error("Error fetching doctor:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Doctor Details</h1>
      {doctor ? (
        <DoctorDetails doctor={doctor} /> // ✅ Pass doctor data as a prop
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Details;