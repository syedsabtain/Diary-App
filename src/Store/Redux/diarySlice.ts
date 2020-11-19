import {createSlice} from '@reduxjs/toolkit'

interface initi{
    diaryID:number,
    username:string,
    diary:[
        {
         diaryid:number,
         status:string,
         diarytitle:string,
         createdAt:string,
         entries:[
            {
             id:number,
             title:string,
             description:string,
             createAt:string,
             updatedAt:string
            }]
        }
        
    ]
}
const initialstate={
    diaryID:0,
    username:'',
    diary:[
        {
         diaryid:0,
         status:'string',
         diarytitle:'string',
         createdAt:'string',
         entries:[
            {
             id:0,
             title:'string',
             description:'string',
             createAt:'string',
             updatedAt:'string'
            }]
        }
        
    ]

}

const diarySlice = createSlice({
    name: 'Diarydata',
    initialState:initialstate,
    reducers:{
        addUserDiary:(state,action)=>{

            return action.payload
        }
    }
})


export default diarySlice.reducer
export const {addUserDiary} = diarySlice.actions




