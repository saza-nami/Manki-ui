import React from "react";
import Form from "components/Form";
import Map from "components/Map";
import './Main.css';

interface Props {
    phase: string,
    setPhase: React.Dispatch<React.SetStateAction<string>>,
};

function Main({
    phase,
    setPhase,
}: Props) {
    return (
        //フォームと地図がある
        <div className="main-area">
            <Form phase={phase} setPhase={setPhase} />
            <Map />
        </div>
    );
}

export default Main;
