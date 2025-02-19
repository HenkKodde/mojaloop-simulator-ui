/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License.                                            *
 ******************************************************************************/

import { createAction } from "redux-actions";
import { sleep } from "utils/async";
import { push } from "connected-react-router";

export const SET_APP_CONFIG = "App / Set Config";
export const SET_APP_LOADING = "App / Set Is Loading";
export const UNSET_APP_LOADING = "App / Unset Is Loading";
export const SHOW_TOAST = "App / Show Toast";
export const HIDE_TOAST = "App / Hide Toast";
export const SHOW_ERROR_MODAL = "App / Show Error Modal";
export const HIDE_ERROR_MODAL = "App / Hide Error Modal";
export const SET_DFSPS = "App / Set DFSPs";
export const SET_DFSPS_ERROR = "App / Set DFSPs Error";
export const SET_DFSP_ID = "App / Set DFSP Id";
export const UNSET_ENVIRONMENT_ID = "App / Unset Environment Id";
export const UNSET_DFSPS = "App / Unset DFSPs";

export const setAppConfig = createAction(SET_APP_CONFIG);
export const setAppLoading = createAction(SET_APP_LOADING);
export const unsetAppLoading = createAction(UNSET_APP_LOADING);
export const showToast = createAction(SHOW_TOAST);
export const hideToast = createAction(HIDE_TOAST);
export const showErrorModal = createAction(SHOW_ERROR_MODAL);
export const hideErrorModal = createAction(HIDE_ERROR_MODAL);
export const setDfsps = createAction(SET_DFSPS);
export const setDfspsError = createAction(SET_DFSPS_ERROR);
export const setDfspId = createAction(SET_DFSP_ID);
export const unsetEnvironmentId = createAction(UNSET_ENVIRONMENT_ID);
export const unsetDfsps = createAction(UNSET_DFSPS);

export const initApp = () => async (dispatch, getState) => {
  dispatch(setAppLoading());
  dispatch(push("/users"));
  dispatch(unsetAppLoading());
};

export const showSuccessToast = (
  message = "Saved Successfully",
  ms = 3000
) => async dispatch => {
  dispatch(showToast({ message, kind: "success " }));
  await sleep(ms);
  dispatch(hideToast());
};

export const showErrorToast = (
  message = "Operation Failed",
  ms = 3000
) => async dispatch => {
  dispatch(showToast({ message, kind: "error " }));
  await sleep(ms);
  dispatch(hideToast());
};
