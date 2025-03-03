/** @module Manki */

import * as Api from './api';

export type { UserId } from './api';

/**
 * 新しいユーザ識別子を発行する。
 *
 * @return 成功したときはユーザ識別子、
 *         さもなければ UI に表示できるメッセージを含むエラーインスタンス
 */
export async function createUser() {
    try {
        const result = await Api.createUser();
        if (!result.succeeded)
            switch (result.reason) {
                case 'Please allow some tims and access again.':
                    return new Error('API 呼び出しの回数制限を超えました。');
                case 'User creation failed.':
                    return new Error('API サーバでエラーが発生しました。');
                case 'Users exceeded the limit.':
                    return new Error('システムが満員状態です。');
                default:
                    return new Error('API の呼び出しに失敗しました。');
                }
        return result.userId as Api.UserId;
    } catch (err) {
        console.error('createUser:', err);
        return new Error('API サーバとの通信に失敗しました。');
    }
}

/**
 * ユーザの手続きを終了する。
 *
 * @return 成功したときは true、
 *         さもなければ UI に表示できるメッセージを含むエラーインスタンス
 */
export async function terminate(userId: Api.UserId) {
    try {
        const result = await Api.terminate(userId);
        if (!result.succeeded)
            switch (result.reason) {
                case 'Invalid request.':
                    return new Error('不正な API リクエストが発生しました。');
                case 'Illegal user.':
                    return new Error('ユーザ識別子は有効ではありません。');
                default:
                    return new Error('API の呼び出しに失敗しました。');
            }
        return true;
    } catch (err) {
        console.error('terminate:', err);
        return new Error('API サーバとの通信に失敗しました。');
    }
}

/**
 * ユーザに紐付けられている経路の実行をキャンセルする。
 *
 * @param userId ユーザ識別子
 * @return 成功したときは true、
 *         さもなければ UI に表示できるメッセージを含むエラーインスタンス
 */
export async function endRoute(userId: Api.UserId) {
    try {
        const result = await Api.endRoute(userId);
        if (!result.succeeded)
            switch (result.reason) {
                case 'Invalid request.':
                    return new Error('不正な API リクエストが発生しました。');
                case 'Illegal user.':
                    return new Error('ユーザ識別子は有効ではありません。');
                default:
                    return new Error('API の呼び出しに失敗しました。');
            }
        return true;
    } catch (err) {
        console.error('endRoute:', err);
        return new Error('API サーバとの通信に失敗しました。');
    }
}

/**
 * 停留所に停まっている車を次の停留所に進ませる。
 *
 * @param userId ユーザ識別子
 * @return 成功したときは true、
 *         さもなければ UI に表示できるメッセージを含むエラーインスタンス
 */
export async function proceedRoute(userId: Api.UserId) {
    try {
        const result = await Api.proceedRoute(userId);
        if (!result.succeeded)
            switch (result.reason) {
                case 'Invalid request.':
                    return new Error('不正な API リクエストが発生しました。');
                case 'Illegal user.':
                    return new Error('ユーザ識別子は有効ではありません。');
                case 'The car you are using is not at the stop.':
                    return new Error('利用中の車は停留所に到着していません。');
                default:
                    return new Error('API の呼び出しに失敗しました。');
            }
        return true;
    } catch (err) {
        console.error('proceedRoute:', err);
        return new Error('API サーバとの通信に失敗しました。');
    }
}

/**
 * ユーザが新しい経路を実行可能か調べる。
 *
 * @param userId ユーザ識別子
 * @return 成功したとき（実行可能なとき）は true、
 *         さもなければ UI に表示できるメッセージを含むエラーインスタンス
 */
export async function isAcceptable(userId: Api.UserId) {
    try {
        const result = await Api.isAcceptable(userId);
        if (!result.succeeded) {
            const reason = result.reason?.replace(/\..*/, '.'); // 最初の一文で分岐
            switch (reason) {
                case 'Invalid request.':
                    return new Error('不正な API リクエストが発生しました。');
                case 'Illegal user.':
                    return new Error('ユーザ識別子は有効ではありません。');
                case 'A probrem has occurred with the car being used.':
                    return new Error('利用中の車に問題が発生しました。');
                case 'There is a problem with the system status.':
                    return new Error('システムに問題が発生しました。');
                case 'A new route cannot be created because the instruction is being executed.':
                    return new Error('経路を実行している間は別の経路を実行できません。');
                case 'A new route cannot ben created because a car assignment is in progress.':
                    return new Error('車の割当て処理を実行中は別の経路を実行できません。');
                default:
                    return new Error('API の呼び出しに失敗しました。');
            }
        }
        return true;
    } catch (err) {
        console.error('isAcceptable:', err);
        return new Error('API サーバとの通信に失敗しました。');
    }
}

