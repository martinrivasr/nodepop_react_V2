import { RootState } from ".";

export const getIslogged = (state:RootState) => state.auth

export const getUi = (state:RootState) => state.ui