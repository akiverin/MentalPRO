import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import imageUser01 from "@assets/images/imageUser01.png";
export type UserRole = "client" | "admin";

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  organizationID?: number;
  vkID?: string;
  yandexID?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

const initialState: User = {
  id: 1,
  fullName: "Анна Смирнова",
  email: "smirnovanna997@kiver.net",
  role: "client",
  organizationID: 3,
  vkID: "vk_anna_smirnova_0021442",
  yandexID: "ya_ansmir249323f34e24",
  profileImage: imageUser01,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<Partial<User>>) {
      return {
        ...state,
        ...action.payload,
        updatedAt: new Date().toISOString(),
      };
    },
    logoutUser() {
      return initialState;
    },
  },
});

export const { updateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
