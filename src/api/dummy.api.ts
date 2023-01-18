/** @module DummyApi */

import * as ApiTypes from "./api.types";

/**
 * 失敗したかどうかを占う
 *
 * @param prob 失敗する確率 [0, 1]
 * @return 失敗したら真
 */
function isFailed(prob: number) {
  return Math.random() < prob;
}

/**
 * 新しいユーザ識別子を発行する（ふりをする）。
 * 10% の確率で失敗し、ユーザ識別子が渡されない場合も失敗する
 * （それ以外の要因による失敗はシミュレートされない）。
 *
 * @return API の戻り値
 */
export async function createUser() {
  const result: ApiTypes.CreateUserResult = isFailed(0.1)
    ? {
        succeeded: false,
        reason: "something wrong",
      }
    : {
        succeeded: true,
        userId: "dummy" + String(Math.random()).substring(2),
      };
  return new Promise<ApiTypes.CreateUserResult>((r) =>
    setTimeout(() => r(result), Math.random() * 1000)
  );
}

/**
 * ユーザの手続きを終了する（ふりをする）。
 * 10% の確率で失敗し、ユーザ識別子が渡されない場合も失敗する
 * （それ以外の要因による失敗はシミュレートされない）。
 *
 * @param userId ユーザ識別子
 * @return API の戻り値
 */
export async function terminate(userId: ApiTypes.UserId) {
  const result: ApiTypes.TerminateResult =
    isFailed(0.1) || !userId
      ? {
          succeeded: false,
          reason: "something wrong",
        }
      : {
          succeeded: true,
        };
  return new Promise<ApiTypes.TerminateResult>((r) =>
    setTimeout(() => r(result), Math.random() * 1000)
  );
}

/**
 * ユーザに紐付けられている経路の実行をキャンセルする（フリをする）。
 * 10% の確率で失敗し、ユーザ識別子が渡されない場合も失敗する
 * （それ以外の要因による失敗はシミュレートされない）。
 *
 * @param userId ユーザ識別子
 * @return API の戻り値
 */
export async function endRoute(userId: ApiTypes.UserId) {
  const result: ApiTypes.EndRouteResult =
    isFailed(0.1) || !userId
      ? {
          succeeded: false,
          reason: "something wrong",
        }
      : {
          succeeded: true,
        };
  return new Promise<ApiTypes.EndRouteResult>((r) =>
    setTimeout(() => r(result), Math.random() * 1000)
  );
}

/**
 * 停留所に停まっている車を次の停留所に進ませる（ふりをする）。
 * 10% の確率で失敗し、ユーザ識別子が渡されない場合も失敗する
 * （それ以外の要因による失敗はシミュレートされない）。
 *
 * @param userId ユーザ識別子
 * @return API の戻り値
 */
export async function proceedRoute(userId: ApiTypes.UserId) {
  const result: ApiTypes.ProceedRouteResult =
    isFailed(0.1) || !userId
      ? {
          succeeded: false,
          reason: "something wrong",
        }
      : {
          succeeded: true,
        };
  return new Promise<ApiTypes.ProceedRouteResult>((r) =>
    setTimeout(() => r(result), Math.random() * 1000)
  );
}

/**
 * 新しい経路を実行可能か調べる（ふりをする）。
 * 10% の確率で失敗し、ユーザ識別子が渡されない場合も失敗する
 * （それ以外の要因による失敗はシミュレートされない）。
 *
 * @param userId ユーザ識別子
 * @return API の戻り値
 */
export async function isAcceptable(userId: ApiTypes.UserId) {
  const result: ApiTypes.IsAcceptableResult =
    isFailed(0.1) || !userId
      ? {
          succeeded: false,
          reason: "something wrong",
        }
      : {
          succeeded: true,
        };
  return new Promise<ApiTypes.IsAcceptableResult>((r) =>
    setTimeout(() => r(result), Math.random() * 1000)
  );
}

