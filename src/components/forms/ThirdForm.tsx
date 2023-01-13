import './forms.css';

function ThirdForm() {
    return (
        <form id="thirdForm" className="the-form" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
                <legend>経路実行を制御する</legend>
                <button id="cancelRoute">経路実行をキャンセルする</button>
                <button id="nextStop">次の停留所へ移動する</button>
            </fieldset>
        </form>
    );
}

export default ThirdForm;
