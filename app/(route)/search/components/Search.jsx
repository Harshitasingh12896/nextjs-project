'use client';
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/utils/GlobalApi';
import Link from 'next/link';
import Image from 'next/image';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

const Search = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null); // state for selected category

    useEffect(() => {
        getCategoryList();
        
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
        <div className='h-screen mt-5 flex flex-col'>
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className="overflow-visible">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {categoryList && categoryList.map((item, index) => (
                            <CommandItem key={index}>
                                <Link
                                    href={'/search/'+item.Name}
                                    className={`p-1 text-lg flex gap-2 text-purple-600 cursor-pointer rounded-md
                                    ${selectedCategory === item.Name && 'bg-blue-100'}`}
                                    onClick={() => setSelectedCategory(item.Name)} // set selected category
                                >
                                    <Image
                                        src={item.Icon.url}
                                        alt="icon"
                                        width={35}
                                        height={25}
                                        className="rounded-full"
                                    />
                                    <label>{item.Name}</label>
                                </Link>
                            </CommandItem>
                        ))}
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    );
};

export default Search;
