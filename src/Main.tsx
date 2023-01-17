import React from "react";
import Form from "components/Form";
import Map from "components/Map";
import L from 'leaflet';
import './Main.css';

export const mapRefContext = React.createContext({} as {
    mapRef: React.MutableRefObject<L.Map>,
});

interface Props {
    phase: string,
    setPhase: React.Dispatch<React.SetStateAction<string>>,
};

function Main({
    phase,
    setPhase,
}: Props) {
    const mapRef = React.useRef() as React.MutableRefObject<L.Map>;

    return (
        <mapRefContext.Provider value={{ mapRef }}>
            <div className="main-area">
                <Form phase={phase} setPhase={setPhase} />
                <Map mapRef={mapRef} />
            </div>
        </mapRefContext.Provider>
    );
}

export default Main;
