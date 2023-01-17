import React from 'react';
import * as App from 'App';
import * as Main from 'Main';
import * as Manki from 'api/manki';
import * as Form from 'components/Form';
import * as FirstForm from './FirstForm';
import generateIcon from 'util/icon';
import L, { map } from 'leaflet';
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

    function editRoute() {
        setPhase('1');
    }

    function executeRoute() {
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
                <button id="saveRoute">保存する</button>
            </fieldset>
        </form>
    );
}

export default SecondForm;
