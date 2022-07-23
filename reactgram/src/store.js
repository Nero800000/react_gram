import {configureStore} from "@reduxjs/toolkit";

import authReducer from './slices/AuthSlices'
import useReducer from './slices/userSlices';

export const store = configureStore({
    reducer:{
        auth: authReducer,
        user: useReducer
    },

})
