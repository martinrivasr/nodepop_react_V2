import { RootState } from ".";
import { createSelector } from "reselect";

export const getIslogged = (state:RootState) => state.auth

export const getUi = (state:RootState) => state.ui

export const getAdvertsState = (state: RootState) => state.adverts;

export const getadvertsSelector = createSelector(
    [getAdvertsState],
    (advertsState) => advertsState.data ?? []
);