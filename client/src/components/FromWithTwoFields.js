import React from "react";

export default function FormWithTwoFields(props){
    const [firstData, setFirstData] = React.useState();
    const [secondData, setSecondData] = React.useState();

    const inputType = props.inputType;
    const secondInputType = props.secondInputType;

    const handleChange = (event) => {
        const value  = event.target.value;
        setFirstData(value);
    };

    const handleChangeSecond = (event) => {
        const value  = event.target.value;
        setSecondData(value);
    };

    const HandleSubmit = (event) => {
        event.preventDefault();
        props.handler({
            firstInput: firstData,
            secondInput:secondData
        });
    }

    return(
        <div className="control-panel-element-ui">
            <form onSubmit={HandleSubmit}>
                <label>{props.label}</label>
                <div>
                    <input className="form-input-ui" type={inputType} name="formInput" value={firstData} onChange={handleChange} required/>
                    <input className="form-input-ui" type={secondInputType} name="formInput" value={secondData} onChange={handleChangeSecond} required/>
                    <input className="form-input-ui" type="submit" value={props.submitValue}/>
                </div>
            </form>
        </div>
    );
}