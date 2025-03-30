import { RootState } from ".";
import { createSelector } from "reselect";

export const getIslogged = (state:RootState) => state.auth

export const getUi = (state:RootState) => state.ui

export const getAdvertsState = (state: RootState) => state.adverts;

export const getTagsState = (state: RootState) => state.tags;

export const getadvertsSelector = createSelector(
    [getAdvertsState],
    (advertsState) => advertsState.data ?? []
);

export const getTagsSelector = createSelector(
    [getTagsState],
    (tagsState) => tagsState.data ?? []
);

export const getAdvert = (advertId?: string ) => (state:RootState) =>
    state.adverts.data?.find((advert) => advert.id === advertId)