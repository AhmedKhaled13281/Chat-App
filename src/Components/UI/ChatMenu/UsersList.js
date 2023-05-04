import React , {useEffect , useState} from 'react'
import Avatar from '@mui/material/Avatar';
import {User} from '../../../Styles/chatmenu'
import {stringToColor} from '../../../utilities/chatUserList'
import { Box } from '@mui/material';


const UsersList = ({conversation , user}) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== user._id);
        console.log(conversation.members)
        const getUser = async () => {
          try {
            const res = await fetch(
              `http://localhost:8800/api/users?userId=${friendId}`
            );
            const data = await res.json();
            setUserData(data);

          } catch (err) {
            console.log(err);
          }
        };
        getUser();
    }, [ conversation , user?._id]);

    function stringAvatar(name = "Avatar") {

        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ').length > 1 ? name.split(' ')[1][0] : ""}`,
        };
      }

  return (
    <div>
      <Box style={{ textAlign: "center" }}>
        <User>
          <Avatar
            style={{ marginRight: "10px" }}
            {...stringAvatar(userData?.username)}
          />
          <h3 style={{ textAlign: "center" , fontWeight : '500'}}>{userData?.username}</h3>
        </User>
      </Box>
    </div>
  );
}

export default UsersList