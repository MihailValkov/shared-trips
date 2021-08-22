import { createReducer, on } from "@ngrx/store";
import { IExpensiveTrips } from "src/app/interfaces/expensiveTrips";
import { ILogs } from "src/app/interfaces/logger";
import { IStatistics } from "src/app/interfaces/statisitcs";
import { ITrip } from "src/app/interfaces/trip";
import { IUser } from "src/app/interfaces/user";

import { adminAsideSetErrorMessage, 
     adminAsideSetStatistics, 
     adminDashboardClear, 
     adminDashboardLoading, 
     adminDashboardSetErrorMessage, 
     adminDashboardSetExpensiveTrips, 
     adminDashboardSetLogs, 
     adminSetMenuIsActive, 
     adminTripLoading, 
     adminTripClearTrips, 
     adminTripSetCurrentPage, 
     adminTripSetErrorMessage, 
     adminTripSetTrips, 
     adminTripSetTripsCount, 
     adminUserLoading,
     adminUserClearUsers,
     adminUserSetCurrentPage,
     adminUserSetErrorMessage,
     adminUserSetUsers,
     adminUserSetUsersCount,
     adminProfileLoading,
     adminProfileSetErrorMessage,
     adminProfileSetUserId,
     adminProfileSetUser,
     adminProfileClearUser,
     adminProfileUploadAvatarImageSetErrorMessage} from "./actions";

export interface IAdminMenuState {
    isActive: boolean;
}

export interface IAdminAsideState {
    statistics: IStatistics | undefined;
    errorMessage: string;
}

export interface IAdminDashboardState {
    isLoading: boolean;
    errorMessage: string;
    logs: ILogs | undefined;
    trips: IExpensiveTrips[] | undefined
}

export interface IAdminTripState {
    isLoading: boolean;
    errorMessage: string;
    trips: ITrip[] | undefined;
    count: number,
    page: number
}
export interface IAdminUserState {
    isLoading: boolean;
    errorMessage: string;
    users: IUser[] | undefined;
    count: number,
    page: number
}
export interface IAdminProfileState {
    isLoading: boolean;
    errorMessage: string;
    user: IUser | undefined;
    id: string,
    uploadAvatarErrorMessage:string
}

export const initialAdminState: IAdminMenuState = { isActive: true };
export const initialAsideState: IAdminAsideState = { statistics: undefined, errorMessage: '' };

export const initialDashboardState: IAdminDashboardState = {
    logs: undefined,
    isLoading: true,
    trips: undefined,
    errorMessage: ''
};

export const initialTripState: IAdminTripState = {
    isLoading: false,
    errorMessage: '',
    trips: undefined,
    count: 0,
    page: 1
}

export const initialUserState: IAdminUserState = {
    isLoading: false,
    errorMessage: '',
    users: undefined,
    count: 0,
    page: 1
}
export const initialProfileState: IAdminProfileState = {
    isLoading: true,
    errorMessage: '',
    uploadAvatarErrorMessage:'',
    user: undefined,
    id: '',
}

export const adminMenuReducer = createReducer<IAdminMenuState>(
    initialAdminState,
    on(adminSetMenuIsActive, state => ({ ...state, isActive: state.isActive ? false : true }))
);

export const asideReducer = createReducer<IAdminAsideState>(
    initialAsideState,
    on(adminAsideSetStatistics, (state, action) => ({ ...state, statistics: action.statistics })),
    on(adminAsideSetErrorMessage, (state, action) => ({ ...state, errorMessage: action.message })),
);

export const dashboardReducer = createReducer<IAdminDashboardState>(
    initialDashboardState,
    on(adminDashboardSetLogs, (state, action) => ({ ...state, logs: action.logs })),
    on(adminDashboardLoading, (state, action) => ({ ...state, isLoading: action.isLoading })),
    on(adminDashboardSetExpensiveTrips, (state, action) => ({ ...state, trips: action.trips })),
    on(adminDashboardSetErrorMessage, (state, action) => ({ ...state, errorMessage: action.message })),
    on(adminDashboardClear, () => initialDashboardState)
);

export const tripReducer = createReducer<IAdminTripState>(
    initialTripState,
    on(adminTripLoading, (state, action) => ({ ...state, isLoading: action.isLoading })),
    on(adminTripSetErrorMessage, (state, action) => ({ ...state, errorMessage: action.message })),
    on(adminTripSetTrips, (state, action) => ({ ...state, trips: action.trips })),
    on(adminTripSetTripsCount, (state, action) => ({ ...state, count: action.count })),
    on(adminTripSetCurrentPage, (state, action) => ({ ...state, page: action.page })),
    on(adminTripClearTrips, () => initialTripState)
);

export const userReducer = createReducer<IAdminUserState>(
    initialUserState,
    on(adminUserLoading, (state, action) => ({ ...state, isLoading: action.isLoading })),
    on(adminUserSetErrorMessage, (state, action) => ({ ...state, errorMessage: action.message })),
    on(adminUserSetUsers, (state, action) => ({ ...state, users: action.users })),
    on(adminUserSetUsersCount, (state, action) => ({ ...state, count: action.count })),
    on(adminUserSetCurrentPage, (state, action) => ({ ...state, page: action.page })),
    on(adminUserClearUsers, () => initialUserState)
);
export const profileReducer = createReducer<IAdminProfileState>(
    initialProfileState,
    on(adminProfileLoading, (state, action) => ({ ...state, isLoading: action.isLoading })),
    on(adminProfileSetErrorMessage, (state, action) => ({ ...state, errorMessage: action.message })),
    on(adminProfileUploadAvatarImageSetErrorMessage, (state, action) => ({ ...state, uploadAvatarErrorMessage: action.message })),
    on(adminProfileSetUser, (state, action) => ({ ...state, user: action.user })),
    on(adminProfileSetUserId, (state, action) => ({ ...state, id: action.id })),
    on(adminProfileClearUser, () => initialProfileState)
);