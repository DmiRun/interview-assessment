import React from "react";

export default function FormWithSingleField(props){
    const [formData, setFormData] = React.useState();
    const inputType = props.inputType;
    const handleChange = (event) => {
        const value  = event.target.value;
        setFormData(value);
      };

    const HandleSubmit = (event) => {
        event.preventDefault();
        props.handler(formData);
    }
    return(
        <div className="control-panel-element-ui">
            <form onSubmit={HandleSubmit}>
                <label>{props.label}</label>
                <div>
                    <input className="form-input-ui" type={inputType} name="formInput" value={formData} onChange={handleChange} required/>
                    <input className="form-input-ui" type="submit" value={props.submitValue}/>
                </div>
            </form>
        </div>
    );
}