/**
 * 全ての保存済み経路名情報を取得する（ふりをする）。
 * 10% の確率で失敗し、ユーザ識別子が渡されない場合も失敗する
 * （それ以外の要因による失敗はシミュレートされない）。
 *
 * @param userId ユーザ識別子
 * @return API の戻り値
 */
export function routeName(userId: ApiTypes.UserId) {
  const result: ApiTypes.RouteNameResult =
    isFailed(0.1) || !userId
      ? {
          succeeded: false,
          reason: "something wrong",
        }
      : {
          succeeded: true,
          passableNames: [
            {
              routeName: "ゆめ咲線直通桜島行き",
              available: true,
            },
            {
              routeName: "完全版 Kohga 完成ルート",
              available: false,
            },
          ],
        };

  return new Promise<ApiTypes.RouteNameResult>((r) =>
    setTimeout(() => r(result), Math.random() * 1000)
  );
}

/**
 * 保存済の経路を取得する（ふりをする）。
 * 10% の確率で失敗し、ユーザ識別子が渡されない場合も失敗し、
 * ゆめ咲線直通桜島行きのみ成功する。
 *
 * @param userId ユーザ識別子
 * @param args その他の引数
 * @return API の戻り値
 */
export function reqRoute(userId: ApiTypes.UserId, args: ApiTypes.ReqRouteArg) {
  const result: ApiTypes.ReqRouteResult =
    isFailed(0.1) || !userId || args.routeName !== "ゆめ咲線直通桜島行き"
      ? {
          succeeded: false,
          reason: "something wrong",
        }
      : {
          succeeded: true,
          route: [
            [
              {
                lat: 35.65529127055111,
                lng: 139.74510669708255,
              },
              {
                lat: 35.65529127055111,
                lng: 139.74671602249148,
              },
              {
                lat: 35.658462096656926,
                lng: 139.74671602249148,
              },
              {
                lat: 35.658462096656926,
                lng: 139.74296092987063,
              },
              {
                lat: 35.65954223943891,
                lng: 139.74296092987063,
              },
            ],
            [
              {
                lat: 35.65954223943891,
                lng: 139.74296092987063,
              },
              {
                lat: 35.65954223943891,
                lng: 139.74489212036136,
              },
              {
                lat: 35.66274773844904,
                lng: 139.74489212036136,
              },
              {
                lat: 35.66274773844904,
                lng: 139.73783254623416,
              },
              {
                lat: 35.66118192062334,
                lng: 139.73783254623416,
              },
            ],
            [
              {
                lat: 35.66118192062334,
                lng: 139.73783254623416,
              },
              {
                lat: 35.66118192062334,
                lng: 139.73875522613528,
              },
              {
                lat: 35.664840285079194,
                lng: 139.73875522613528,
              },
              {
                lat: 35.664840285079194,
                lng: 139.7322750091553,
              },
              {
                lat: 35.66313306919273,
                lng: 139.7322750091553,
              },
            ],
          ],
          dest: [
            {
              lat: 35.65529127055111,
              lng: 139.74510669708255,
            },
            {
              lat: 35.65954223943891,
              lng: 139.74296092987063,
            },
            {
              lat: 35.66118192062334,
              lng: 139.73783254623416,
            },
            {
              lat: 35.66313306919273,
              lng: 139.7322750091553,
            },
          ],
          junkai: false,
        };
  return new Promise<ApiTypes.ReqRouteResult>((r) =>
    setTimeout(() => r(result), Math.random() * 1000)
  );
}

/**
 * 通行可能領域情報を取得する（ふりをする）。
 * 10% の確率で失敗し、ユーザ識別子が渡されない場合も失敗する
 * （それ以外の要因による失敗はシミュレートされない）。
 *
 * @param userId ユーザ識別子
 * @return API の戻り値
 */
