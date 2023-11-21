import FeedCard from "../components/FeedCard/index"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { useCallback } from "react"
import { toast } from "react-hot-toast"
import { query1 } from "../graphql/queries/user"
import { request } from "graphql-request"
import { useCurrentUser } from "@/hooks/user"
import { graphqlClient } from "@/clients/api"
import Image from "next/image"
import LeftBar from "@/components/LeftBar"
import { useQueryClient } from "@tanstack/react-query"
import { FiMoreHorizontal } from "react-icons/fi"

export default function Home() {
   const user = useCurrentUser()
   const queryClient = useQueryClient()
                              
   const handleSignUpWithGoogle = useCallback(async (output: CredentialResponse) => {
      const googleToken = output.credential
      if(!googleToken) return toast.error("Google token not found")
      console.log(googleToken)
      const {verifyGoogleToken} = await graphqlClient.request(query1, {token: googleToken})
      toast.success("Verification Successful!")
      console.log(verifyGoogleToken)
      if(verifyGoogleToken) window.localStorage.setItem("_twitter_token", verifyGoogleToken)
      await queryClient.invalidateQueries({ queryKey: ["current-user"] })
   }, [queryClient])
                              
                              
                              
	return (
      <div className="grid grid-cols-16 h-screen w-screen pl-40">
                              
                              
         {/* LEFTBAR */}
         <div className="col-span-3">
            <LeftBar/>
            {user && (
               <div className="pt-[82px] pr-3 h-[148px]">
                  <button className="grid grid-cols-8 hover:bg-[#181919] rounded-full p-[9.2px] w-full h-full cursor-pointer transition-all">
                     <div className="col-span-2 pt-1 pl-2">
                        {user.profileImage && (
                           <Image className="rounded-full cursor-pointer" src={user?.profileImage} alt="user-image" height={43} width={43}/>
                        )}
                     </div>
                              
                     <div className="col-span-4 items-start pt-1 leading-[20px]">
                        <h5 className="font-bold tracking-[0.020em] text-[16px] pr-5">{user.firstName} {user?.lastName}</h5>
                        <h5 className="font-medium text-[16px] text-[#71767b]">@deepbhatia_1511</h5>
                     </div>
                              
                     <div className="col-span-2">
                        <FiMoreHorizontal className="text-[18px] rounded-full p-2 mt-1 ml-8 w-fit h-fit transition-all"/>
                     </div>
                  </button>
               </div>
            )}
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
            </div>
            
            
            <div className="pt-4">
               <div className="bg-[#16181C] h-[285px] w-[350px] rounded-2xl pl-3 pt-2">
                  <div className="text-[22px] font-extrabold">
                     You might like..
                  </div>
                  { user==null && (
                     <div className="pt-2">
                        <GoogleLogin onSuccess={handleSignUpWithGoogle}/>
                     </div>
                  )}
                  { user!=null && <h5>already signed in!</h5>}
               </div>
            </div>
         </div>
                              
                              
      </div>
   )
}