/**
 * routeName が返す保存済み経路名情報の型
 */
export type { PassableName } from './api.types';

/**
 * 全ての保存済み経路名情報を取得する。
 *
 * @param userId ユーザ識別子
 * @return 成功したときは経路名情報の配列、
 *         さもなければ UI に表示できるメッセージを含むエラーインスタンス
 */
export async function routeName(userId: Api.UserId) {
    try {
        const result = await Api.routeName(userId);
        if (!result.succeeded)
            switch (result.reason) {
                case 'Invalid request.':
                    return new Error('不正な API リクエストが発生しました。');
                case 'Illegal user.':
                    return new Error('ユーザ識別子は有効ではありません。');
                default:
                    return new Error('API の呼び出しに失敗しました。');
            }
        return result.passableNames as Api.PassableName[];
    } catch (err) {
        console.error('routeName:', err);
        return new Error('API サーバとの通信に失敗しました。');
    }
}

export type { Route, SubRoute, Position } from './api';

/**
 * reqRoute が返す保存済み経路情報の型
 */
export interface routeInfo {
    /** 経路 */
    route: Api.Route;
    /** 経路に含まれる停留所 */
    dest: Api.Position[];
    /** 巡回経路であるときに真 */
    junkai: boolean;
}

/**
 * 保存済みの経路を取得する。
 *
 * @param userId ユーザ識別子
 * @param routeName 経路名
 * @return 成功したときは保存済みの経路の情報、
 *         さもなければ UI に表示できるメッセージを含むエラーインスタンス
 */
export async function reqRoute(userId: Api.UserId, routeName: string) {
    try {
        const result = await Api.reqRoute(userId, { routeName });
        if (!result.succeeded)
            switch (result.reason) {
                case 'Invalid request.':
                    return new Error('不正な API リクエストが発生しました。');
                case 'Illegal user.':
                    return new Error('ユーザ識別子は有効ではありません。');
                case 'There is no route with that name.':
                    return new Error('そのような名前の経路はありません。');
                default:
                    return new Error('API の呼び出しに失敗しました。');
            }
        return {
            route: result.route as Api.Route,
            dest: result.dest as Api.Position[],
            junkai: result.junkai as boolean,
        } as routeInfo;
    } catch (err) {
        console.error('reqRoute:', err);
        return new Error('API サーバとの通信に失敗しました。');
    }
}

/**
 * reqPassable が返す通行可能領域情報の型
 */
export type { PassableInfo } from './api';

/**
 * 通行可能領域情報を取得する。
 *
 * @param userId
 * @return 成功したときは通行可能領域情報の配列、
 *         さもなければ UI に表示できるメッセージを含むエラーインスタンス
 */
export async function reqPassable(userId: Api.UserId) {
    try {
        const result = await Api.reqPassable(userId);
        if (!result.succeeded)
            switch (result.reason) {
                case 'Invalid request.':
                    return new Error('不正な API リクエストが発生しました。');
                case 'Illegal user.':
                    return new Error('ユーザ識別子は有効ではありません。');
                default:
                    return new Error('API の呼び出しに失敗しました。');
            }
        return result.passableInfo as Api.PassableInfo[];
    } catch (err) {
        console.error('reqPassable:', err);
        return new Error('API サーバとの通信に失敗しました。');
    }
}

/**
 * ルート（停留所-停留所の道程）の集まりから経路を作成する。
 *
 * @param userId ユーザ識別子
 * @param subRoutes ルートの集まり
 * @return 成功したときは生成された経路、
 *         さもなければ UI に表示できるメッセージを含むエラーインスタンス
 */
export async function generateRoute(userId: Api.UserId, subRoutes: Api.SubRoute[]) {
    try {
        const promises = [] as Promise<Api.AstarResult>[];
        subRoutes.forEach(route => {
            promises.push(Api.astar(userId, { data: route }))
        });
        const results = await Promise.all(promises);
        try {
            return results.reduce((route, current) => {
                if (!current.succeeded)
                    throw current.reason;
                route.push(current.route as Api.SubRoute);
                return route;
            }, [] as Api.Route);
        } catch (msg) {
            const message = (msg as string).replaceAll(/\d+/g, 'XXX');
            switch (message) {
                case 'Invalid request.':
                    return new Error('不正な API リクエストが発生しました。');
                case 'Illegal user.':
                    return new Error('ユーザ識別子は有効ではありません。');
                case 'Destination XXX is outside the passable area.':
                    return new Error('通行できない地点が含まれています。');
                case 'Destination XXX could not be reached.':
                    return new Error('到達できない地点が含まれています。');
                case 'The end point could not be reached.':
                    return new Error('目的地に到達できません。');
                default:
                    return new Error('API の呼び出しに失敗しました。');
            }
        }
    } catch (err) {
        console.error('generateRoute:', err);
        return new Error('API サーバとの通信に失敗しました。');
    }
}

