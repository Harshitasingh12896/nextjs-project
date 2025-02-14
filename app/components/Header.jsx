"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  

const Header = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();

  useEffect(() => {
    if (user) {
      console.log("User Data:", user);
    }
  }, [user]);

  const Menu = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Explore", path: "/explore" },
    { id: 3, name: "Contact Us", path: "/contact-us" }, // Fixed URL typo
  ];

  return (
    <div className="flex items-center justify-between p-4 shadow-sm md:px-20">
      {/* Logo */}
      <div className="flex items-center gap-20">
        <Image src="/assets/logo.jpg" alt="logo" width={180} height={80} />
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item) => (
            <Link href={item.path} key={item.id}>
              <li className="hover:text-purple-800 cursor-pointer hover:scale-105 transition-all ease-in-out">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Authentication Buttons */}
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
            
      <Popover>
            <PopoverTrigger>
            <Image src={user?.picture} alt="profile-image" width={50} height={50} className="rounded-full"/>
</PopoverTrigger>
  <PopoverContent className="w-44">
    <ul className="flex flex-col gap-2">
        {/* <li className="cursor-pointer hover:bg-slate-100">Profile</li> */}

        <Link href={'/my-booking'} className="cursor-pointer hover:bg-slate-100">My Booking</Link>
        <li className="cursor-pointer hover:bg-slate-100"><LogoutLink>Logout</LogoutLink></li>
    </ul>

  </PopoverContent>
</Popover>

          <p className="text-black-700 font-semibold">{user?.given_name || "User"}</p>
        </div>
      ) : (
        <LoginLink>
          <Button className="bg-purple-500">Get Started</Button>
        </LoginLink>
      )}
    </div>
  );
};

export default Header;
