import type { ComponentProps } from "react";

interface Props extends ComponentProps<"input">{
    label:String;
}

const FormField = ({ label, ...props }:Props ) =>{
    return(
        <div className="mb-3">
            <label className="form-label">
                <span>{label}</span>
                <input   className="form-control" autoComplete="off" {...props} />
            </label>
        </div>
    )
}

export default FormField