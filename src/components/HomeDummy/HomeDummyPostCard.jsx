import React from 'react';
import { Link } from 'react-router-dom';
import UserProfilePhoto from '../ui/UserProfilePhoto';
import parse from "html-react-parser";
import calculateReadingTime from '../../utils/readingTime';
import { IoReaderOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";

function HomeDummyPostcard({
}) {

    return (

            
            <div className='flex flex-col border border-gray-900 rounded-lg p-4 lg:h-[260px]'>
            <div className="grid md:grid-cols-3 ">
              
            </div>
            </div>
    );
}

export default HomeDummyPostcard;