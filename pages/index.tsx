import FeedCard from "../components/FeedCard/index"
import { useCallback, useState } from "react"
import { useCurrentUser } from "@/hooks/queries/user"
import { useAllTweets } from "@/hooks/queries/tweet"
import Image from "next/image"
import { FaPollH } from "react-icons/fa"
import { PiGifFill } from "react-icons/pi"
import { IoCalendarNumber, IoSettingsOutline } from "react-icons/io5"
import { BsFillEmojiSunglassesFill, BsImageFill } from "react-icons/bs"
import { HiLocationMarker } from "react-icons/hi"
import { Tweet } from "@/gql/graphql"
import { useCreateTweet } from "@/hooks/mutations/tweet"
import TwitterLayout from "../components/Layout/twitterLayout"
import { GetServerSideProps } from "next"
import { graphqlClient } from "@/clients/api"
import { q_getAllTweets } from "@/graphql/queries/tweet"

interface HomeProps {
   tweets?: Tweet[]
}


export default function Home(props: HomeProps) {
   const user = useCurrentUser()
   // const {tweets = []} = useAllTweets()                   // This is CSR: Client Side Rendering
   const {mutate} = useCreateTweet()
                              
                              
                              
   const [content, setContent] = useState("")
                              
                              
                              
   const handleCreateTweet = useCallback(() => {
      mutate({
         content
      })
   }, [content, mutate])
                              
                              
                              
   const handleSelectImage = useCallback(() => {
      const input = document.createElement("input")
      input.setAttribute("type", "file")
      input.setAttribute("accept", "image/*")
      input.click()
   }, [])
                              
                              
                              
                              
	return (
      <div>
         <TwitterLayout>
                              
            {/* HOMEPAGE */}
            <div className="col-span-7 border-l-[0.5px] border-r-[0.5px] border-[#2E3236] ">
               <div key="🛑🛑🛑🛑🛑HEADER" className="flex justify-between text-xl font-bold pl-5 pr-5 h-[54px] items-center backdrop-blur-md bg-black/60 border-b-[0.5px] border-[#2E3236] sticky top-0">
                  <h1 className="pt-[0px]">Home</h1>
                  <IoSettingsOutline className="cursor-pointer"/>
               </div>
                              
               <div key="🛑🛑🛑🛑🛑POST_TWEET_COMPONENT" className="grid grid-cols-8 border-b-[0.5px] border-[#2E3236] pb-2 transition-all cursor-pointer">
                  <div className="col-span-1 pt-3 pl-4">
                     {user?.profileImage && (
                        <Image className="rounded-full cursor-pointer" src={user?.profileImage} alt="user-image" height={42} width={42}/>
                     )}
                     {user==null && (
                        <Image className="rounded-full cursor-pointer" src="https://shorturl.at/ipuxA" alt="user-image" height={42} width={42}/>
                     )}
                  </div>
                  
                  <div className="col-span-7 pt-[10px] pr-8">
                     <div className="border-b-[0.5px] border-[#2E3236] pt-2 pb-5">
                        <textarea value={content} onChange={e => setContent(e.target.value)} 
                                 className="text-[22px] bg-transparent w-full" placeholder="What's happening?!" rows={1}></textarea>
                     </div>
                     <div className="flex justify-between pt-1 pb-1">
                        <div key="🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂" className="flex justify-start text-xl mt-2">
                           <div className="hover:bg-[#1c9cf120] rounded-full transition-all" onClick={handleSelectImage}>
                              <BsImageFill className="text-[#1c9cf1] text-lg p-2 pt-[10px] w-fit h-fit"/></div>
                           <div className="hover:bg-[#1c9cf120] rounded-full transition-all">
                              <PiGifFill className="text-[#1c9cf1] p-2 w-fit h-fit"/></div>
                           <div className="hover:bg-[#1c9cf120] rounded-full transition-all">
                              <FaPollH className="text-[#1c9cf1] text-lg p-2 pt-[10px] w-fit h-fit"/></div>
                           <div className="hover:bg-[#1c9cf120] rounded-full transition-all">
                              <BsFillEmojiSunglassesFill className="text-[#1c9cf1] text-lg p-2 pt-[10px] w-fit h-fit"/></div>
                           <div className="hover:bg-[#1c9cf120] rounded-full transition-all">
                              <IoCalendarNumber className="text-[#1c9cf1] p-2 w-fit h-fit"/></div>
                           <div className="hover:bg-[#1c9cf120] rounded-full transition-all">
                              <HiLocationMarker className="text-[#1c9cf1] p-2 w-fit h-fit"/></div>
                        </div>
                        
                        <div className="pt-2">
                           <button onClick={handleCreateTweet} className="text-[15px] font-semibold bg-[#1C9CF1] rounded-full items-center h-9 w-[75px] cursor-pointer hover:bg-opacity-90 transition-all">
                              Post
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
                              
               {props.tweets?.map((tweet) => tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet}/> : null )}
            </div>
                              
         </TwitterLayout>
      </div>
   )
}





export const getServerSideProps: GetServerSideProps = async (context) => {   //❇️❇️❇️❇️❇️FOR SSR: Server Side Rendering
   const allTweets = await graphqlClient.request(q_getAllTweets)
   return {
      props: {
         tweets: allTweets.getAllTweets as Tweet[]
      },
   }
}
