import React from "react";
import Image from "next/image";
import BookAppointment from "./BookAppointment";

const DoctorDetails = ({ doctor }) => {
    const socialMediaList = [
        {
            id: 1,
            icon: "/assets/icons8-facebook-48.png",
        },
        {
            id: 2,
            icon: "/assets/icons8-instagram-48.png",
        },
        {
            id: 3,
            icon: "/assets/icons8-twitter-circled-48.png",
        },
    ];

    return (
        <div className="grid grid-cols-1 -pb-10 md:grid-cols-3 gap-4">
            {/* Doctor Image */}
            <div>
                {doctor.image && doctor.image.length > 0 ? (
                    <Image
                        src={doctor.image[0]?.url}
                        alt={doctor.Name}
                        width={300}
                        height={200}
                        className="mx-auto rounded-full mt-10"
                    />
                ) : (
                    <div className="w-36 h-36 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                        No Image
                    </div>
                )}
            </div>

            {/* Doctor Information */}
            <div className="col-span-2">
                <h2 className="text-2xl font-semibold">{doctor.Name}</h2>

                {/* Show Doctor Category */}
                {doctor.category?.Name ? (
                    <p className="text-purple-800 text-lg font-semibold rounded-lg">
                        {doctor.category.Name}
                    </p>
                ) : (
                    <p className="text-gray-500">No Category</p>
                )}

                <p>
                    <strong>Address:</strong> {doctor.Address}
                </p>
                <p>
                    <strong>Patients:</strong> {doctor.Patients}
                </p>
                <p>
                    <strong>Experience:</strong> {doctor.Year_of_Experience} years
                </p>
                <p>
                    <strong>Phone:</strong> {doctor.Phone}
                </p>
                <p>
                    <strong>About:</strong> {doctor.About}
                </p>

                {/* New: Show Start Time & End Time */}
                <p>
                    <strong>Start Time:</strong> {doctor.StartTime ? doctor.StartTime : "N/A"}
                </p>
                <p>
                    <strong>End Time:</strong> {doctor.EndTime ? doctor.EndTime : "N/A"}
                </p>

                <div className="flex gap-3 mt-3">
                    {socialMediaList.map((item, index) => (
                        <Image
                            src={item.icon}
                            key={index}
                            alt="icon"
                            width={35}
                            height={35}
                            className="rounded-full hover:bg-purple-500"
                        />
                    ))}
                </div>

                {/* Book Appointment Component */}
                <BookAppointment doctor={doctor} />
            </div>
        </div>
    );
};

export default DoctorDetails;
