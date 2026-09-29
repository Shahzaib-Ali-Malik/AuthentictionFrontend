import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
    name: "authReducer",
    initialState:{
        accessToken: null,
        user: null,
    },
    reducers:{
        setAccessToken :(state,action)=>{
            state.accessToken = action.payload            
        },
        setUser: (state,action)=>{
            state.user = action.payload
        }

    }
})

export const {setAccessToken,setUser} = authReducer.actions
export default authReducer.reducer