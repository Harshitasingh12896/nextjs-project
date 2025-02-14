"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./components/BookingList";
import GlobalApi from "@/app/utils/GlobalApi";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const MyBooking = () => {
  const { user } = useKindeBrowserClient();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user) {
      getUserBookingList();
    }
  }, [user]);

  const getUserBookingList = () => {
    GlobalApi.getUserBookingList(user?.email).then((resp) => {
      console.log("Appointments Data:", resp.data);
      setAppointments(resp.data?.data || []);
    });
  };

  // ✅ Function to handle appointment cancellation
  const handleCancelAppointment = (appointmentId) => {
    console.log("Canceling Appointment ID:", appointmentId);
    
    // Call the API to delete the appointment (replace with actual API call)
    GlobalApi.cancelAppointment(appointmentId)
      .then(() => {
        // Remove the appointment from state after successful deletion
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appt) => appt.id !== appointmentId)
        );
      })
      .catch((error) => console.error("Error canceling appointment:", error));
  };

  const today = new Date().toISOString().split("T")[0];
  const upcomingAppointments = appointments.filter((appt) => appt.Date >= today);
  const expiredAppointments = appointments.filter((appt) => appt.Date < today);

  return (
    <div className="px-4 sm:px-10 mt-10">
      <h2 className="font-bold text-2xl">My Booking</h2>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingAppointments.length > 0 ? (
            <BookingList appointments={upcomingAppointments} onCancel={handleCancelAppointment} />
          ) : (
            <p className="text-gray-500">No upcoming appointments available.</p>
          )}
        </TabsContent>

        <TabsContent value="expired">
          {expiredAppointments.length > 0 ? (
            <BookingList appointments={expiredAppointments} onCancel={handleCancelAppointment} />
          ) : (
            <p className="text-gray-500">No expired appointments available.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBooking;
