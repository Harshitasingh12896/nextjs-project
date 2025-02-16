import Image from "next/image";
import Link from "next/link";
// Doctor component that receives doctorList as a prop
export default function Doctor({ heading = "Popular Doctors", doctorList = [] }) {
  return (
    <div className="mt-20 px-8">
      <h1 className="text-4xl font-bold mb-10 text-center">
        {heading} <span className="text-purple-500">Doctors</span>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctorList.length > 0 ? (
          doctorList.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white p-4 rounded-lg shadow-lg text-center border border-gray-200"
            >
              {/* Doctor Image */}
              {doctor.image && doctor.image.length > 0 ? (
                <Image
                  src={doctor.image[0]?.url}
                  alt={doctor.Name}
                  width={100}
                  height={75}
                  className="mx-auto rounded-full"
                />
              ) : (
                <div className="w-36 h-36 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                  No Image
                </div>
              )}

              {/* Doctor Details */}
              <h2 className="text-xl font-semibold mt-3">{doctor.Name}</h2>

              {/* Show Doctor Category */}
              {doctor.category?.Name ? (
                <p className="text-purple-600 font-bold">{doctor.category.Name}</p>
              ) : (
                <p className="text-gray-500">No Category</p>
              )}

              <p className="text-gray-600 font-semibold">
                {doctor.Year_of_Experience} Years of Experience
              </p>
              <p className="text-purple-600 font-semibold">
                {doctor.Patients} Patients Treated
              </p>

              {/* Booking Button */}
              <Link href={`/details/${doctor?.id}`} className="w-full">
              
              <button className="mt-4  text-black px-4 py-2 rounded-full  bg-purple-400 hover:bg-purple-800">
                Book Appointment
              </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading doctors...</p>
        )}
      </div>
    </div>
  );
}