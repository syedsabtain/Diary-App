import {createSlice} from '@reduxjs/toolkit'


export interface publicinfo{
    username:string,
    diaryid:number[]
}
const initialdata:publicinfo ={
    username:'faceboook',
    diaryid: [0]
}


const Publicdata = createSlice({

    name: 'publicinfo',
    initialState:initialdata,
    reducers:{

        addinfo:(state,action)=>{
            
            
          return {
              username:action.payload.username,
              diaryid:action.payload.diaryid
          }
          

        }
    }
});


export const {addinfo} = Publicdata.actions
export default Publicdata.reducer