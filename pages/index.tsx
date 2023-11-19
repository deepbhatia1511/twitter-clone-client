import { FaXTwitter } from "react-icons/fa6"
import { FiMoreHorizontal } from "react-icons/fi"
import leftBarButtons from "../components/LeftBarButtons/index"
import FeedCard from "../components/FeedCard/index"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { useCallback } from "react"
import Image from "next/image"
import { toast } from "react-hot-toast"
import { graphqlClient } from "@/clients/api"
import { query1 } from "../graphql/queries/user"
// import { useCurrentUser } from "@/hooks/user"

export default function Home() {
   // const { user } = useCurrentUser()
   // console.log(user)
   
   const handleSignUpWithGoogle = useCallback(async (output: CredentialResponse) => {
      const googleToken = output.credential
      if(!googleToken) return toast.error("Google token not found")
      const { verifyGoogleToken } = await graphqlClient.request(query1, {token: googleToken})
      toast.success("Verification Successful!")
      console.log(verifyGoogleToken)   
      const jsonString = JSON.stringify(verifyGoogleToken);             //⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕Not Added By Piyush
      if(jsonString) window.localStorage.setItem("_twitter_token", jsonString)
   }, [])
                              
                              
                              
                              
	return (
      <div className="grid grid-cols-16 h-screen w-screen pl-40">
                              
                              
                              
         {/* LEFTBAR */}
         <div className="col-span-3">
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
                              
            <div className="pt-[82px] pr-3 h-[148px]">
               <button className="grid grid-cols-8 hover:bg-[#181919] rounded-full p-[9.2px] w-full h-full cursor-pointer transition-all">
                  <div className="col-span-2 pt-1 pl-2">
                     <Image className="rounded-full cursor-pointer" src="https://shorturl.at/ruwz0" alt="user-image" height={43} width={43}/>
                  </div>
                              
                  <div className="col-span-4 items-start pt-1 leading-[20px]">
                     <h5 className="font-bold tracking-[0.020em] text-[16px] pr-5">Deep Bhatia</h5>
                     <h5 className="font-medium text-[16px] text-[#71767b]">@deepbhatia_1511</h5>
                  </div>
                           
                  <div className="col-span-2">
                     <FiMoreHorizontal className="text-[18px] rounded-full p-2 mt-1 ml-8 w-fit h-fit transition-all"/>
                  </div>
               </button>
            </div>
         </div>
                              
                              
                              
                              
                              
         {/* FEED PAGE */}
         <div className="col-span-7 border-l-[0.5px] border-r-[0.5px] border-[#2E3236] h-screen overflow-scroll">
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
         </div>
                              
                              
                              
                              
                              
         {/* RIGHTBAR */}
         <div className="col-span-4 pt-3 pl-7 ">
            <div className="border-[0.5px] border-[#2E3236] h-[285px] w-[350px] rounded-2xl pl-3 pt-2">
               <div className="text-[22px] font-extrabold">
                  New to twitter?
               </div>
               <div className="text-[14px] text-[#71767b] tracking-tight">
                  Sign up now to get your own personalised timeline!
               </div>
               <div className="pr-8 pt-3 w-full">
                  <button className="text-[16px] text-black font-semibold tracking-tight bg-[#FFFFFF] rounded-full items-center p-2 h-[38px] w-full cursor-pointer">
                     Sign up with Google
                  </button>
               </div>
               <div className="pr-8 pt-3 w-full">
                  <button className="text-[16px] text-black font-semibold tracking-tight bg-[#FFFFFF] rounded-full items-center p-2 h-[38px] w-full cursor-pointer">
                     Sign up with Apple
                  </button>
               </div>
               <div className="pr-8 pt-3 w-full">
                  <button className="text-[16px] text-black font-semibold tracking-tight bg-[#FFFFFF] rounded-full items-center p-2 h-[38px] w-full cursor-pointer">
                     Create Account
                  </button>
               </div>
               <div className="text-[14px] text-[#71767b] tracking-tight pt-4 leading-4">
                  By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
               </div>
               {/* <div className="pt-2">
                  <GoogleLogin onSuccess={handleSignUpWithGoogle}/>
               </div> */}
            </div>
            
            
            <div className="pt-4">
               <div className="bg-[#16181C] h-[285px] w-[350px] rounded-2xl pl-3 pt-2">
                  <div className="text-[22px] font-extrabold">
                     You might like..
                  </div>
                  <div className="pt-2">
                     <GoogleLogin onSuccess={handleSignUpWithGoogle}/>
                  </div>
               </div>
            </div>
         </div>
                              
                              
                              
      </div>
   )
}










