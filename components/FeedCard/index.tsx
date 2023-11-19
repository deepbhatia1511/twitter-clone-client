import { FaRegComment, FaRegHeart } from "react-icons/fa6"
import { IoIosStats } from "react-icons/io"
import { BiBookmark } from "react-icons/bi"
import { FiUpload } from "react-icons/fi"
import { FiRefreshCcw, FiMoreHorizontal } from "react-icons/fi"
import Image from "next/image"

const FeedCard = () => {
   return(
      <div className="grid grid-cols-8 border-b-[0.5px] border-[#2E3236] pb-2 hover:bg-[#0D0E10] transition-all cursor-pointer">
         <div className="col-span-1 pt-3 pl-4">
            <Image className="rounded-full cursor-pointer" src="https://shorturl.at/ruwz0" alt="user-image" height={42} width={42}/>
         </div>
         
         <div className="col-span-7 pt-[10px] pr-2">
            <div className="flex justify-between">
               <div className="flex justify-start text-[16px]">
                  <h5 className="font-semibold tracking-[0.020em] hover:underline decoration-solid">Deep Bhatia</h5>
                  <h5 className="font-bold">✅</h5>
                  <h5 className="font-medium text-[#71767b] pl-1">@deepbhatia_1511 · 2h</h5>
               </div>
               <FiMoreHorizontal className="hover:bg-[#1c9cf120] hover:text-[#1c9cf1] rounded-full p-1 mr-2 w-fit h-fit transition-all"/>
            </div>
            <p className="text-[16px] leading-5">Every single person at the company rebelled because it's so unnatural. At every other company, people want to do multiple things--especially as you get more senior... you feel like</p>
            <div className="flex justify-between text-lg mt-1">
               <FaRegComment className="hover:bg-[#1c9cf120] hover:text-[#1c9cf1] rounded-full p-2 w-fit h-fit transition-all"/>
               <FiRefreshCcw className="hover:bg-[#1ea87c20] hover:text-[#1ea87c] rounded-full p-2 w-fit h-fit transition-all"/>
               <FaRegHeart className="hover:bg-[#F9188020] hover:text-[#F91880] rounded-full p-2 w-fit h-fit transition-all"/>
               <IoIosStats className="hover:bg-[#1c9cf120] hover:text-[#1c9cf1] text-[21px] rounded-full p-2 w-fit h-fit transition-all"/>
               <div className="flex">
                  <BiBookmark className="hover:bg-[#1c9cf120] hover:text-[#1c9cf1] rounded-full p-2 w-fit h-fit transition-all"/>
                  <FiUpload className="hover:bg-[#1c9cf120] hover:text-[#1c9cf1] rounded-full p-2 w-fit h-fit transition-all"/>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FeedCard
