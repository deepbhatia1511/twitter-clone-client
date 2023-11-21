import React from 'react'
import Image from "next/image"
import { FaXTwitter } from "react-icons/fa6"
import leftBarButtons from "../LeftBarButtons/index"

const LeftBar = () => {
   return (
      <div>
         <div className="text-3xl hover:bg-[#181919] rounded-full p-3 w-fit h-fit cursor-pointer transition-all">
            <FaXTwitter/>
         </div>
         <div className="pb-2">
            <ul>
               {leftBarButtons.map(item => <li className="flex justify-start items-center gap-4 hover:bg-[#181919] rounded-full p-[9.2px] w-fit h-fit cursor-pointer transition-all" key={item.title}>
                  <span className="text-3xl pl-1">{item.icon}</span>
                  <span className="text-[20px] pr-4">{item.title}</span>
               </li>)}
            </ul>
         </div>
         <div className="pr-16 pb-2">
            <button className="text-lg font-semibold bg-[#1C9BF1] rounded-full items-center p-2 pt-2 h-100 w-full cursor-pointer hover:bg-[#1C8bf9]">
               Post
            </button>
         </div>
                           
         
      </div>
   )
}

export default LeftBar
