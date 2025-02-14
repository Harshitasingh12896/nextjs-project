import React from "react";
import CancelAppointment from "./CancelAppointment";

const BookingList = ({ appointments, onCancel }) => {
  return (
    <div>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div key={appointment.id} className="p-4 border rounded-lg shadow mb-4">
            <h3 className="font-semibold">{appointment.UserName}</h3>
            <p className="text-gray-600">Date: {appointment.Date}</p>
            <p className="text-gray-600">Time: {appointment.Time}</p>
            <p className="text-gray-600">Note: {appointment.Note}</p>

            {/* Doctor Details */}
            {appointment.doctors && appointment.doctors.length > 0 && (
              <div className="mt-4 flex items-center">
                <img
                  src={
                    appointment.doctors[0]?.image?.[0]?.formats?.thumbnail?.url ||
                    "/default-doctor.png"
                  }
                  alt="Doctor"
                  className="w-24 h-24 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold">Dr. {appointment.doctors[0]?.Name}</h4>
                  <p className="text-sm text-gray-500">{appointment.doctors[0]?.Address}</p>
                </div>
              </div>
            )}

            {/* Cancel Appointment Button */}
            <CancelAppointment onContinueClick={() => onCancel(appointment.id)} />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No appointments found.</p>
      )}
    </div>
  );
};

export default BookingList;
