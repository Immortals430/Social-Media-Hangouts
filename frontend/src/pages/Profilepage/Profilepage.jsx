import ProfileDetail from "../../Component/Profile/ProfileDetail"
import Memories from "../../Component/Profile/Memories"
import Upload from "../../Component/Profile/Upload"
import { useSelector } from "react-redux"
import { navigateSelector } from "../../redux/reducers/navigation_reducer"
import Settings from "../../Component/Profile/Settings"
import MobileAside from '../../Component/Mobile/MobileAside'
import { chatSelector } from "../../redux/reducers/chat_reducer"
import { userSelector } from "../../redux/reducers/user_reducer"
import Chats from "../../Component/Chats/Chats"

export default function Profilepage() {

  const { path } = useSelector(navigateSelector)
  const { user } = useSelector(chatSelector)
  const { loggedUser } = useSelector(userSelector)

  return (
    <>
    <main className="flex">
    <ProfileDetail />
    <Memories />
    <MobileAside />
    </main>

    {path === 'upload' ? <Upload /> : null }
    {path === 'setting' ? <Settings /> : null }
    {user._id && loggedUser ? <Chats /> : null}

    </>
  )
}
