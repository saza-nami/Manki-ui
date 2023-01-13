import React from "react";
import FirstForm from "./forms/FirstForm";
import SecondForm from "./forms/SecondForm";
import ThirdForm from "./forms/ThirdForm";

function Form() {
    return (
        <React.Fragment>
            <FirstForm />
            <SecondForm />
            <ThirdForm />
        </React.Fragment>
    );
}

export default Form;
