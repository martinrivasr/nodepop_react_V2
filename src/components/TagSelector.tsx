import React, { useEffect, useState } from "react";
import { getTags } from "../services/api";

interface TagSelectorProps{
    selectedTags:string[];
    onChange: (tags: string[]) => void
}

const TagSelector: React.FC<TagSelectorProps> =({ selectedTags, onChange}) =>{
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

    const handleTagChange = (tag:string) =>{
        const updatedTags = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        :[...selectedTags, tag];
        onChange(updatedTags);
    };
    
    return(
        <div>
            {tagList.map((tag) =>(
                <label key={tag} className="me-3">
                    <input 
                    type="checkbox" 
                    value={tag} 
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)} 
                    />{" "}
                    {tag}
                </label>
            ))}
        </div>
    )
};

export default TagSelector;