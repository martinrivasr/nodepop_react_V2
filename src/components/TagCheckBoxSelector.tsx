import React  from "react";
import useTags   from "../hooks/useTagsFromRedux"

interface TagCheckBoxSelectorProps{
    selectedTags:string[];
    onChange: (tags: string[]) => void
}

const TagCheckBoxSelector: React.FC<TagCheckBoxSelectorProps> =({ selectedTags, onChange}) =>{
    const tagList = useTags()
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

export default TagCheckBoxSelector;