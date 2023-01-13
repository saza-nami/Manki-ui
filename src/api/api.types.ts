/** @module ApiTypes */

import path from "path";

/**
 * API の戻り値の原始型
 */
interface ApiResult {
  succeeded: boolean;
}

/**
 * API 呼び出しに用いられる識別子の原始型
 */
type GeneralId = string;

/**
 * ユーザ識別子の型
 */
export type UserId = GeneralId;

/**
 * createUser の戻り値の型
 */
export interface CreateUserResult extends ApiResult {
  userId?: UserId;
}

/**
 * terminate の戻り値の型
 */
export interface TerminateResult extends ApiResult {
  /* Nothing yet */
}

/**
 * endRoute の戻り値の型
 */
export interface EndRouteResult extends ApiResult {
  /* Nothing yet */
}

/**
 * proceedRoute の戻り値の型
 */
export interface ProceedRouteResult extends ApiResult {
  /* Nothing yet */
}

/**
 * isAcceptable の戻り値の型
 */
export interface IsAcceptableResult extends ApiResult {
  /* Nothing yet */
}

/**
 * routeName で利用される保存済経路情報の型
 */
export interface PassableName {
  routeName: string;
  available: boolean;
}

/**
 * routeName の戻り値の型
 */
export interface RouteNameResult extends ApiResult {
  passableRoute?: PassableName[];
}

/**
 * 緯度と経度の対を表す型
 */
export interface Position {
  lat: number;
  lng: number;
}

/**
 * reqRoute のパラメータの型
 */
export interface ReqRouteArg {
  routeName: string;
}

/**
 * reqRoute の戻り値の型
 */
export interface ReqRouteResult extends ApiResult {
  route?: Position[][];
  dest?: Position[];
  junkai?: boolean;
}

/**
 * 通行可能領域のそれぞれの円を表す型
 */
export interface PassableInfo {
  position: Position; // XXX: 文書と実装の齟齬（実装に沿う）
  radius: number;
  passableId: number;
}

/**
 * reqPassable の戻り値の型
 */
export interface ReqPassableResult extends ApiResult {
  passableInfo?: PassableInfo[];
}

/**
 * astar のパラメータの型
 */
export interface AstarArg {
  data: Position[];
}

/**
 * astar の戻り値の型
 */
export interface AstarResult extends ApiResult {
  route?: Position[];
  reason?: string;
}

/**
 * ExecRoute のパラメータの型
 */
export interface ExecRouteArg {
  data: Position[][];
  junkai: boolean;
}

/**
 * ExecRoute の戻り値の型
 */
export interface ExecRouteResult extends ApiResult {
  message?: string;
}

/**
 * saveRoute のパラメータの型
 */
export interface SaveRouteArg {
  routeName: string;
  data: Position[][];
  junkai: boolean;
}

/**
 * saveRoute の戻り値の型
 */
export interface SaveRouteResult extends ApiResult {
  routeName?: string;
  message?: string;
}

/**
 * monitorCar の戻り値の型
 */
export interface MonitorCarResult extends ApiResult {
  reserve?: boolean;
  route?: Position[][];
  dest?: Position[];
  arrival?: boolean;
  finish?: boolean;
  arrange?: boolean;
  status?: boolean;
  nowPoint?: Position;
  battery?: number;
}
