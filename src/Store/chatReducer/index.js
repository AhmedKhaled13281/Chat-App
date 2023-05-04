import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

export const getConversations = createAsyncThunk('getConversations/chatSlice' , async (_ , thunkAPI) => {
    try{
        let {_id} = JSON.parse(localStorage.getItem('userData'));
        const response = await fetch(`http://localhost:8800/api/conversations/${_id}`)
        if (!response.ok){
            const error = await response.json()
            return thunkAPI.rejectWithValue(error)
        }
        const result = await response.json()
        return result
    }catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createConversation = createAsyncThunk('createConversation/chatSlice' , async (data , thunkAPI) => {
    try{
        const response = await fetch(`http://localhost:8800/api/conversations` , {
            method : 'POST',
            body : JSON.stringify(data),
            headers : {'Content-Type': 'application/json'}
        })
        if (!response.ok){
            const error = await response.json()
            return thunkAPI.rejectWithValue(error)
        }
        const result = await response.json()
        return result
    }catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getMessages = createAsyncThunk('getMessages/chatSlice' , async (currentChat , thunkAPI) => {
    try{
        const response = await fetch(`http://localhost:8800/api/messages/${currentChat?._id}`)
        if (!response.ok){
            const error = await response.json()
            return thunkAPI.rejectWithValue(error)
        }
        const result = await response.json()
        return {currentChat , result}
    }catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const sendMessage = createAsyncThunk('sendMessage/chatSlice' , async (message , thunkAPI) => {
    try{
        const response = await fetch(`http://localhost:8800/api/messages` , {
            method : 'POST',
            body : JSON.stringify(message),
            headers : {'Content-Type': 'application/json'}
        })
        if (!response.ok){
            const error = await response.json()
            return thunkAPI.rejectWithValue(error)
        }
        const result = await response.json()
        return result
    }catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const initialState = {
  conversations: [],
  currentChat: null, // CurrentChat is The Current Conversation
  messages: [],
  arrivalMessage: null,
  loading: true,
  error: null,
};

const chatSlice = createSlice({
    name : 'chatSlice',
    initialState : initialState ,
    reducers : {
        setCurrentChat (state , action) {
            state.currentChat = action.payload
        },

        setArrivalMessage (state , action) {
            console.log(action.payload)
            state.arrivalMessage = action.payload
        }
    },
    extraReducers : builder => {
        builder
            .addCase(getConversations.fulfilled , (state , action) => {
                state.conversations = action.payload
                state.loading = false
            })
            .addCase(createConversation.fulfilled , (state , action) => {
                console.log(action.payload)
                state.loading = false
            })
            .addCase(getMessages.fulfilled , (state , action) => {
                const {currentChat , result} = action.payload
                console.log(currentChat , result)
                state.currentChat = currentChat
                state.messages = result
                state.loading = false
            })
            .addCase(sendMessage.fulfilled , (state , action) => {
                state.messages = [...state.messages , action.payload]
                state.loading = false
            })

    }
})

export const chatSliceAction = chatSlice.actions

export default chatSlice.reducer