import React from 'react';
import './forms.css';

interface Props {
    setPhase: React.Dispatch<React.SetStateAction<string>>,
};

function SecondForm({
    setPhase,
}: Props) {
    function editRoute() {
        setPhase('1');
    }

    function executeRoute() {
        setPhase('3');
    }

    return (
        <form id="secondForm" className="the-form" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
                <legend>やっぱりやめる</legend>
                <button id="editRoute" onClick={editRoute}>経路を再編集する</button>
            </fieldset>
            <fieldset>
                <legend>経路を実行する</legend>
                <button id="executeRoute" onClick={executeRoute}>実行する</button>
            </fieldset>
            <fieldset>
                <legend>経路を保存する</legend>
                <label>
                    保存名:
                    <input type="text" id="routeName" />
                </label>
                <button id="saveRoute">保存する</button>
            </fieldset>
        </form>
    );
}

export default SecondForm;
