import { ActionReducerMap } from "@ngrx/store";
import { IRootState } from "src/app/+store";
import { adminMenuReducer, asideReducer, dashboardReducer, IAdminMenuState, IAdminAsideState, IAdminDashboardState, IAdminTripState, tripReducer, IAdminUserState, userReducer, IAdminProfileState, profileReducer } from "./reducers";

export interface IAdminState {
    readonly menu: IAdminMenuState,
    readonly aside: IAdminAsideState,
    readonly dashboard: IAdminDashboardState,
    readonly trip: IAdminTripState,
    readonly user: IAdminUserState,
    readonly profile: IAdminProfileState,
}

export interface IAdminModuleState extends IRootState {
    admin: IAdminState
}

export const reducers: ActionReducerMap<IAdminState> = {
    menu: adminMenuReducer,
    aside: asideReducer,
    dashboard: dashboardReducer,
    trip: tripReducer,
    user: userReducer,
    profile: profileReducer
}