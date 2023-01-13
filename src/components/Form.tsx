import React from "react";
import FirstForm from "./forms/FirstForm";
import SecondForm from "./forms/SecondForm";
import ThirdForm from "./forms/ThirdForm";

interface Props {
    phase: string,
    setPhase: React.Dispatch<React.SetStateAction<string>>,
};

function Form({
    phase,
    setPhase,
}: Props) {
    switch (phase) {
        case '0':
            return (
                <React.Fragment />
            );
        case '1':
            return (
                <FirstForm setPhase={setPhase} />
            );
        case '2':
            return (
                <SecondForm setPhase={setPhase} />
            );
        case '3':
            return (
                <ThirdForm setPhase={setPhase} />
            );
        default:
            return (
                <React.Fragment />
            );
    }
}

export default Form;
