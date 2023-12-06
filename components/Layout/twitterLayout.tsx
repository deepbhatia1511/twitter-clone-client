import React from "react"
import FeedCard from "../FeedCard/index"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { useCallback, useState } from "react"
import { toast } from "react-hot-toast"
import { q_userLogin, q_verifyGoogleToken } from "../../graphql/queries/user"
import { useCurrentUser } from "@/hooks/queries/user"
import { useAllTweets } from "@/hooks/queries/tweet"
import { graphqlClient } from "@/clients/api"
import Image from "next/image"
import LeftBar from "@/components/LeftBar"
import { useQueryClient } from "@tanstack/react-query"
import { FiMoreHorizontal } from "react-icons/fi"
import { BiSearch } from "react-icons/bi"
import { useCreateTweet } from "@/hooks/mutations/tweet"
import { Archivo_Black } from "next/font/google"
import Link from "next/link"
///////////////////////////////////////////////////////////////////////////

const archivo = Archivo_Black({
   weight: '400',
   preload: false,
})



interface TwitterLayoutProps {
   children: React.ReactNode
}

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
   const user = useCurrentUser()
   const {tweets = []} = useAllTweets()
   const {mutate} = useCreateTweet()
   const queryClient = useQueryClient()
                              
                              
                              
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
                              
                              
                              
   const handleSignUpWithGoogle = useCallback(async (output: CredentialResponse) => {
      const googleToken = output.credential
      if(!googleToken) return toast.error("Google token not found!")
      console.log(googleToken)
      const {verifyGoogleToken} = await graphqlClient.request(q_verifyGoogleToken, {token: googleToken})
      if(!verifyGoogleToken) {
         toast.error("Unable to Signup!")
      } else {
         toast.success("Verification Successful!")
         console.log(verifyGoogleToken)
         if(verifyGoogleToken) window.localStorage.setItem("_twitter_token", verifyGoogleToken)
         await queryClient.invalidateQueries({ queryKey: ["current-user"] })
      }
   }, [queryClient])
                              
                              
                              
   const handleLogin = useCallback(async() => {
      const enteredEmail = prompt('Enter your email:')
      if (enteredEmail) {
         console.log(enteredEmail)
         const {userLogin} = await graphqlClient.request(q_userLogin, {email: enteredEmail})
         if(!userLogin) {
            toast.error("User with this email doesnt exist!")
         } else {
            toast.success("Login Successful!")
            console.log(userLogin)
            if(userLogin) window.localStorage.setItem("_twitter_token", userLogin)
            await queryClient.invalidateQueries({ queryKey: ["current-user"] })
         }
      }
   }, [queryClient])
   
   
   const handleLogout = async() => {
      const confirmLogout = window.confirm('Do you want to log out?')
      if (confirmLogout) {
         localStorage.removeItem("_twitter_token")
         toast.success("Logged out!")
         await queryClient.invalidateQueries({ queryKey: ["current-user"] })       // OPTION 1
         // window.location.reload()                                               // OPTION 2
      }
   }
   
   
   const handleCreator = () => {
      <Link href={"/clpc112qy0000f71lcfps6y0d"}/>
   }
   
   
   
   
   const first_name = user?.firstName?.toLowerCase()
   const last_name = user?.lastName?.toLowerCase()
   const twitterName = `@${first_name}${last_name}_xoxo`
                              
                              
   return(
      <div>
         <div className="grid grid-cols-16 h-screen w-full pl-40">
                              
                              
            {/* LEFTBAR */}
            <div className="col-span-3">
               <div className="sticky top-0">
                  <LeftBar/>
               </div>
               {user!=null && (
                  <div className="pt-[82px] pr-3 h-[148px] fixed bottom-2 left-29">
                     <button className="grid grid-cols-16 hover:bg-[#181919] rounded-full border-[0.5px] border-[#2E3236] p-[9.2px] w-[250px] h-full cursor-pointer transition-all">
                        <div className="col-span-4 pl-1">
                           {user.profileImage && (
                              <Image className="rounded-full cursor-pointer" src={user?.profileImage} alt="user-image" height={43} width={43}/>
                           )}
                        </div>
                              
                        <div className="col-span-12 flex justify-start leading-[22px] pt-[2px]">
                           <button onClick={handleLogout}>
                              <div className="text-[20px] font-bold tracking-[0.020em] w-fit">{user.firstName} {user?.lastName}</div>
                              <div className="text-[15px] text-[#575B5F] font-bold tracking-[0.020em]">{twitterName}</div>
                           </button>
                        </div>
                           
                     </button>
                  </div>
               )}
            </div>
                              
                              
                              
                              
                              
            {/* FEED PAGE */}
            {props.children}
                              
                              
                              
                              
                              
            {/* RIGHTBAR */}
            <div className="col-span-4 pt-1 pl-7">
               <div className="sticky top-1">
                  <div className="pb-3">
                     <div className="bg-[rgb(22,24,28)] h-[45px] w-[350px] rounded-full pl-4 pt-[11px]">
                        <div className="flex items-center gap-5">
                           <BiSearch className="text-[20px] text-[#71767b]"/>
                           <h4 className="text-[15px] text-[#71767b]">Search</h4>
                        </div>
                     </div>
                  </div>
                  
                  
                  
                  { user==null && (
                     <div key="❤️❤️❤️❤️❤️LOGINS AND SIGNUPS❤️❤️❤️❤️❤️">
                        <div className="border-[0.5px] border-[#2E3236] h-[304px] w-[350px] rounded-2xl pl-3 pt-3">
                           <div className={archivo.className}>
                              <div className="text-[22px] font-extrabold">
                                 New to twitter?
                              </div>
                           </div>
                           <div className="text-[14px] text-[#71767b] tracking-tight">
                              Sign up now to get your own personalised timeline!
                           </div>
                           <div className="pr-8 pt-3 w-full">
                              <button className="flex justify-center bg-[#FFFFFF] overflow-hidden rounded-full h-[38px] w-full cursor-pointer">
                                 <div className="p">
                                    <GoogleLogin onSuccess={handleSignUpWithGoogle}/>
                                 </div>
                              </button>
                           </div>
                           <div className="pr-8 pt-2 w-full">
                              <button className="text-[15px] text-black font-semibold bg-[#FFFFFF] rounded-full items-center p-1 h-[38px] w-full cursor-pointer">
                                 Sign up with Apple
                              </button>
                           </div>
                           <div key="DIVIDER" className="flex items-center gap-2 pr-8 pt-1">
                              <div className="bg-[#2E3236] w-[133px] h-[0.5px]"></div>
                              <div className="text-[16px]">or</div>
                              <div className="bg-[#2E3236] w-[133px] h-[0.5px]"></div>
                           </div>
                           <div className="pr-8 pt-1 w-full">
                              <button className="text-[16px] text-black font-semibold  bg-[#1d9bf0] rounded-full items-center p-1 h-[38px] w-full cursor-pointer">
                                 Create Account
                              </button>
                           </div>
                           <div className="text-[14px] text-[#71767b] tracking-tight pt-4 leading-4">
                              By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                           </div>
                        </div>
                        
                        
                        <div className="pt-4 pb-3">
                           <div className={archivo.className}>
                              <div className="pl-1 pb-[0.6px]">Already have an account?</div>
                           </div>
                           <button onClick={handleLogin} className="text-[16px] font-bold border-[0.5px] text-[#1d9bf0] b-[0.5px] border-[#2E3236] rounded-full items-center h-9 w-[350px] cursor-pointer hover:bg-[#020f18] hover:text-[#1c9cf1] hover:border-[#06385f] transition-all">
                              Log in
                           </button>
                        </div>
                     </div>
                  )}
                  
                  
                  
                  <div className="pt-2 pb-3">
                        <div className={archivo.className}>
                              <div className="pl-1 pb-[0.6px]">Meet the developer. . .</div>
                        </div>
                           <button className="grid grid-cols-16 rounded-2xl hover:bg-[#1819196e] border-[0.5px] border-[#2E3236] p-[9.2px] w-[350px] h-full cursor-pointer transition-all">
                              <div className="col-span-3 pl-1 pt-[2px]">
                                 <Image className="rounded-full cursor-pointer" src="https://t.ly/LpIku" alt="user-image" height={44} width={44}/>
                              </div>
                              <div className="flex justify-start pl-[0.6px]">
                                 <div className="col-span-13 leading-[26px]">
                                    <Link href={"/clpc112qy0000f71lcfps6y0d"} className="text-[22px] pr-[122px] font-bold tracking-[0.020em] w-fit hover:underline decoration-solid">
                                       Deep Bhatia
                                    </Link>
                                    <div className="flex">
                                       <div className="text-[16px] text-[#80858a] font-bold tracking-[0.020em] w-fit">Full_Stack_Web_Developer</div>
                                       <div className="text-[16px] font-bold tracking-[0.020em]">🚀</div>
                                       <div className="text-[16px] font-bold tracking-[0.020em]">🚀</div>
                                    </div>
                                    <div key="LINKSS" className="pt-1 pb-1 leading-[22px]">
                                       <a href="https://twitter.com/deepbhatia_1511" target="_blank" rel="noopener noreferrer">
                                          <div className="flex justify-start gap-2">
                                             <div className="text-[#575b5fbb] font-bold">twitter:</div>
                                             <div className="hover:underline decoration-solid hover:text-[#1d9bf0] text-[#80858a]">@deepbhatia_1511</div>
                                          </div>
                                       </a>
                                       <a href="https://github.com/deepbhatia1511" target="_blank" rel="noopener noreferrer">
                                          <div className="flex justify-start gap-2">
                                             <div className="text-[#575b5fbb] font-bold">github:</div>
                                             <div className="hover:underline decoration-solid hover:text-[#1d9bf0] text-[#80858a]">@deepbhatia1511</div>
                                          </div>
                                       </a>
                                    </div>
                                 </div>
                              </div>
                           </button>
                  </div>
                  
                  
                  
                  <div className="pt-1">
                     <div className="bg-[#16181C] h-[250px] w-[350px] rounded-2xl pl-3 pt-2">
                        <div className={archivo.className}>
                           <div className="text-[22px] font-extrabold">
                              You might like..
                           </div>
                        </div>
                        <div className="text-[16px]">
                           This component is in development
                        </div>
                     </div>
                  </div>
               </div>
            </div>
                              
                              
         </div>
      </div>
   )
}

export default TwitterLayout
