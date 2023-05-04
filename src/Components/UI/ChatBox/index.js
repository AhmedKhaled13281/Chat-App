import React  , {useRef , useEffect} from "react";
import Message from "./Message";
import {
  Divider,
  useMediaQuery,
  Grid,
  TextField,
  Fab,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";
import { ButtonBox } from "../../../Styles/chatbox";
import { useDispatch ,  useSelector } from "react-redux";
import { sendMessage } from "../../../Store/chatReducer";
import { connectToSocket , addUserToSocket , sendMessageToSocket} from "../../../Store/chatReducer/socketClient";
import { chatSliceAction } from "../../../Store/chatReducer";
import { socket } from "../../../Store/chatReducer/socketObject";

const ChatBox = () => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("sm"));
  const inputRef = useRef()
  const scrollRef = useRef();

  const dispatch = useDispatch()

  const {currentChat , messages , arrivalMessage} = useSelector((state) => state.chat);

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dispatch(connectToSocket())
    socket.on("getMessage", (data) => {
      console.log(data)
      dispatch(
        chatSliceAction.setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        })
      );
    });
  }, [dispatch])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      dispatch(sendMessage(arrivalMessage));
      console.log(arrivalMessage)
  }, [arrivalMessage, currentChat , dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();
    let inputValue = inputRef.current.value;

    if (inputValue !== "") {

      const message = {
        sender: userData?._id,
        text: inputValue,
        conversationId: currentChat?._id,
      };

      const receiverId = currentChat.members.find(
        (member) => member !== userData?._id
      );

      dispatch(
        sendMessageToSocket({
          senderId: userData?._id,
          receiverId,
          text: inputValue,
        })
      );
        console.log(message)
      dispatch(sendMessage(message));
    }

    inputRef.current.value = "";
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  useEffect(() => {
    dispatch(addUserToSocket())
    // socket.on("getUsers" , user => {
    //   console.log(user)
    // })
  },[dispatch])

  return (
    <>
      {currentChat ? (
        <Box style={{ overflow: "hidden" }}>
          <Box
            style={{
              backgroundColor: "#EBEEEF",
              zIndex: 6000,
              padding: "15px 0",
              marginBottom: "5px",
            }}
          >
            <h2 style={{}}>View Conversation</h2>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {messages.map((m, idx) => (
              <div key={idx} ref={scrollRef}>
                <Message message={m} own={m.sender === userData._id} />
              </div>
            ))}
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            style={{ zIndex: 5000, overflow: "hidden" , marginTop : '80px'}}
          >
            <ButtonBox>
              <Box style={{ width: "100%" }}>
                <TextField
                  id="outlined-basic-email"
                  label="Type a message"
                  fullWidth
                  inputRef={inputRef}
                />
              </Box>
              <Box
                type="submit"
                onClick={handleSubmit}
                style={{ padding: "0 5px" }}
              >
                <Fab color="primary" aria-label="add">
                  <SendIcon />
                </Fab>
              </Box>
            </ButtonBox>
          </Box>
        </Box>
      ) : (
        <h2
          style={{
            position: "absolute",
            top: "50%",
            left: `${match ? "50%" : "65%"}`,
            textAlign: "center",
            transform: "translate(-50% , -50%)",
          }}
        >
          Start Any Conversation
        </h2>
      )}
    </>
  );
};

export default ChatBox;
