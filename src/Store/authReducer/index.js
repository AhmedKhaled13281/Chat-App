import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

export const userRegister = createAsyncThunk('userRegister/authSlice' , async (data , thunkAPI) => {
    try{
        await fetch('http://localhost:8800/api/auth/register' , {
            method : 'POST',
            body : JSON.stringify(data),
            headers : {'Content-Type': 'application/json'}
        })
    }catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const userLogin = createAsyncThunk('userLogin/authSlice' , async (data , thunkAPI) => {
    try{
       const response = await fetch('http://localhost:8800/api/auth/login' , {
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

const initialState = {userData : null , loading : true , error : null , status : 'idle'}

const authSlice = createSlice({
    name : 'authSlice',
    initialState : initialState,
    reducers : {
        login (state , action) {
            state.userData = action.payload
        },
        logout (state)  {
            state.userData = null
            localStorage.clear();
        }
    },
    extraReducers : builder => {
        builder
            .addCase(userLogin.fulfilled , (state , action) => {
                state.status = 'success'
                console.log(action.payload)
                if(action.payload?.message){
                    state.error = action.payload?.message
                }

                state.userData = action.payload

                localStorage.setItem('userData', JSON.stringify(action.payload))
                state.loading = false
            })
            .addCase(userLogin.pending , (state , action) => {
                state.status = 'pending'
                state.error = action.payload?.message
            })
            .addCase(userLogin.rejected , (state , action) => {
                state.status = 'failed'
                state.error = action.payload?.message
            })
    }
})

export const authSliceAction = authSlice.actions

export default authSlice.reducer