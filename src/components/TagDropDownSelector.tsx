import React from "react";
import useTags   from "../hooks/usetags"

interface TagDropdownSelectorProps {
    selectedTags:string[];
    onChange: (tags: string[]) => void
}

const TagDropdownSelector: React.FC<TagDropdownSelectorProps > =({ selectedTags, onChange}) =>{
    const tagList = useTags()
    
    return(
          <select
              id="tag"
              name="tag"
              className="form-select"
              multiple
              value={selectedTags}
              onChange={(e) =>
                onChange(Array.from(e.target.selectedOptions, (option) => option.value))
            }
            >
             {tagList.map((tag) =>(
              <option value={tag}>{tag}</option>
             ))}
          </select>
    )
};

export default TagDropdownSelector;