/**
 * 新しい経路の実行を予約する。
 *
 * @param userId ユーザ識別子
 * @param route 実行する経路
 * @param junkai 巡回経路のとき真
 * @return 成功したときは true、
 *         さもなければ UI に表示できるメッセージを含むエラーインスタンス
 */
export async function execRoute(userId: Api.UserId, route: Api.Route, junkai: boolean) {
    try {
        const result = await Api.execRoute(userId, { data: route, junkai } as Api.ExecRouteArg);
        if (!result.succeeded)
            switch (result.reason) {
                case 'Invalid request.':
                    return new Error('不正な API リクエストが発生しました。');
                case 'Illegal user.':
                    return new Error('ユーザ識別子は有効ではありません。');
                case 'unreachable!':
                    return new Error('指定された経路は到達できません。');
                case 'Reject new order!':
                    return new Error('経路を実行している間は別の経路を実行できません。');
                default:
                    return new Error('API の呼び出しに失敗しました。');
            }
        return true;
    } catch (err) {
        console.error('execRoute:', err);
        return new Error('API サーバとの通信に失敗しました。');
    }
}

/**
 * 経路に名前を付けて保存する。
 *
 * @param userId ユーザ識別子
 * @param routeName 経路に付ける名前
 * @param route 保存する経路
 * @param junkai 巡回経路のとき真
 * @return 成功したときは true、
 *         さもなければ UI に表示できるメッセージを含むエラーインスタンス
 */
export async function saveRoute(
    userId: Api.UserId,
    routeName: string,
    route: Api.Route,
    junkai: boolean
) {
    try {
        const result = await Api.saveRoute(userId,
            { routeName, data: route, junkai } as Api.SaveRouteArg);
        if (!result.succeeded) {
            const reason = result.reason?.replace(/\..*/, '.'); // 最初の一文で分岐
            switch (reason) {
                case 'Invalid request.':
                    return new Error('不正な API リクエストが発生しました。');
                case 'Illegal user.':
                    return new Error('ユーザ識別子は有効ではありません。');
                case 'RouteNo.':
                    return new Error('到達できない地点が含まれています。');
                default:
                    return new Error('API の呼び出しに失敗しました。');
            }
        }
        return true;    // NOTE: API の返り値（経路名のオウム返し）は誰も幸せにしないので棄てる
    } catch (err) {
        console.error('saveRoute:', err);
        return new Error('API サーバとの通信に失敗しました。');
    }
}

/**
 * carStat が返す経路と車に関する情報
 */
export interface CarStat {
    /** 経路の進捗状況に関する情報 */
    progress: {
        /** 実行中の経路 */
        route: Api.Route;
        /** 実行中の経路に含まれる停留所 */
        stops: Api.Position[];
        /** 実行中の経路が巡回経路のとき真 */
        junkai: boolean;
        /** 車が停留所にいるとき真 */
        arrival: boolean;
        /** 車が目的地にいるとき真 */
        finish: boolean;
        /** 車が経路の始点に到着済のとき真 */
        arrange: boolean;
    } | null;
    /** 車に関する情報 */
    car: {
        /** 現在位置座標 */
        location: Api.Position;
        /** バッテリ残量 */
        battery: number;
        /** 正常状態であるとき真 */
        status: boolean;
    } | null;
};

/**
 * ユーザに紐付いている経路の実行状況や車の情報を取得する。
 *
 * @param userId ユーザ識別子
 * @return 成功したときは経路と車に関する情報、
 *         さもなければ UI に表示できるメッセージを含むエラーインスタンス
 */
export async function carStat(userId: Api.UserId) {
    try {
        const result = await Api.monitorCar(userId);
        if (!result.succeeded)
            switch (result.reason) {
                case 'Invalid request.':
                    return new Error('不正な API リクエストが発生しました。');
                case 'Illegal user.':
                    return new Error('ユーザ識別子は有効ではありません。');
                default:
                    return new Error('API の呼び出しに失敗しました。');
            }
        const ret = { progress: null, car: null } as CarStat;
        if (result.route)   // 経路を実行中である
            ret.progress = {
                route: result.route as Api.Route,
                stops: result.dest as Api.Position[],
                junkai: result.junkai as boolean,
                arrival: result.arrival as boolean,
                finish: result.finish as boolean,
                arrange: result.arrange as boolean,
            };
        if (result.reserve) // 車を割当て済である
            ret.car = {
                status: result.status as boolean,
                location: result.nowPoint as Api.Position,
                battery: result.battery as number,
            };
        return ret;
    } catch (err) {
        console.error('carStat:', err);
        return new Error('API サーバとの通信に失敗しました。');
    }
}
