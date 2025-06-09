import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance, protectedInstance } from "../../../services/instance";

const initialState = {
  // user
  user: null,

  // userId
  userId: null,

  // user register
  userRegisterStatus: "idle",
  userRegisterError: null,

  // test
  status: "idle",
  error: null,
  message: null,

  // user login status
  userLoginStatus: "idle",
  userLoginError: null,
  isAuthorized: false,

  // user email verification
  isUserEmailVerified: false,
  userEmailVerificationStatus: "idle",
  userEmailVerificationError: null,

  // user forgot password
  userPasswordResetStatus: "idle",
  userPasswordResetError: null,

  // user password reset otp status
  userPasswordResetOtpStatus: "idle",
  userPasswordResetOtpError: null,

  // user password reset
  userPasswordSetStatus: "idle",
  userPasswordSetError: null,
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/users/register", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const verifyAccount = createAsyncThunk(
  "users/verifyAccount",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/users/verify/${userId}`, otp);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "users/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await instance.post("/users/login", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await protectedInstance.get("/users/me");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error for getting user"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      await protectedInstance.get("users/logout");
      return "Logout successful";
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
);

// user's forgot password request
export const forgotPassword = createAsyncThunk(
  "users/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await instance.post("/users/forgot-password", email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// user password setting
export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async (resetData, { rejectWithValue }) => {
    try {
      const response = await instance.put("/users/password/reset", resetData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = null;
    },
    resetPasswordSet(state) {
      state.userPasswordSetStatus = "idle";
      state.userPasswordSetError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.userRegisterStatus = "loading";
        state.userRegisterError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userRegisterStatus = "succeeded";
        state.userRegisterError = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.userRegisterStatus = "failed";
        state.userRegisterError = action.payload;
      })
      // email verification
      .addCase(verifyAccount.pending, (state, action) => {
        state.userEmailVerificationStatus = "loading";
        state.userEmailVerificationError = null;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.userEmailVerificationStatus = "succeeded";
        state.isUserEmailVerified = true;
        state.user = action.payload;
        state.userEmailVerificationError = null;
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.userEmailVerificationStatus = "failed";
        state.userEmailVerificationError = action.payload;
      })
      .addCase(userLogin.pending, (state, action) => {
        state.userLoginStatus = "loading";
        state.userLoginError = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        if (action.payload.userId) {
          state.userId = action.payload.userId;
        } else {
          state.userLoginStatus = "succeeded";
          state.user = action.payload;
          state.userLoginError = null;
          state.isAuthorized = true;
          state.isUserEmailVerified = true;
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.userLoginStatus = "failed";
        state.userLoginError = action.payload;
      })
      .addCase(getUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.userPasswordResetStatus = "loading";
        state.userPasswordResetError = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.userPasswordResetStatus = "succeeded";
        state.userPasswordResetError = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.userPasswordResetStatus = "failed";
        state.userPasswordResetError = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.userPasswordSetStatus = "loading";
        state.userPasswordSetError = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.userPasswordSetStatus = "succeeded";
        state.userPasswordSetError = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.userPasswordSetStatus = "failed";
        state.userPasswordSetError = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { clearMessage, resetPasswordSet } = userSlice.actions;

export const selectUserStatus = (state) => state.users.status;
export const selectUserError = (state) => state.users.error;
export const selectUser = (state) => state.users.user;
export const selectUserMessage = (state) => state.users.message;

// user register selector
export const selectUserRegisterStatus = (state) =>
  state.users.userRegisterStatus;
export const selectUserRegisterError = (state) => state.users.userRegisterError;

// user login selector
export const selectUserLoginStatus = (state) => state.users.userLoginStatus;
export const selectUserLoginError = (state) => state.users.userLoginError;

// user id
export const selectUserId = (state) => state.users.userId;

// user email verification status
export const selectUserEmailVerificationStatus = (state) =>
  state.users.userEmailVerificationStatus;
export const selectUserEmailVerificationError = (state) =>
  state.users.userEmailVerificationError;

export const selectIsUserEmailVerified = (state) =>
  state.users.isUserEmailVerified;

export const selectIsAuthorized = (state) => state.users.isAuthorized;

// user forgot password OTP status
export const selectUserPasswordResetStatus = (state) =>
  state.users.userPasswordResetStatus;
export const selectUserPasswordResetError = (state) =>
  state.users.userPasswordResetError;

// user password reset selectors
export const selectUserPasswordSetStatus = (state) =>
  state.users.userPasswordSetStatus;
export const selectUserPasswordSetError = (state) =>
  state.users.userPasswordSetError;
