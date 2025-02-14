'use client';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import GlobalApi from '../utils/GlobalApi';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Search = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const params=usePathname();
    useEffect(() => {
        getCategoryList();
        console.log(params)
    }, []);
    
    const getCategoryList = () => {
        GlobalApi.getCategory().then(resp => {
            console.log(resp);
            setCategoryList(resp.data);
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching categories:", error);
            setLoading(false);
        });
    };
  
    return (
        <div className='flex flex-col items-center mt-20'>
            <h2 className='font-bold text-4xl tracking-wide'>Search <span className='text-purple-600'>Doctors</span></h2>
            <h2 className='font-Ovo text-gray-400 text-xl gap-2'>Search Your Doctor and Book Appointment in just one click</h2>
             
            <div className="flex w-full max-w-sm items-center mt-4 space-x-2">
                <Input type="text" placeholder="Search..." className='border-black text-lg' />
                <Button type="submit" className='bg-purple-500'>
                    <SearchIcon className='h-4 w-4 mr-2 ' />
                    Search
                </Button>
            </div>

            {/* Display List Of Categories */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-6">
                {loading ? (
                    // Skeleton loaders while fetching data
                    [...Array(6)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center p-5 bg-gray-200 m-2 rounded-lg animate-pulse gap-2">
                            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                            <div className="w-24 h-4 bg-gray-300 rounded mt-2"></div>
                        </div>
                    ))
                ) : (
                    categoryList.map((item, index) => (
                        <Link href={'/search/'+item.Name} key={index} className="flex flex-col items-center p-5 bg-purple-200 m-2 rounded-lg gap-2">
                            {item.Icon && item.Icon.url ? (
                                <Image
                                    src={item.Icon.url}
                                    alt={item.Name}
                                    width={64}
                                    height={64}
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-gray-500">No Icon</span>
                                </div>
                            )}
                            <p className="mt-2 text-lg">{item.Name}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Search;
