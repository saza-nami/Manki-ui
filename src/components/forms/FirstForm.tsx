import React from 'react';
import './forms.css';

interface Props {
    setPhase: React.Dispatch<React.SetStateAction<string>>,
};

function FirstForm({
    setPhase,
}: Props) {
    function generateRoute() {
        setPhase('2');
    }
    
    return (
        <form id="firstForm" className="the-form" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
                <legend>新規ルート作成</legend>
                <label>
                    <input type="radio" name="mode" value="stop" />
                    停留所
                </label>
                <label>
                    <input type="radio" name="mode" value="thru" />
                    中継点
                </label>
                <button id="generateRoute" onClick={generateRoute}>経路探索</button>
                <label>
                    <input type="checkbox" id="patrol" value="patrol" />
                    巡回経路
                </label>
            </fieldset>
            <fieldset>
                <legend>保存済み経路</legend>
                <label>
                    経路名:
                    <select id="routeName">
                        <option selected>--- 選択してください ---</option>
                    </select>
                </label>
                <button id="fetchRoute">呼び出す</button>
            </fieldset>
        </form>
    );
}

export default FirstForm;
