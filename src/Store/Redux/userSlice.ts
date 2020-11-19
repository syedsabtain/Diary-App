import {createSlice} from '@reduxjs/toolkit'


interface initial {
    token:string,
    isAuthenticated:boolean,
    username:string
}

const initialstate:initial ={
    token:'',
    isAuthenticated: false,
    username: '',
}


const userSlice = createSlice({
    name: 'userlogin',
    initialState:initialstate,
    reducers:{
        login: (state,action)=>{
            return {
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticated,
                username:action.payload.username,
                // diaryID:action.payload.diaryID,
                // diary:action.payload.diary
            }
        },
        logout:(state,action)=>{
            return{
                token:"",
                isAuthenticated:false,
                username:''
            }
        }
    }
})

export const {login,logout} = userSlice.actions;
export default userSlice.reducer