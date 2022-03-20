import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name : "user",
    initialState : {
        user: null
    },
    reducers:{
        register:(state, action) =>{
            state.user = action.payload
        },
        login:(state, action) =>{
            state.user = action.payload
        },
        logout:(state) =>{
            state.user =null
        },
        dollarSelect:(state, action)=>{
            state.user = action.payload
        },
        itemSelect:(state,action)=>{
            state.user = action.payload
        }
    }
})

export const {register, login, logout, dollarSelect, itemSelect} = userSlice.actions
export const authenticateUser = (state) => state.user.user
export default userSlice.reducer;
