import './forms.css';

function SecondForm() {
    return (
        <form id="secondForm" className="the-form" onSubmit={() => false}>
            <fieldset>
                <legend>やっぱりやめる</legend>
                <button id="editRoute">経路を再編集する</button>
            </fieldset>
            <fieldset>
                <legend>経路を実行する</legend>
                <button id="executeRoute">実行する</button>
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
    )
}

export default SecondForm;
