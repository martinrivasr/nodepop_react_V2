import { useEffect, useState } from "react";
import { getTags } from "../services/api";

export default function useTags() {
    const [tagList, setTagList] = useState<string[]>([]);

        useEffect(() =>{
            const fetchTags = async () =>{
                try{
                    const tags = await getTags();
                    setTagList(tags)
                }catch(error){
                    console.log("Error al cargar los tags: ", error);
                }
            }
            fetchTags();
        }, []);

    return tagList
}

