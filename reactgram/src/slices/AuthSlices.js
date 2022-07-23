
import { createSlice,createAsyncThunk, isFulfilled} from "@reduxjs/toolkit";
import { Action } from "history";
import thunk from "redux-thunk";
import authService from "../services/AuthService";


const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user? user:null,
    error: false,
    success: false,
    loading:false,

}

//Register an user, and sign

export const register = createAsyncThunk("auth/register",

async(user,thunkAPI) => {
   
    const data = await authService.register(user)

    //check for errors
    if(data.errors) {
        return  thunkAPI.rejectWithValue(data.errors[0])
    }                                                        /// existe pensamento e existe senso como o fato de vc desviar ou pegar alguma coisa rapido
                                                             /// ou seja não precisa vc ouvir o seu pensamento

    return data

})

// Logout an user

export const logout = createAsyncThunk("auth/logout", async()=> {
    await authService.logout()
})


//sign in an user

export const login = createAsyncThunk("auth/login",

async(user,thunkAPI) => {
   
    const data = await authService.login(user)

    //check for errors
    if(data.errors) {
        return  thunkAPI.rejectWithValue(data.errors[0])
    }                                                        /// existe pensamento e existe senso como o fato de vc desviar ou pegar alguma coisa rapido
                                                             /// ou seja não precisa vc ouvir o seu pensamento

    return data

})


export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        reset: (state) => { //função do slice que reseta todos os estados

            state.loading = false;
            state.error = false;
            state.sucess = false;

        },
    },
extraReducers: (builder) => { // trabalhar com os estados atuais de cada requesição, nessa caso a requisição foi enviada mas não obteve resposta
    builder.addCase(register.pending, (state) => {
        state.loading = true
        state.error = false
    }).addCase(register.fulfilled, (state,action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload 
    })

    .addCase(register.rejected, (state,action) => {
        state.loading = false
        state.error= action.payload
        state.user = null
    })

    .addCase(logout.fulfilled, (state,action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = null 
    })

    builder.addCase(login.pending, (state) => {
        state.loading = true
        state.error = false
    }).addCase(login.fulfilled, (state,action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload 
    })

    .addCase(login.rejected, (state,action) => {
        state.loading = false
        state.error= action.payload
        state.user = null
    })


}

});

export const {reset} = authSlice.actions

export default authSlice.reducer;