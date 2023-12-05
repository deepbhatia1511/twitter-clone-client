import React from 'react'
import Image from "next/image"
import { FaXTwitter } from "react-icons/fa6"
import Link from 'next/link'

import { GoHome } from "react-icons/go"
import { BiSearch, BiUser } from "react-icons/bi"
import { TbMessage } from "react-icons/tb"
import { FiBookmark  } from "react-icons/fi";
import { PiDotsThreeCircle } from "react-icons/pi"
import { IoPeopleOutline } from "react-icons/io5"
import { LuBell } from "react-icons/lu" 
import { RiFileListLine } from "react-icons/ri" 
import { useMemo } from "react";
import { useCurrentUser } from "@/hooks/queries/user";




interface LeftBarBasicButton {
   icon: React.ReactNode,
   title: string,
   link: string
}




const LeftBar = () => {
   const user = useCurrentUser()
   
   
   const leftBarButtons: LeftBarBasicButton[] = useMemo(() => [
      {
         icon: <GoHome/>,
         title: "Home",
         link: "/"
      }, {
         icon: <BiSearch/>,
         title: "Explore",
         link: "/"
      }, {
         icon: <LuBell/>,
         title: "Notifications",
         link: "/"
      }, {
         icon: <TbMessage/>,
         title: "Messages",
         link: "/"
      }, {
         icon: <RiFileListLine/>,
         title: "Lists",
         link: "/"
      }, {
         icon: <FiBookmark/>,
         title: "Bookmarks",
         link: "/"
      }, {
         icon: <IoPeopleOutline/>,
         title: "Communities",
         link: "/"
      }, {
         icon: <FaXTwitter/>,
         title: "Premium",
         link: "/"
      }, {
         icon: <BiUser/>,
         title: "Profile",
         link: `/${user?.id}`
      }, {
         icon: <PiDotsThreeCircle/>,
         title: "More",
         link: "/"
      }
   ], [user?.id])
   
   
   
   return (
      <div className="sticky top-0">
         <div className="text-3xl hover:bg-[#181919] rounded-full p-3 w-fit h-fit cursor-pointer transition-all">
            <FaXTwitter/>
         </div>
         <div className="pb-2">
            <ul>
               {leftBarButtons.map(item => <li key={item.title}>
                  <Link href={item.link} className="flex justify-start items-center gap-4 hover:bg-[#181919] rounded-full p-[9.2px] w-fit h-fit cursor-pointer transition-all">
                     <span className="text-3xl pl-1">{item.icon}</span>
                     <span className="text-[20px] pr-4">{item.title}</span>
                  </Link>
               </li>)}
            </ul>
         </div>
         <div className="pr-10 pb-2">
            <button className="text-lg font-semibold bg-[#1d9bf0] rounded-full items-center p-2 pt-2 h-12 w-full cursor-pointer hover:bg-opacity-90 transition-all">
               Post
            </button>
         </div>
                           
                           
      </div>
   )
}

export default LeftBar























///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// I want when this icon is clicked it changes to some other icon. I want that when they were clicked they change to some other icon.
// But when i click on some other button, previous clicked button should return back to its original form



// To achieve the behavior where clicking an icon changes it to some other icon, and the previously clicked icon returns to its
// original form when a different icon is clicked, you can use local state to keep track of the currently clicked icon.
// Here's an updated version of your LeftBar component using the useState hook for managing the clicked icon:
// import { useState } from 'react';

// // ... (your existing code)

// const LeftBar = () => {
//    const user = useCurrentUser();

//    const [clickedIcon, setClickedIcon] = useState<React.ReactNode | null>(null);

//    const leftBarButtons: LeftBarBasicButton[] = useMemo(() => [
//       // ... (your existing code)
//    ], [user?.id]);

//    const handleIconClick = (icon: React.ReactNode) => {
//       if (clickedIcon === icon) {
//          // If the clicked icon is already selected, reset to null (original form)
//          setClickedIcon(null);
//       } else {
//          // Otherwise, set the clicked icon
//          setClickedIcon(icon);
//       }
//    };

//    return (
//       <div className="sticky top-0">
//          <div
//             className={`text-3xl hover:bg-[#181919] rounded-full p-3 w-fit h-fit cursor-pointer transition-all ${
//                clickedIcon === <FaXTwitter /> ? 'clicked' : ''
//             }`}
//             onClick={() => handleIconClick(<FaXTwitter />)}
//          >
//             {clickedIcon === <FaXTwitter /> ? <SomeOtherIcon /> : <FaXTwitter />}
//          </div>
//          <div className="pb-2">
//             <ul>
//                {leftBarButtons.map((item) => (
//                   <li key={item.title}>
//                      <Link
//                         href={item.link}
//                         className={`flex justify-start items-center gap-4 hover:bg-[#181919] rounded-full p-[9.2px] w-fit h-fit cursor-pointer transition-all ${
//                            clickedIcon === item.icon ? 'clicked' : ''
//                         }`}
//                         onClick={() => handleIconClick(item.icon)}
//                      >
//                         <span className="text-3xl pl-1">{clickedIcon === item.icon ? <SomeOtherIcon /> : item.icon}</span>
//                         <span className="text-[20px] pr-4">{item.title}</span>
//                      </Link>
//                   </li>
//                ))}
//             </ul>
//          </div>
//          <div className="pr-10 pb-2">
//             <button
//                className="text-lg font-semibold bg-[#1C9BF1] rounded-full items-center p-2 pt-2 h-12 w-full cursor-pointer hover:bg-[#1C8bf9]"
//                onClick={() => setClickedIcon(null)} // Reset clicked icon when "Post" is clicked
//             >
//                Post
//             </button>
//          </div>
//       </div>
//    );
// };

// export default LeftBar;
