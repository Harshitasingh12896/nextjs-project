import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const Hero = () => {
  return (
    <section>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
      <div>
        <div className="max-w-lg md:max-w-none mt-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl mt-5">
            Find and Book <span className='text-purple-600'>Appointment</span> with your Fav <span className='text-purple-500'>Doctors</span>
          </h2>

          <p className="mt-2 text-gray-700 font-Ovo">
          The Doctor Appointment Booking Web App is a modern and user-friendly platform designed to simplify the process of scheduling medical appointments. Patients can easily browse through a list of doctors, filter by specialization, location, and availability, and book appointments at their convenience.
          </p>
          <Button className='rounded-full mt-10 font-Ovo bg-purple-500 '><Link href="/">Explore Now</Link></Button>
        </div>
      </div>

      <div>
        <Image
          src="/assets/doctors.jpg"
          className="rounded-3xl mt-10"
          alt="doctor image"
          width={800} height={900}
        />
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero;