import {configureStore,combineReducers} from '@reduxjs/toolkit'

import userSliceReducer from '../Redux/userSlice'
import Diaryreducer from '../Redux/diarySlice'
import publicDiary from '../Redux/publicDiary'
import publicdata from '../Redux/publicdata'
const Rootreducer = combineReducers(
    {
        user: userSliceReducer,
        diary: Diaryreducer,
        publicdiary: publicDiary,
        publicinfo: publicdata
    }
)

const userConfig = configureStore({
    reducer:Rootreducer
})

export default userConfig