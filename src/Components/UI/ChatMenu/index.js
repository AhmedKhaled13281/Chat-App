import React , {useEffect} from 'react'
import ChatSearch from './ChatSearch'
import UsersList from './UsersList'
import { Box } from "@mui/material";
import { useSelector , useDispatch} from 'react-redux';
import { getConversations , getMessages} from '../../../Store/chatReducer';


const ChatMenu = () => {
    const conversations = useSelector(state => state.chat.conversations)
    const userData = useSelector(state => state.auth.userData)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getConversations())
    }, [dispatch])

    const messages = (conversation) => {
      dispatch(getMessages(conversation))
    }

  return (
    <div>
        <Box style={{backgroundColor : '#EBEEEF' , padding : '15px 0' , marginBottom : '5px'}}>
            <h2>INBOX</h2>
        </Box>
        <ChatSearch />
        {conversations.map((conversation , idx) => {
          return (
              <div onClick={() => messages(conversation)} key={idx}>
                            <UsersList conversation={conversation} user={userData}/>
              </div>
          )
        })}

    </div>
  )
}

export default ChatMenu