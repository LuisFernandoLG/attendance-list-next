import { getCurrentDateTime } from "@/helpers/getCurrentDateTime";
import { isClientSide } from "@/helpers/isClientSide";
import { LoginResponse, RegisterProps, RegisterResponse } from "@/models/authApiTypes";
import { User } from "@/models/userTypes";
import { authApi } from "@/services/api/authApi";
import { ClearAndPersistDbToken, clearDbUserStatePersistance, setAndPersistDbToken, setAndPersistDbUserState } from "@/services/api/persist-user-info.service";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type AuthSlice = {
  user: User;
  auth: boolean;
};

const initialState: AuthSlice = {
  user: {
    id: 0,
    name: "",
    email: "",
    timezone: "",
    email_verified_at: ""

  },
  auth: false
};  

const initialUser = {
  id: 0,
  name: "",
  email: "",
  timezone: "",
  email_verified_at: ""
}


const getUserStateFromLocalStorage = () => {
  if(!isClientSide()) return initialUser

  if(localStorage.getItem("user") === null){
    return initialUser
  }

  const user = JSON.parse(localStorage.getItem("user") as string) as User
  return user
}

const getToken = (): boolean => {
  if(!isClientSide()) return false

  return localStorage.getItem("token") === null ? false : true
}

const localStoragerState = {user: getUserStateFromLocalStorage(), auth: getToken()}


const authSlice = createSlice({
  name: "auth",
  initialState: localStoragerState,
  reducers: {
    logOut: (state) => {
      state.user = initialState.user
      state.auth = initialState.auth
      clearDbUserStatePersistance()
      ClearAndPersistDbToken()
    },
    confirmEmail:(state)=>{
      const dateNow = getCurrentDateTime()
      state.user.email_verified_at = dateNow
      setAndPersistDbUserState({...state.user, email_verified_at:dateNow})
    },
    login: (state, {payload}: PayloadAction<LoginResponse>)=>{
      state.user = payload.user
      state.auth = true
      setAndPersistDbUserState(payload.user)
      setAndPersistDbToken(payload.token)
    }
  },
  extraReducers: (builder)=> {
    builder
      .addCase(registerUser.pending, (state)=>{

    })
    .addCase(registerUser.fulfilled, (state, action)=>{
      state.user = action.payload.user
      state.auth = true
      setAndPersistDbUserState(action.payload.user)
      setAndPersistDbToken(action.payload.token)
    })
    .addCase(registerUser.rejected, (state, {payload})=>{
      console.log({payload: payload})
    })
  },

});


export const registerUser = createAsyncThunk<
  RegisterResponse, 
  RegisterProps,
  {
    rejectValue: string
  }
>(
  "auth/registerUser",
  async (props: RegisterProps, {rejectWithValue}) => {
    try {
      const response = await authApi().register(props);
      return response;
    } catch (error) {
      const msg = error as Error
      return rejectWithValue(msg.message);
    }
  }
);

export const { logOut, confirmEmail, login } = authSlice.actions;
export default authSlice.reducer;