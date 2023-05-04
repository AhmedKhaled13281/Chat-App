import { createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "./socketObject";


export const connectToSocket = createAsyncThunk('connectToSocket/chatSlice' , async (_ , thunkAPI) => {
    try {
          socket.on("connect", () => {
            console.log("Socket connected!");
          });

          socket.on("disconnect", () => {
            console.log("Socket disconnected!");
          });

          socket.on("error", (error) => {
            console.log(`Socket error: ${error}`);
          });

          return true;

    }catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const addUserToSocket = createAsyncThunk(
  "addUserToSocket/chatSlice",
  async (_ , thunkAPI) => {
    let {_id} = JSON.parse(localStorage.getItem('userData'));
    try {
      socket.emit("addUser", _id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const sendMessageToSocket = createAsyncThunk(
    "sendMessageToSocket/chatSlice",
    async (message , thunkAPI) => {
      try {
        socket.emit("sendMessage", message);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );