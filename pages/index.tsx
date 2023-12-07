import FeedCard from "../components/FeedCard/index"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useCurrentUser } from "@/hooks/queries/user"
import { useAllTweets } from "@/hooks/queries/tweet"
import Image from "next/image"
import { FaPollH } from "react-icons/fa"
import { PiGifFill } from "react-icons/pi"
import { IoCalendarNumber, IoClose, IoSettingsOutline } from "react-icons/io5"
import { BsFillEmojiSunglassesFill, BsImageFill } from "react-icons/bs"
import { HiLocationMarker } from "react-icons/hi"
import { Tweet } from "@/gql/graphql"
import { useCreateTweet } from "@/hooks/mutations/tweet"
import TwitterLayout from "../components/Layout/twitterLayout"
import { GetServerSideProps } from "next"
import { graphqlClient } from "@/clients/api"
import { q_getAllTweets, q_getSignedUrlForImage } from "@/graphql/queries/tweet"
import axios from "axios"
import toast from "react-hot-toast"



export const getServerSideProps: GetServerSideProps = async (context) => {   //❇️❇️❇️❇️❇️FOR SSR: Server Side Rendering
   const allTweets = await graphqlClient.request(q_getAllTweets)
   return {
      props: {
         tweets: allTweets.getAllTweets as Tweet[]
      },
   }
}



interface HomeProps {
   tweets?: Tweet[]
}


export default function Home(props: HomeProps) {
   const user = useCurrentUser()
   const {tweets = props.tweets as Tweet[]} = useAllTweets()                   // This is CSR: Client Side Rendering
   const {mutateAsync} = useCreateTweet()
                              
                              
                              
   const [content, setContent] = useState("")
   const [image, setImage] = useState("")
                              
                              
                              
                              
                              
   const handleCreateTweet = useCallback(async () => {
      await mutateAsync({
         content, image
      })
      setContent("")
      setImage("")
   }, [content, image, mutateAsync])
                              
   const handleCreateTweetWithoutUser = () => {
      toast.error("You need to have an account to tweet something!")
   }
                              
   const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
      return async (event: Event) => {
         event.preventDefault()
         const file: File | null | undefined = input.files?.item(0)
         if(!file) return
         const {getSignedUrlForImage} = await graphqlClient.request(q_getSignedUrlForImage, {
            imageName: file.name,
            imageType: file.type
         })
         if(getSignedUrlForImage) {
            toast.loading("Uploading...", {id: "2"})
            await axios.put(getSignedUrlForImage, file, {
               headers: {
                  "Content-Type": file.type
               }
            })
            toast.success("Uploaded!", {id: "2"})
            const url = new URL(getSignedUrlForImage)
            const myFilePath = `${url.origin}${url.pathname}`
            setImage(myFilePath)
         }
      }
   }, [])
                              
	const handleSelectImage = useCallback(() => {
      const input = document.createElement("input")
      input.setAttribute("type", "file")
      input.setAttribute("accept", "image/*")
      const handlerFn = handleInputChangeFile(input)
      input.addEventListener("change", handlerFn)
      input.click()
   }, [handleInputChangeFile])
                              
                              
   const handleRemoveImage = () => {
      setImage("")
   }
                              
                              
                              
   const handleContentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target;
      textarea.style.height = 'auto'; // Reset height to auto
      textarea.style.height = `${Math.max(textarea.scrollHeight, 38)}px` // Set height to scrollHeight or a minimum of 38px
      setContent(textarea.value);
   }
                              
                              
                              
                              
	return (
      <div>
         <TwitterLayout>
                              
            {/* HOMEPAGE */}
            <div className="col-span-7 border-l-[0.5px] border-r-[0.5px] border-[#2E3236] ">
               <div key="🛑🛑🛑🛑🛑HEADER" className="flex justify-between text-xl font-bold pl-5 pr-5 h-[54px] items-center backdrop-blur-md bg-black/40 border-b-[0.5px] border-[#2E3236] sticky top-0">
                  <h1 className="text-white pt-[0px]">Home</h1>
                  <IoSettingsOutline className="text-white cursor-pointer"/>
               </div>
                              
               <div key="🛑🛑🛑🛑🛑POST_TWEET_COMPONENT" className="grid grid-cols-8 border-b-[0.5px] border-[#2E3236] pb-2 transition-all cursor-pointer">
                  <div className="col-span-1 pt-3 pl-4">
                     {user?.profileImage && (
                        <Image className="rounded-full cursor-pointer" src={user?.profileImage} alt="user-image" height={42} width={42}/>
                     )} {user==null && (
                        <Image className="rounded-full cursor-pointer" src="https://shorturl.at/ipuxA" alt="user-image" height={42} width={42}/>
                     )}
                  </div>
                  
                  <div className="col-span-7 pt-[10px] pr-8">
                     <div className="border-b-[0.5px] border-[#2E3236] pt-2 pb-5">
                        <textarea value={content} onChange={handleContentInput} style={{ overflow: 'hidden', resize: 'none', minHeight: '38px'}}
                                 className="text-white text-[22px] bg-transparent w-full" placeholder="What's happening?!" rows={1} spellCheck={false}/>
                        {image && 
                           <div className="pt-2 relative">
                                 <div className="rounded-2xl overflow-hidden bg-transparent h-[285px] w-full">
                                    <Image style={{objectFit: "cover", width: "100%", height: "100%"}} src={image} alt={"bg-image"} width={600} height={300}/>
                                 </div>
                                 <button onClick={handleRemoveImage} className="text-white bg-black opacity-60 p-2 rounded-full absolute top-4 right-2">
                                    <IoClose className="text-2xl"/>
                                 </button>
                           </div>
                        }
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
                           {user && content && !image && <button onClick={handleCreateTweet} className="text-white text-[15px] font-semibold bg-[#1d9bf0] rounded-full items-center h-9 w-[75px] cursor-pointer hover:bg-opacity-90 transition-all">
                              Post
                           </button>}
                           {user && image && !content && <button onClick={handleCreateTweet} className="text-white text-[15px] font-semibold bg-[#1d9bf0] rounded-full items-center h-9 w-[75px] cursor-pointer hover:bg-opacity-90 transition-all">
                              Post
                           </button>}
                           {user && content && image && <button onClick={handleCreateTweet} className="text-white text-[15px] font-semibold bg-[#1d9bf0] rounded-full items-center h-9 w-[75px] cursor-pointer hover:bg-opacity-90 transition-all">
                              Post
                           </button>}
                           {!user && <button onClick={handleCreateTweetWithoutUser} className="text-[15px] font-semibold text-gray-400 bg-[#1d9cf09a] rounded-full items-center h-9 w-[75px] cursor-pointer transition-all">
                              Post
                           </button>}
                           {user && !content && !image && <button className="text-[15px] font-semibold text-gray-400 bg-[#1d9cf09a] rounded-full items-center h-9 w-[75px] cursor-pointer transition-all">
                              Post
                           </button>}
                        </div>
                     </div>
                  </div>
               </div>
                              
               {tweets?.map((tweet) => tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet}/> : null )}
            </div>
                              
         </TwitterLayout>
      </div>
   )
}



