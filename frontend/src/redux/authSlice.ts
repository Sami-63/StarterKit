import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    name: string;
    username: string;
    email: string;
    role: string;
    is_verified: boolean;
}

interface AuthState {
    token: string | null;
    user: User | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
};

interface SignInPayload {
    token: string;
    user: User;
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<SignInPayload>) => {
            console.log("user is signed in from authSlice");
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        signOut: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
