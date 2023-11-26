import { graphqlClient } from "@/clients/api"
import FeedCard from "@/components/FeedCard"
import TwitterLayout from "@/components/Layout/twitterLayout"
import { Tweet, User } from "@/gql/graphql"
import { q_getUserById } from "@/graphql/queries/user"
import { useCurrentUser } from "@/hooks/queries/user"
import type {GetServerSideProps, NextPage} from "next"
import Image from "next/image"
import {useRouter} from "next/router"
import { FaArrowLeft } from "react-icons/fa6"

interface ServerProps {
   userInfo?: User
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
   const router = useRouter()
   const first_name = props.userInfo?.firstName?.toLowerCase()
   const last_name = props.userInfo?.lastName?.toLowerCase()
   const twitterName = `@${first_name}${last_name}_xoxo`
   
   return (
      <div>
         <TwitterLayout>
            <div className="col-span-7 border-l-[0.5px] border-r-[0.5px] border-[#2E3236] ">
               <div className="z-10 sticky top-0">
                  <nav key="🤍🤍🤍🤍🤍NAVBAR" className="grid grid-cols-12 pl-5 h-[54px] backdrop-blur-md bg-black/60">
                     <div className="col-span-1">
                        <FaArrowLeft className="text-[16px] mt-[19px]"/>
                     </div>
                     <div className="col-span-11 flex justify-between">
                        <h1 className="font-bold text-xl mt-[10px]">{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>
                        <h1 className="font-[100] text-lg mt-[12px] text-[#71767b] pr-5">{props.userInfo?.tweets?.length} tweets</h1>
                     </div>
                  </nav>
               </div>
                              
               <div key="🤍🤍🤍🤍🤍IMAGES" className="relative pb-[82px]">
                  <div className="h-[200px] bg-gray-700">
                     <Image style={{objectFit: "cover", width: "100%", height: "100%"}} src={"https://shorturl.at/ACQ39"} alt={"bg-image"} width={600} height={100}/>
                  </div>
                  <div className="absolute top-[128px] left-4">
                     {props.userInfo?.profileImage && <Image className="rounded-full border-[4px] border-black" src={props.userInfo?.profileImage} alt={"user-image"} width={142} height={142}/>}
                  </div>
                  <div className="absolute top-[210px] left-[495px]">
                     <button className="text-[15px] font-bold border-[0.5px] border-[#536471] rounded-full items-center h-9 w-[112px] cursor-pointer hover:bg-[#181919] transition-all">
                        Edit Profile
                     </button>
                  </div>
               </div>
                              
               <div key="🤍🤍🤍🤍🤍INFO" className="border-b-[0.5px] border-[#2E3236] pb-9">
                  <h1 className="text-xl font-bold pl-4">{twitterName}</h1>
               </div>
                              
               {/* {tweets?.map((tweet) => tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet}/> : null )} */}
               {props.userInfo?.tweets?.map((tweet) =>  <FeedCard key={tweet?.id} data={tweet as Tweet}/>)}
            </div>
         </TwitterLayout>
      </div>
   )
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



export default UserProfilePage