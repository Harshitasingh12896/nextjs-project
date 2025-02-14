"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";
import { cn } from "@/lib/utils"; // Utility for dynamic class management
import { Button } from "@/components/ui/button"; // Button for Submit/Close
import { Textarea } from "@/components/ui/textarea"; // Textarea for notes
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"; // Correct import
import GlobalApi from "@/app/utils/GlobalApi"; // Ensure this is correctly imported
import { toast } from "sonner"; // Toast for success messages

const availableSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "03:30 PM", "04:00 PM",
  "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM"
];

const BookAppointment = ({ doctor }) => {
  const [date, setDate] = useState(null); // Selected Date
  const [time, setTime] = useState(null); // Selected Time Slot
  const [notes, setNotes] = useState(""); // Notes for the appointment
  const [open, setOpen] = useState(false); // Manage dialog state
  const { user } = useKindeBrowserClient(); // Correct hook usage

  const saveBooking = async () => {
    if (!date || !time) {
      toast.error("Please select both a date and time before submitting.");
      return;
    }
  
    // Ensure user info is properly extracted
    const userName = user?.given_name || user?.family_name || "Unknown";
    const email = user?.email || "unknown@example.com";
  
    const data = {
      data: {
        UserName: userName, 
        Email: user.email,
        Date: date.toISOString().split("T")[0],  // Ensure correct date format
        Time: time,
        Note: notes,
      }
    };
  
    console.log("Sending Booking Data:", data); // Debugging
  
    try {
      const response = await GlobalApi.BookAppointment(data);
      console.log("Booking Response:", response);
      toast.success("Booking confirmation will be sent to your email");
      setOpen(false); // Close the dialog after successful booking
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
    }
  };
  

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="mt-4 text-black px-4 py-2 rounded-full bg-purple-400 hover:bg-purple-800 transition">
            Book Appointment
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                
                {/* 🗓 Calendar for Date Selection */}
                <div className="flex flex-col items-baseline">
                  <h2 className="flex gap-3 items-center font-medium">
                    <CalendarDays className="text-purple-600 h-5 w-5" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border hover:bg-purple-100 transition"
                  />
                  {date && (
                    <p className="mt-2 text-sm px-3 py-2 rounded-md bg-purple-200 text-purple-800 font-semibold">
                      Selected Date: {date.toDateString()}
                    </p>
                  )}
                </div>

                {/* ⏰ Time Slot Selection */}
                <div>
                  <h2 className="flex gap-3 items-center font-medium">
                    <Clock className="text-purple-600 h-5 w-5" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        className={cn(
                          "border px-3 py-2 rounded-lg transition cursor-pointer",
                          time === slot
                            ? "bg-purple-500 text-white font-semibold"
                            : "bg-gray-100 hover:bg-purple-300 hover:text-white"
                        )}
                        onClick={() => setTime(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {time && (
                    <p className="mt-2 text-sm px-3 py-2 rounded-md bg-purple-200 text-purple-800 font-semibold">
                      Selected Time: {time}
                    </p>
                  )}
                </div>
              </div>

              {/* 📝 Notes Textarea */}
              <div className="mt-4">
                <h2 className="font-medium">Additional Notes</h2>
                <Textarea
                  placeholder="Enter any special instructions or concerns..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2 border rounded-md p-2 w-full"
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          
          {/* 🚀 Footer with Submit and Close Buttons */}
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button className="bg-purple-500 hover:bg-purple-700 text-white" onClick={saveBooking}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookAppointment;
