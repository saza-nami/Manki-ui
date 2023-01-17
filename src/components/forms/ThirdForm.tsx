import React from 'react';
import * as App from 'App';
import * as Main from 'Main';
import * as Manki from 'api/manki';
import Swal from 'sweetalert2';
import generateIcon from 'util/icon';
import L from 'leaflet';
import './forms.css';

interface Props {
    setPhase: React.Dispatch<React.SetStateAction<string>>,
};

function ThirdForm({
    setPhase,
}: Props) {
    const userId = React.useContext(App.userIdContext).userId as Manki.UserId;
    const map = React.useContext(Main.mapRefContext).mapRef.current;
    const markers = [] as L.Marker[];
    let routeLine = L.polyline([]) as L.Polyline;
    let arrivalNotified = false;
    let timerId = undefined as NodeJS.Timeout | undefined;
    let carMarker = undefined as L.Marker | undefined;
    let canceled = false;

    function cancelRoute() {
        canceled = true;
        cleanUp();
        setPhase('1');
    }

    function cleanUp() {
        markers.forEach(marker => marker.removeFrom(map));
        if (carMarker)
            carMarker.removeFrom(map);
        routeLine.removeFrom(map);
        if (timerId !== undefined)
            clearTimeout(timerId);
    }

    async function update() {
        const result = await Manki.carStat(userId);
        if (result instanceof Error) {
            Swal.fire({
                titleText: 'エラー',
                text: result.message,
                icon: 'error',
            });
            timerId = undefined;
            return false;
        }
        if (canceled)
            return false;
        cleanUp();
        if (result.progress) {
            result.progress.stops.forEach((position, i, stops) => {
                if (stops.length !== i + 1) {
                    const icon = generateIcon('blue', String(i+1));
                    const marker = L.marker(position, { icon });
                    marker.addTo(map);
                    markers.push(marker);
                }
            });
            routeLine = L.polyline(result.progress.route, { weight: 10, color: 'green' });
            routeLine.addTo(map);
            const nextStopElem = document.getElementById('nextStop') as HTMLButtonElement;
            nextStopElem.disabled = !result.progress.arrival;
            if (result.progress.finish)
                nextStopElem.disabled = true;
            if (result.progress.arrival && !arrivalNotified) {
                arrivalNotified = true;
                Swal.fire({
                    titleText: '停留所に到着しました',
                    text: '次の停留所に移動するには「次の停留所へ移動する」ボタンを押してください。',
                    icon: 'info',
                });
            }
        }
        if (result.car) {
            if (carMarker) {
                carMarker.setLatLng(result.car.location);
            } else {
                const icon = generateIcon('cyan', '🚗');
                carMarker = L.marker(result.car.location, { icon });
            }
            carMarker.bindPopup(`バッテリー残量: ${result.car.battery}`);
            carMarker.addTo(map);
            if (!result.car.status) {
                Swal.fire({
                    titleText: 'エラー',
                    text: '車に異常が発生しました。操作は続行できません。',
                    icon: 'error',
                });
                timerId = undefined;
                return false;
            }
        }
        timerId = setTimeout(update, 1000);
    }

    async function nextStop() {
        const confirm = await Swal.fire({
            titleText: '確認',
            text: '車を次の停留所に進ませますか？',
            icon: 'question',
        });
        if (!confirm.isConfirmed)
            return false; // Nothing to do
        const result = await Manki.proceedRoute(userId);
        if (result instanceof Error) {
            Swal.fire({
                titleText: '車を進ませることができません',
                text: result.message,
                icon: 'error',
            });
            return false;
        }
        arrivalNotified = false;
        const nextStopElem = document.getElementById('nextStop') as HTMLButtonElement;
        nextStopElem.disabled = true;
    }

    const didLogRef = React.useRef(false);
    React.useEffect(() => {
        if (!didLogRef.current) {
            didLogRef.current = true;
            update();
        }
    }, []);

    return (
        <form id="thirdForm" className="the-form" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
                <legend>経路実行を制御する</legend>
                <button id="cancelRoute" onClick={cancelRoute}>経路実行をキャンセルする</button>
                <button id="nextStop" onClick={nextStop} disabled>次の停留所へ移動する</button>
            </fieldset>
        </form>
    );
}

export default ThirdForm;
