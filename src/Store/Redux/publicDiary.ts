import {createSlice} from '@reduxjs/toolkit'


const PublicDiary = createSlice({
    name: 'PublicDiary',
    initialState:[{}],
    reducers:{
        publicAddDiary:(state,action)=>{

            return action.payload
        }
    }
})



export default PublicDiary.reducer
export const {publicAddDiary} = PublicDiary.actions