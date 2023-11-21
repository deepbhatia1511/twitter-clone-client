import { FaXTwitter } from "react-icons/fa6"
import { GoHome } from "react-icons/go"
import { BiSearch, BiUser } from "react-icons/bi"
import { TbMessage } from "react-icons/tb"
import { GoBookmark } from "react-icons/go";
import { RiFileList2Line } from "react-icons/ri"
import { PiDotsThreeCircle } from "react-icons/pi"
import { IoPeopleOutline } from "react-icons/io5"
import { LuBell } from "react-icons/lu"

interface LeftBarBasicButton {
   icon: React.ReactNode,
   title: string
}

const leftBarButtons: LeftBarBasicButton[] = [
   {
      icon: <GoHome/>,
      title: "Home"
   }, {
      icon: <BiSearch/>,
      title: "Explore"
   }, {
      icon: <LuBell/>,
      title: "Notifications"
   }, {
      icon: <TbMessage/>,
      title: "Messages"
   }, {
      icon: <RiFileList2Line/>,
      title: "Lists"
   }, {
      icon: <GoBookmark/>,
      title: "Bookmarks"
   }, {
      icon: <IoPeopleOutline/>,
      title: "Communities"
   }, {
      icon: <FaXTwitter/>,
      title: "Premium"
   }, {
      icon: <BiUser/>,
      title: "Profile"
   }, {
      icon: <PiDotsThreeCircle/>,
      title: "More"
   }
]

export default leftBarButtons
