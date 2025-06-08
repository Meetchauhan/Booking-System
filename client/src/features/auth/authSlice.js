import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/auth";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
};


export const registerUser = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try {
        await axios.post(`${API}/register`, user);
        return true;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const loginUser = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        const res = await axios.post(`${API}/login`, credentials);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error || action.payload;
            })
            .addCase(loginUser.pending, (state) => { state.loading = true })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.token;
                state.error = null;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })

    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