export function reqPassable(userId: ApiTypes.UserId) {
  const result: ApiTypes.ReqPassableResult =
    isFailed(0.1) || !userId
      ? {
          succeeded: false,
          reason: "something wrong",
        }
      : {
          succeeded: true,
          passableInfo: [
            {
              position: {
                lat: 35.65867636972139,
                lng: 139.74541680454988,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.658595126386274,
                lng: 139.74651753902438,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.65942325923373,
                lng: 139.744827747345,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.65979809548868,
                lng: 139.7438192367554,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.65952786487723,
                lng: 139.74276244640353,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.65970656586788,
                lng: 139.74167346954349,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.66008575932827,
                lng: 139.74067568778995,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.66048238504405,
                lng: 139.7431004047394,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.661271272095114,
                lng: 139.74359393119815,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.66201656706634,
                lng: 139.74418401718142,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.662740063132574,
                lng: 139.744827747345,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.660491102070615,
                lng: 139.73968863487246,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.660892084264326,
                lng: 139.73869085311892,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.661271272095114,
                lng: 139.73768770694736,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.661580722898485,
                lng: 139.73664700984958,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.66188581406579,
                lng: 139.73561167716983,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.662212696165724,
                lng: 139.7345817089081,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.66261802811116,
                lng: 139.73360002040866,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.66308437522319,
                lng: 139.73265588283542,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.66366839486784,
                lng: 139.73181903362277,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.662831589276216,
                lng: 139.73140597343448,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.662081640970094,
                lng: 139.73814609164913,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.662962340728015,
                lng: 139.73835289478305,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.66383401160151,
                lng: 139.73857283592227,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.66470567295868,
                lng: 139.73878741264346,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.65873460199356,
                lng: 139.74329352378848,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.65790646200456,
                lng: 139.74373340606692,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.657078313427654,
                lng: 139.74417328834537,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.65628502621145,
                lng: 139.7447043657303,
              },
              radius: 100,
              passableId: -1,
            },
            {
              position: {
                lat: 35.655448143244485,
                lng: 139.7451174259186,
              },
              radius: 100,
              passableId: -1,
            },
          ],
        };
  return new Promise<ApiTypes.ReqPassableResult>((r) =>
    setTimeout(() => r(result), Math.random() * 1000)
  );
}

/**
 * 通行可能領域情報を取得する（ふりをする）。
 * 1% の確率で失敗し、ユーザ識別子が渡されない場合も失敗し、
 * パラメータのデータがない場合も失敗する
 * （それ以外の要因による失敗はシミュレートされない）。
 *
 * @param userId ユーザ識別子
 * @param args その他の引数l
 * @return API の戻り値
 */
export function astar(userId: ApiTypes.UserId, args: ApiTypes.AstarArg) {
  const result: ApiTypes.AstarResult =
    isFailed(0.01) || !userId || !args.data
      ? {
          succeeded: false,
          reason: "something wrong",
        }
      : {
          succeeded: true,
          route: args.data.reduce((r, e) => {
            if (r.length === 0) r.push(e);
            else r.push({ lat: r.at(-1)?.lat || 0, lng: e.lng }, e);
            return r;
          }, [] as ApiTypes.Position[]),
        };
  return new Promise<ApiTypes.AstarResult>((r) =>
    setTimeout(() => r(result), Math.random() * 10000)
  );
}

/**
 * 新しい経路の実行を予約する（ふりをする）。
 * 10% の確率で失敗し、ユーザ識別子が渡されない場合も失敗し、
 * パラメータのデータがない場合も失敗する
 * （それ以外の要因による失敗はシミュレートされない）。
 *
 * @param userId ユーザ識別子
 * @param args その他のパラメータ
 * @return API の戻り値
 */
export function execRoute(
  userId: ApiTypes.UserId,
  args: ApiTypes.ExecRouteArg
) {
  const result: ApiTypes.ExecRouteResult =
    isFailed(0.1) || !userId || !args.data
      ? {
          succeeded: false,
          reason: "something wrong",
        }
      : {
          succeeded: true,
        };
  return new Promise<ApiTypes.ExecRouteResult>((r) =>
    setTimeout(() => r(result), Math.random() * 1000)
  );
}

