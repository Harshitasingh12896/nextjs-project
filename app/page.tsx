"use client";
import { useEffect,useState } from "react";
import Hero from './components/Hero';
import Search from './components/Search';
import Doctor from './components/Doctor'
import Footer from './components/Footer';
import GlobalApi from '@/app/utils/GlobalApi';
export default function Home() {

  // Fetch the doctor list on component mount
const [doctorList, setDoctorList] = useState([]);
  useEffect(() => {
      getDoctorList();
    }, []);
  
  // Fetch doctor list from the API
    const getDoctorList = async () => {
      try {
        const resp = await GlobalApi.getDoctorList();
        console.log("API Response:", resp);
        if (resp?.data) {
          setDoctorList(resp.data); // Save fetched data into state
          console.log("Doctors List:", resp.data); // Debugging
        } else {
          console.error("Unexpected API response format:", resp);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
  

  
  return (
    <div> 
      <Hero/>
      <Search/>
      <Doctor doctorList={doctorList}/>
      <Footer/>
    
    </div>
  );
}
