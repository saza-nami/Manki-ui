import React from 'react';
import * as App from 'App';
import * as Main from 'Main';
import Swal from 'sweetalert2';
import * as Manki from 'api/manki';
import * as Form from 'components/Form';
import * as FirstForm from './FirstForm';
import generateIcon from 'util/icon';
import L from 'leaflet';
import './forms.css';

interface Props {
    setPhase: React.Dispatch<React.SetStateAction<string>>,
};

function SecondForm({
    setPhase,
}: Props) {
    const userId = React.useContext(App.userIdContext).userId as Manki.UserId;
    const map = React.useContext(Main.mapRefContext).mapRef.current;
    const routeInfo = React.useContext(Form.phaseContext).shareRef.current as FirstForm.RouteInfo;
    const markers = [] as L.Marker[];
    let routeLine = L.polyline([]) as L.Polyline;

    function cleanUp() {
        markers.forEach(marker => marker.removeFrom(map));
        routeLine.removeFrom(map);
    }

    function editRoute() {
        cleanUp();
        setPhase('1');
    }

    const executeRoute: React.MouseEventHandler<HTMLButtonElement> = async function (e) {
        const target = e.target as HTMLButtonElement;
        target.disabled = true;
        const result = await Manki.execRoute(userId, routeInfo.route, routeInfo.junkai);
        target.disabled = false;
        if (result instanceof Error) {
            Swal.fire({
                titleText: '経路の実行に失敗しました',
                text: result.message,
                icon: 'error',
            });
            return false;
        }
        cleanUp();
        setPhase('3');
    }

    function showRoute() {
        routeInfo.route.forEach((subRoute, i) => {
            const icon = generateIcon('blue', String(i+1));
            const marker = L.marker(subRoute[0], { icon });
            marker.addTo(map);
            markers.push(marker);
        });
        if (!routeInfo.junkai) {
            const icon = generateIcon('blue', String(routeInfo.route.length+1));
            const marker = L.marker(routeInfo.route.at(-1)?.at(-1) as Manki.Position, { icon });
            marker.addTo(map);
            markers.push(marker);
        }
        routeLine = L.polyline(routeInfo.route, { weight: 10, color: 'green' });
        routeLine.addTo(map);
    }

    const saveRoute:React.MouseEventHandler<HTMLButtonElement> = async function (e) {
        const routeNameElem = document.getElementById('routeName') as HTMLInputElement;
        const routeName = routeNameElem.value;
        if (routeName === '') {
            Swal.fire({
                titleText: 'エラー',
                text: '経路の名前を入力してください',
                icon: 'error',
            });
            return false;
        }
        const target = e.target as HTMLButtonElement;
        target.disabled = true;
        const result = await Manki.saveRoute(userId, routeName, routeInfo.route, routeInfo.junkai);
        target.disabled = false;
        if (result instanceof Error) {
            Swal.fire({
                titleText: '経路の保存に失敗しました',
                text: result.message,
                icon: 'error',
            });
            return false;
        }
        Swal.fire({
            titleText: '経路を保存しました',
            text: routeName + 'という名前で経路を保存しました。',
            icon: 'success',
        });
    }

    const didLogRef = React.useRef(false);
    React.useEffect(() => {
        if (!didLogRef.current) {
            didLogRef.current = true;
            showRoute();
        }
    }, []);

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
                <button onClick={saveRoute}>保存する</button>
            </fieldset>
        </form>
    );
}

export default SecondForm;
