import { FaXTwitter } from "react-icons/fa6"
import { GoHome } from "react-icons/go"
import { BiSearch, BiUser } from "react-icons/bi"
import { TbMessage } from "react-icons/tb"
import { FiBookmark  } from "react-icons/fi";
import { PiDotsThreeCircle } from "react-icons/pi"
import { IoPeopleOutline } from "react-icons/io5"
import { LuBell } from "react-icons/lu" 
import { RiFileListLine } from "react-icons/ri" 
import { useMemo } from "react";
import { useCurrentUser } from "@/hooks/queries/user";

interface LeftBarBasicButton {
   icon: React.ReactNode,
   title: string,
   link: string
}

const user = useCurrentUser()

const leftBarButtons: LeftBarBasicButton[] = useMemo(() => [
   {
      icon: <GoHome/>,
      title: "Home",
      link: "/"
   }, {
      icon: <BiSearch/>,
      title: "Explore",
      link: "/"
   }, {
      icon: <LuBell/>,
      title: "Notifications",
      link: "/"
   }, {
      icon: <TbMessage/>,
      title: "Messages",
      link: "/"
   }, {
      icon: <RiFileListLine/>,
      title: "Lists",
      link: "/"
   }, {
      icon: <FiBookmark/>,
      title: "Bookmarks",
      link: "/"
   }, {
      icon: <IoPeopleOutline/>,
      title: "Communities",
      link: "/"
   }, {
      icon: <FaXTwitter/>,
      title: "Premium",
      link: "/"
   }, {
      icon: <BiUser/>,
      title: "Profile",
      link: `/${user?.id}`
   }, {
      icon: <PiDotsThreeCircle/>,
      title: "More",
      link: "/"
   }
], [user?.id])

export default leftBarButtons
