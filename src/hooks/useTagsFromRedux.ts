import { useEffect, useState } from "react";
import { getTags } from "../services/api";
import { useAppDispatch, useAppSelector } from "../store";
import { getTagsSelector } from "../store/selectors";
import { tagsLoaded as loadTagsThunk  } from "../store/actions";

export default function useTags() {

      const tagList = useAppSelector(getTagsSelector);
     
      const dispatch = useAppDispatch();
    
      useEffect(() => {
        
        dispatch(loadTagsThunk());
    }, [dispatch]); 

    return tagList
}

