import ChatMenu from '../../Components/UI/ChatMenu';
import ChatBox from '../../Components/UI/ChatBox';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Container , Box, Button} from '@mui/material';
import { useDispatch } from 'react-redux';
import { authSliceAction } from '../../Store/authReducer';
import { useNavigate } from 'react-router-dom';

const Item = styled(Box)(({ theme }) => ({
  float: 'left',
  textAlign: 'center',
  width : '40%',
  height : '100vh',
  borderRight : '0.5px solid grey',
  overflow : 'auto',
  
  [theme.breakpoints.down('sm')]: {
    width : '100%',
    height : '40vh',
    border : '2px solid black'
  }
}));

const Item2 = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  width : '100%',
  height : '100vh',
  float: 'left',
  overflow : 'auto',

  [theme.breakpoints.down('sm')]: {
    width : '100%',
    margin : '15px auto',
    border : '1px solid black',
  }
}));


const Chat = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const log_out = () => {
    dispatch(authSliceAction.logout())
    navigate("/")
  }

  return (
    <Container style={{ padding : '10px 5px' , overflow : 'hidden' }}>
      <Button onClick={() => log_out()} variant="contained">Log Out</Button>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{}}
        style={{ border: "1px solid grey"  , borderRadius : '5px' , overflow : 'hidden' , position : 'relative'}}
      >
        <Item>
          <ChatMenu />
        </Item>
        <Item2>
          <ChatBox />
        </Item2>
      </Stack>
    </Container>
  )
}

export default Chat

