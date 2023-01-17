import React from "react";
import FirstForm from "./forms/FirstForm";
import SecondForm from "./forms/SecondForm";
import ThirdForm from "./forms/ThirdForm";

const share: any = undefined;

export const phaseContext = React.createContext({} as {
    shareRef: React.MutableRefObject<any>,
});

interface Props {
    phase: string,
    setPhase: React.Dispatch<React.SetStateAction<string>>,
};

function Form({
    phase,
    setPhase,
}: Props) {
    const shareRef = React.useRef(share);
    const phaseTab = {
        '0': <React.Fragment />,
        '1': <FirstForm setPhase={setPhase} />,
        '2': <SecondForm setPhase={setPhase} />,
        '3': <ThirdForm setPhase={setPhase} />,
    } as { [key: string]: JSX.Element };

    return (
        <phaseContext.Provider value={{ shareRef }}>
            { phaseTab[phase] || <React.Fragment /> }
        </phaseContext.Provider>
    );
}

export default Form;
