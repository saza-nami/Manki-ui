import React from 'react';
import * as App from 'App';
import * as Main from 'Main';
import Swal from 'sweetalert2';
import L from 'leaflet';
import * as Manki from 'api/manki';
import generateIcon from 'util/icon';
import './forms.css';
import * as Form from 'components/Form';

export interface RouteInfo {
    route: Manki.Route,
    junkai: boolean,
};

interface RoutePoint {
    lat: number,
    lng: number,
    mode: string,
    marker: L.Marker,
};

const routePoints = [] as RoutePoint[][];

interface Props {
    setPhase: React.Dispatch<React.SetStateAction<string>>,
};

function FirstForm({
    setPhase,
}: Props) {
    const userId = React.useContext(App.userIdContext).userId as Manki.UserId;
    const map = React.useContext(Main.mapRefContext).mapRef.current;
    const passableCircles = [] as L.Circle[];
    const { shareRef } = React.useContext(Form.phaseContext);

    function next(route: Manki.Route) {
        passableCircles.forEach(circle => circle.removeFrom(map));
        passableCircles.length = 0;
        routePoints.forEach(route => route.forEach(point => point.marker.removeFrom(map)));
        map.off('click', appendPoint);
        const patrolElem = document.getElementById('patrol') as HTMLInputElement;
        const junkai = patrolElem.checked;
        shareRef.current = { route, junkai } as RouteInfo;
        setPhase('2');
    }

    // 通行可能領域取得表示
    async function reqPassable() {
        const passableInfo = await Manki.reqPassable(userId);
        if (passableInfo instanceof Error) {
            Swal.fire({
                titleText: '通行可能領域の取得に失敗しました',
                text: passableInfo.message + '通行可能領域は表示されません。',
                icon: 'error',
            });
            return;
        }
        if (passableInfo.length === 0)
            return;

        const bounds = L.latLngBounds(passableInfo[0].position, passableInfo[0].position);
        passableInfo.forEach(elem => {
            const circle = L.circle(elem.position, { radius: elem.radius });
            circle.addTo(map);
            passableCircles.push(circle);
            bounds.extend(circle.getBounds());
        });
        map.fitBounds(bounds);
    }

    // 保存済み経路の取得
    async function routeName() {
        const passableName = await Manki.routeName(userId);
        if (passableName instanceof Error) {
            Swal.fire({
                titleText: '保存済み経路の取得に失敗しました',
                text: passableName.message + '保存済み経路は利用できません。',
                icon: 'error',
            });
            return;
        }
        const routeNameElem = document.getElementById('routeName') as HTMLSelectElement;
        passableName.forEach(elem => {
            const opt = document.createElement('option');
            opt.disabled = !elem.available;
            opt.textContent = elem.routeName;
            routeNameElem.appendChild(opt);
        });
    }

    // 呼び出すボタンが押されたときの handler
    async function reqRoute() {
        const routeNameElem = document.getElementById('routeName') as HTMLSelectElement;
        const routeName = routeNameElem.value;
        const routeInfo = await Manki.reqRoute(userId, routeName);
        if (routeInfo instanceof Error) {
            Swal.fire({
                titleText: '保存済み経路の取得に失敗しました',
                text: routeInfo.message,
                icon: 'error',
            });
            return false;
        }
        next(routeInfo.route);
    }

    function iconArgs(type: string) {
        return [
            type === 'stop' ? 'blue' : 'red',
            type === 'stop' ? (routePoints.length + 1) + ''
                : routePoints.length + '-' + (routePoints.at(-1)?.length),
        ];
    }

    async function removePoint(e: L.LeafletMouseEvent) {
        const result = await Swal.fire({
            titleText: '確認',
            text: '選択した地点を削除しますか？',
            icon: 'question',
            showCancelButton: true,
        });
        if (!result.isConfirmed)
            return false; // Nothing to do
        const cat = routePoints.reduce((cat, route, i) => {
            cat.push(...route.reduce((cat, point, j, route) => {
                if (point.marker !== e.target) {
                    cat.push(point);
                } else if (i === 0 && j === 0) {
                    route.forEach(point => {
                        if (point.mode === 'thru')
                            point.marker.remove();
                    });
                    route.length = 0;
                    return [];
                }
                return cat;
            }, [] as RoutePoint[]));
            return cat;
        }, []);
        e.target.remove();
        routePoints.length = 0;
        if (cat.length === 0)
            return;
        const first = cat.shift() as RoutePoint;
        const [color, text] = iconArgs(first.mode);
        first.marker.setIcon(generateIcon(color, text));
        routePoints.push([ first ]);
        cat.forEach(point => {
            const [color, text] = iconArgs(point.mode);
            point.marker.setIcon(generateIcon(color, text));
            if (point.mode === 'stop'
                    && routePoints.at(-1)?.length !== 1
                    && routePoints.at(-1)?.at(-1)?.mode === 'stop')
                routePoints.push([]);
            routePoints.at(-1)?.push(point); 
        });
    }

    // マップをクリックしたときの処理 (ピンを立てる)
    async function appendPoint(e: L.LeafletMouseEvent) {
        const form = document.forms.namedItem('firstForm') as HTMLFormElement;
        const mode: string = form?.mode?.value;
        if (mode !== 'stop' && mode !== 'thru')
            return false; // Nothing to do
        if (mode === 'thru' && routePoints.length === 0) {
            Swal.fire({
                titleText: 'エラー',
                text: '最初の地点は停留所である必要があります。',
                icon: 'error', 
            });
            return false;
        }
        const [color, text] = iconArgs(mode);
        const icon = generateIcon(color, text);
        const marker = L.marker(e.latlng, { icon });
        marker.on('click', removePoint);
        marker.addTo(map);
        const routePoint = { ...e.latlng, mode, marker } as RoutePoint;
        switch (mode) {
            case 'stop':
                if (routePoints.length !== 0)
                    routePoints.at(-1)?.push(routePoint);
                routePoints.push([ routePoint ]);
                break;
            case 'thru':
                routePoints.at(-1)?.push(routePoint);
                break;
        }
    }

    async function searchRoute() {
        if (routePoints.length === 0) {
            Swal.fire({
                titleText: 'エラー',
                text: '一つ以上の停留所を設定する必要があります。',
                icon: 'error', 
            });
            return false;
        }
        const patrolElem = document.getElementById('patrol') as HTMLInputElement;
        const patrol = patrolElem.checked;
        if (!patrol && routePoints.at(-1)?.at(-1)?.mode !== 'stop') {
            Swal.fire({
                titleText: 'エラー',
                text: '非巡回経路の終点は停留所である必要があります。',
                icon: 'error',
            });
            return false; 
        }
        const rpData = routePoints.map(r => r.map(e => ({ ...e } as RoutePoint)));
        if (rpData.length === 1 || patrol)
            rpData.at(-1)?.push(rpData[0][0]);
        else
            void rpData.pop();
        const pointsv = [] as Manki.Position[][];
        rpData.forEach(route => {
            const temp = [] as Manki.Position[];
            route.forEach(point => temp.push({lat: point.lat, lng: point.lng}));
            pointsv.push(temp);
        });
        Swal.fire({
            titleText: 'しばらくお待ちください',
            text: '経路を探索中',
            iconHtml: '<img src="/img/jeed.gif">',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
        });
        const route = await Manki.generateRoute(userId, pointsv);
        if (route instanceof Error) {
            Swal.fire({
                titleText: 'エラー',
                text: route.message,
                icon: 'error',
            });
            return false;
        }
        Swal.close();
        next(route);
    }

    const didLogRef = React.useRef(false);
    React.useEffect(() => {
        if (!didLogRef.current) {
            didLogRef.current = true;
            reqPassable();
            routeName();
            map.on('click', appendPoint);
            routePoints.forEach(route => route.forEach(point => point.marker.addTo(map)));
        }
    }, []);

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
                <button id="generateRoute" onClick={searchRoute}>経路探索</button>
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
                <button onClick={reqRoute}>呼び出す</button>
            </fieldset>
        </form>
    );
}

export default FirstForm;
