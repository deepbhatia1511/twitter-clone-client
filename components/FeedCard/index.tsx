import { FaRegComment, FaRegHeart } from "react-icons/fa6"
import { IoIosStats } from "react-icons/io"
import { BiBookmark } from "react-icons/bi"
import { FiUpload } from "react-icons/fi"
import { FiRefreshCcw, FiMoreHorizontal } from "react-icons/fi"
import Image from "next/image"
import { Tweet } from "@/gql/graphql"
import Link from "next/link"


interface FeedCardProps {
   data: Tweet
}


const FeedCard: React.FC<FeedCardProps> = (props) => {
   const {data} = props
   const first_name = data.author?.firstName.toLowerCase()
   const last_name = data.author?.lastName?.toLowerCase()
   const twitterName = `@${first_name}${last_name}_xoxo`
   
   return(
      <div className="grid grid-cols-8 border-b-[0.5px] border-[#2E3236] pb-2 hover:bg-[#0D0E10] transition-all cursor-pointer">
         <div className="col-span-1 pt-3 pl-4">
            {data.author?.profileImage && <Image className="rounded-full cursor-pointer" src={data.author?.profileImage} alt="user-image" height={42} width={42}/>}
         </div>
         
         <div className="col-span-7 pt-[10px] pr-2">
            <div className="flex justify-between">
               <div className="flex justify-start text-[16px]">
                  <Link href={`/${data.author?.id}`} className="font-semibold tracking-[0.020em] hover:underline decoration-solid">{data.author?.firstName} {data.author?.lastName}</Link>
                  {twitterName == "@deepbhatia_xoxo" && <h5 className="font-bold">✅</h5>}
                  <h5 className="font-medium text-[#71767b] pl-1"> {twitterName} · 3h</h5>
               </div>
               <FiMoreHorizontal className="hover:bg-[#1c9cf120] hover:text-[#1c9cf1] rounded-full p-1 mr-2 w-fit h-fit transition-all"/>
            </div>
                              
            <p className="text-[16px] leading-5">{data.content}</p>
            {data.image && <div className="pt-2 pr-2">
               <div className="rounded-2xl overflow-hidden bg-transparent h-[285px] w-full">
                  <Image style={{objectFit: "cover", width: "100%", height: "100%"}} src={data.image} alt={"tweet-image"} width={600} height={300}/>
               </div>
            </div>}
                              
            <div key="🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂" className="flex justify-between text-lg mt-1">
               <div className="hover:bg-[#1c9cf120] rounded-full transition-all">
                  <FaRegComment className="hover:text-[#1c9cf1] p-2 w-fit h-fit"/></div>
               <div className="hover:bg-[#1ea87c20] rounded-full transition-all">
                  <FiRefreshCcw className=" hover:text-[#1ea87c] p-2 w-fit h-fit"/></div>
               <div className="hover:bg-[#F9188020] rounded-full transition-all">
                  <FaRegHeart className=" hover:text-[#F91880] p-2 w-fit h-fit"/></div>
               <div className="hover:bg-[#1c9cf120] rounded-full transition-all">
                  <IoIosStats className=" hover:text-[#1c9cf1] text-[21px] p-2 w-fit h-fit"/></div>
               <div className="flex">
                     <div className="hover:bg-[#1c9cf120] rounded-full transition-all">
                        <BiBookmark className=" hover:text-[#1c9cf1] p-2 w-fit h-fit"/></div>
                     <div className="hover:bg-[#1c9cf120] rounded-full transition-all">
                        <FiUpload className=" hover:text-[#1c9cf1] p-2 w-fit h-fit"/></div>
               </div>
            </div>
            
         </div>
      </div>
   )
}

export default FeedCard