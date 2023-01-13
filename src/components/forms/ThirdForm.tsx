import React from 'react';
import './forms.css';

interface Props {
    setPhase: React.Dispatch<React.SetStateAction<string>>,
};

function ThirdForm({
    setPhase,
}: Props) {
    function cancelRoute() {
        setPhase('1');
    }

    return (
        <form id="thirdForm" className="the-form" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
                <legend>経路実行を制御する</legend>
                <button id="cancelRoute" onClick={cancelRoute}>経路実行をキャンセルする</button>
                <button id="nextStop">次の停留所へ移動する</button>
            </fieldset>
        </form>
    );
}

export default ThirdForm;