/**
 * 経路に名前を付けて保存する（ふりをする）。
 * 10% の確率で失敗し、ユーザ識別子が渡されない場合も失敗し、
 * パラメータのデータがない場合も失敗する
 * （それ以外の要因による失敗はシミュレートされない）。
 *
 * @param userId ユーザ識別子
 * @param args その他のパラメータ
 * @return API の戻り値
 */
export function saveRoute(
  userId: ApiTypes.UserId,
  args: ApiTypes.SaveRouteArg
) {
  const result: ApiTypes.SaveRouteResult =
    isFailed(0.1) || !userId || !args.data
      ? {
          succeeded: false,
          reason: "something wrong",
        }
      : {
          succeeded: true,
          routeName: args.routeName,
        };
  return new Promise<ApiTypes.SaveRouteResult>((r) =>
    setTimeout(() => r(result), Math.random() * 1000)
  );
}

let monitorCarStat = 0;
export function monitorCar(userId: ApiTypes.UserId) {
  const result: ApiTypes.MonitorCarResult =
    isFailed(0.1) || !userId
      ? {
          succeeded: false,
          reason: "something wrong",
        }
      : {
          succeeded: true,
        };
  if (result.succeeded) {
    if (monitorCarStat >= 0) {
      result.reserve = false;
    }
    if (monitorCarStat >= 1) {
      result.route = [
        [
          {
            lat: 35.65529127055111,
            lng: 139.74510669708255,
          },
          {
            lat: 35.65529127055111,
            lng: 139.74671602249148,
          },
          {
            lat: 35.658462096656926,
            lng: 139.74671602249148,
          },
          {
            lat: 35.658462096656926,
            lng: 139.74296092987063,
          },
          {
            lat: 35.65954223943891,
            lng: 139.74296092987063,
          },
        ],
        [
          {
            lat: 35.65954223943891,
            lng: 139.74296092987063,
          },
          {
            lat: 35.65954223943891,
            lng: 139.74489212036136,
          },
          {
            lat: 35.66274773844904,
            lng: 139.74489212036136,
          },
          {
            lat: 35.66274773844904,
            lng: 139.73783254623416,
          },
          {
            lat: 35.66118192062334,
            lng: 139.73783254623416,
          },
        ],
        [
          {
            lat: 35.66118192062334,
            lng: 139.73783254623416,
          },
          {
            lat: 35.66118192062334,
            lng: 139.73875522613528,
          },
          {
            lat: 35.664840285079194,
            lng: 139.73875522613528,
          },
          {
            lat: 35.664840285079194,
            lng: 139.7322750091553,
          },
          {
            lat: 35.66313306919273,
            lng: 139.7322750091553,
          },
        ],
      ];
      result.dest = [
        {
          lat: 35.65529127055111,
          lng: 139.74510669708255,
        },
        {
          lat: 35.65954223943891,
          lng: 139.74296092987063,
        },
        {
          lat: 35.66118192062334,
          lng: 139.73783254623416,
        },
        {
          lat: 35.66313306919273,
          lng: 139.7322750091553,
        },
      ];
      result.junkai = false;
      result.arrival = false;
      result.finish = false;
      result.arrange = false;
    }
    if (monitorCarStat >= 2) {
      result.reserve = true;
      result.status = true;
      result.nowPoint = {
        lat: 35.65 + Math.random() * 0.01,
        lng: 139.74 + Math.random(),
      };
      result.battery = (Math.random() * 100) | 0;
    }
    if (monitorCarStat >= 3) {
      result.arrange = true;
    }
    if (monitorCarStat >= 4) {
      result.arrival = true;
    }
    if (monitorCarStat >= 5) {
      result.arrival = false;
    }
    if (monitorCarStat >= 6) {
      result.status = false;
    }
    if (Math.random() < 0.3) {
      monitorCarStat++;
    }
  }
  return new Promise<ApiTypes.MonitorCarResult>((r) =>
    setTimeout(() => r(result), Math.random() * 1000)
  );
}
