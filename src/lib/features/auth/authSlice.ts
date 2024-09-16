import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type AuthStateType = "authenticated" | "unauthenticated";

export interface AuthState {
  user?: any;
  authState: AuthStateType;

  loading?: boolean;
  error?: string;
}

export const initialState: AuthState = {
  authState: "unauthenticated",
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: any; state: AuthStateType } | undefined>
    ) => {
      state.loading = false;
      if (!action.payload) {
        state.user = null;
        state.authState = "unauthenticated";
        return;
      }

      const { user, state: authState } = action.payload;

      state.user = user;
      state.authState = authState;
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectTemp = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;
