"use client"; // Required for hooks in Next.js 13+
import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/utils/GlobalApi";
import Doctor from "@/app/components/Doctor";

const CategoryPage = ({ params }) => {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    if (!params?.cname) return; // Prevent API call if cname is missing
    console.log("Selected Category:", params.cname);
    getDoctors();
  }, [params.cname]); // Runs again if category changes

  const getDoctors = async () => {
    try {
      const resp = await GlobalApi.getDoctorsByCategory(params.cname);
      console.log("Fetched Doctors:", resp);
      if (resp?.data?.data) {
        setDoctorList(resp.data.data);
      } else {
        console.error("Unexpected API response format:", resp);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  return (
    <div>
      <Doctor heading={params.cname} doctorList={doctorList} />
    </div>
  );
};

export default CategoryPage;