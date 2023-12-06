import { graphqlClient } from "@/clients/api"
import FeedCard from "@/components/FeedCard"
import TwitterLayout from "@/components/Layout/twitterLayout"
import { Tweet, User } from "@/gql/graphql"
import { m_followUser, m_unfollowUser } from "@/graphql/mutations/user"
import { q_getUserById } from "@/graphql/queries/user"
import { useCurrentUser } from "@/hooks/queries/user"
import { useQueryClient } from "@tanstack/react-query"
import type {GetServerSideProps, NextPage} from "next"
import { Share_Tech_Mono, Source_Code_Pro, Space_Mono, Spline_Sans_Mono } from "next/font/google"
import Image from "next/image"
import {useRouter} from "next/router"
import { useCallback, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { FaArrowLeft } from "react-icons/fa6"

const space = Share_Tech_Mono({
   weight: '400',
   preload: false,
})


interface ServerProps {
   userInfo?: User
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (context) => {   //❇️❇️❇️❇️❇️FOR SSR: Server Side Rendering
   const id = context.query.id as string | undefined
   if(!id) return {notFound: true, props: {user: undefined}}
   const userInfo = await graphqlClient.request(q_getUserById, {id})
   if(!userInfo?.getUserById) return {notFound: true}
   return {
      props: {
         userInfo: userInfo.getUserById as User
      },
   }
}



const UserProfilePage: NextPage<ServerProps> = (props) => {
   const currentUser = useCurrentUser()
   const queryClient = useQueryClient()
   const router = useRouter();
   
   
   const [followersCount, setFollowersCount] = useState(props.userInfo?.followers?.length || 0)
   
   
   
   const handleArrowClick = () => {
      router.push('/')
   }
   
   const first_name = props.userInfo?.firstName?.toLowerCase()
   const last_name = props.userInfo?.lastName?.toLowerCase()
   const twitterName = `@${first_name}${last_name}_xoxo`
   
   const amIfollowing = useMemo(() => {
      if(!props.userInfo) return false
      const whomIamFollowing = currentUser?.followings ?? []     //⭕⭕⭕⭕concept of "Optional Chaining" and "Nullish Coalescing"
      return whomIamFollowing.findIndex(e => e?.id === props.userInfo?.id) >= 0;
   }, [currentUser, props.userInfo])
   
   
   const handleFollowUser = useCallback(async() => {
      if(!props.userInfo?.id) return
      await graphqlClient.request(m_followUser, {to: props.userInfo?.id})
      setFollowersCount((x) => x + 1)
      await queryClient.invalidateQueries({ queryKey: ["current-user"] })
   }, [props.userInfo?.id, setFollowersCount, queryClient])
   
   
   const handleUnfollowUser = useCallback(async() => {
      if(!props.userInfo?.id) return
      await graphqlClient.request(m_unfollowUser, {to: props.userInfo?.id})
      setFollowersCount((x) => x - 1)
      await queryClient.invalidateQueries({ queryKey: ["current-user"] })
   }, [props.userInfo?.id, setFollowersCount, queryClient])
   
   
   const handleFollowWithoutAccount = () => {
      toast.error("You need to have an account to follow this user!")
   }
   
   
   return (
      <div>
         <TwitterLayout>
            <div className="col-span-7 border-l-[0.5px] border-r-[0.5px] border-[#2E3236] ">
               <div className="z-10 sticky top-0">
                  <nav key="🤍🤍🤍🤍🤍NAVBAR" className="grid grid-cols-12 pl-3 h-[54px] backdrop-blur-md bg-black/40">
                     <div className="col-span-1">
                        <FaArrowLeft onClick={handleArrowClick} className="text-[16px] cursor-pointer hover:bg-[#181919] rounded-full p-2 mt-2 w-fit h-fit transition-all"/>
                     </div>
                     <div className="col-span-11 flex justify-between">
                        <h1 className="font-bold text-xl mt-[10px]">{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>
                        <h1 className="font-[100] text-lg mt-[12px] text-[#71767b] pr-5">{props.userInfo?.tweets?.length} tweets</h1>
                     </div>
                  </nav>
               </div>
                              
               <div key="🤍🤍🤍🤍🤍IMAGES" className="relative pb-[82px]">
                  <div className="h-[200px] bg-gray-700 overflow-hidden">
                     <Image style={{objectFit: "cover", width: "100%", height: "100%"}} src={"https://t.ly/6BsOs"} alt={"bg-image"} width={600} height={100}/>
                  </div>
                  <div className="absolute top-[128px] left-4">
                     {props.userInfo?.profileImage && <Image className="rounded-full border-[4px] border-black" src={props.userInfo?.profileImage} alt={"user-image"} width={142} height={142}/>}
                  </div>
                  <div className="flex justify-between absolute top-[210px] left-[150px] w-[455px]">
                     <div>
                        <h1 className="text-2xl text-[#71767b] font-bold pl-4">{twitterName}</h1>
                     </div>
                     {currentUser?.id && props.userInfo?.id !== currentUser?.id && (
                        <>
                           {amIfollowing
                              ? <button onClick={handleUnfollowUser} className="text-[16px] font-bold border-[0.5px] text-black bg-white rounded-full items-center h-9 w-[112px] cursor-pointer transition-all">
                                    Following
                              </button>
                              : <button onClick={handleFollowUser} className="text-[16px] font-bold border-[0.5px] border-[#536471] rounded-full items-center h-9 w-[112px] cursor-pointer hover:bg-[#020f18] hover:text-[#1c9cf1] hover:border-[#06385f] transition-all">
                                    Follow
                              </button>
                           }
                        </>
                     )}
                     {currentUser?.id && props.userInfo?.id === currentUser?.id && (
                        <button className="text-[16px] font-bold border-[0.5px] border-[#536471] rounded-full items-center h-9 w-[112px] cursor-pointer hover:bg-[rgb(22,24,28)]  transition-all">
                           Edit profile
                        </button>
                     )}
                     {!currentUser?.id && (
                        <button onClick={handleFollowWithoutAccount} className="text-[16px] font-bold border-[0.5px] border-[#536471] rounded-full items-center h-9 w-[112px] cursor-pointer hover:bg-[#020f18] hover:text-[#1c9cf1] hover:border-[#06385f] transition-all">
                           Follow
                        </button>
                     )}
                  </div>
               </div>
                              
               <div key="🤍🤍🤍🤍🤍INFO" className="border-b-[0.5px] border-[#2E3236] pb-6 pl-1">
                  <div className="flex gap-[55px] pl-4">
                     <div className="flex gap-1">
                        <div className={space.className}>
                           {props.userInfo?.followings?.length !== undefined && (
                              <h1 className="text-4xl">
                                 {props.userInfo.followings.length < 10 ? `0${props.userInfo.followings.length}` : props.userInfo.followings.length}
                              </h1>
                           )}
                        </div>
                        <h1 className="text-lg text-[#71767b] pt-[12px]">following</h1>
                     </div>
                     <div className="flex gap-1">
                        <div className={space.className}>
                           {props.userInfo?.followers?.length !== undefined && (
                              <h1 className="text-4xl">
                                 {followersCount < 10 ? `0${followersCount}` : followersCount}
                              </h1>
                           )}
                        </div>
                        <h1 className="text-lg text-[#71767b] pt-[12px]">followers</h1>
                     </div>
                  </div>
               </div>
                              
               {props.userInfo?.tweets?.slice().reverse().map((tweet) => <FeedCard key={tweet?.id} data={tweet as Tweet} />)}
            </div>
         </TwitterLayout>
      </div>
   )
}




export default UserProfilePage


