import {configureStore} from '@reduxjs/toolkit'
import bagSlice from './bagSlice';
import addressSlice from './addressSlice';
import userSlice from './userInfoSlice';


const homeLine = configureStore({
    reducer: {
        bag: bagSlice.reducer,
        user:userSlice.reducer,
        address:addressSlice.reducer

        
    }
})

export default homeLine;