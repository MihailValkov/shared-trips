import { createReducer, on } from '@ngrx/store';
import { ITrip } from 'src/app/interfaces/trip';
import {
    userLoginErrorMessage,
    userLoginLoading,
    userProfileAvatarInputIsActive,
    userProfileCoverInputIsActive,
    userProfileEditErrorMessage,
    userProfileEditLoading,
    userProfileMyTripsErrorMessage,
    userProfileMyTripsLoading,
    userProfileMyTripsSetTrips,
    userProfileMyTripsSetTripsCount,
    userProfileMyTripsSetTripsCurrentPage,
    userRegisterErrorMessage,
    userRegisterLoading
} from './actions';

export interface ILoginState { isLoading: boolean, errorMessage: string | null };
export interface IRegisterState { isLoading: boolean, errorMessage: string | null };
export interface IProfileState { avatarInputIsActive: boolean, coverInputIsActive: boolean };
export interface IMyTripsState {
    isLoading: boolean,
    errorMessage: string | null,
    trips: ITrip[] | null,
    count: number | 0,
    page: number
};
export interface IProfileEditState { isLoading: boolean, errorMessage: string | null };

export const initialLoginState: ILoginState = { isLoading: false, errorMessage: null };
export const initialRegisterState: IRegisterState = { isLoading: false, errorMessage: null };
export const initialProfileState: IProfileState = { avatarInputIsActive: false, coverInputIsActive: false };
export const initialMyTripsState: IMyTripsState = {
    isLoading: false,
    errorMessage: null,
    trips: null,
    count: 0,
    page: 1
}
export const initialProfileEditState: IProfileEditState = { isLoading: false, errorMessage: null };

export const loginReducer = createReducer<ILoginState>(
    initialLoginState,
    on(userLoginLoading, (state, action) => ({ ...state, isLoading: action.isLoading })),
    on(userLoginErrorMessage, (state, action) => ({ ...state, errorMessage: action.message }))
);
export const registerReducer = createReducer<IRegisterState>(
    initialRegisterState,
    on(userRegisterLoading, (state, action) => ({ ...state, isLoading: action.isLoading })),
    on(userRegisterErrorMessage, (state, action) => ({ ...state, errorMessage: action.message }))
);
export const profileReducer = createReducer<IProfileState>(
    initialProfileState,
    on(userProfileAvatarInputIsActive, (state, action) => ({ ...state, avatarInputIsActive: state.avatarInputIsActive ? false : action.isActive })),
    on(userProfileCoverInputIsActive, (state, action) => ({ ...state, coverInputIsActive: state.coverInputIsActive ? false : action.isActive })),
);
export const myTripsReducer = createReducer<IMyTripsState>(
    initialMyTripsState,
    on(userProfileMyTripsLoading, (state, action) => ({ ...state, isLoading: action.isLoading })),
    on(userProfileMyTripsErrorMessage, (state, action) => ({ ...state, errorMessage: action.message })),
    on(userProfileMyTripsSetTrips, (state, action) => ({ ...state, trips: action.trips })),
    on(userProfileMyTripsSetTripsCount, (state, action) => ({ ...state, count: action.count })),
    on(userProfileMyTripsSetTripsCurrentPage, (state, action) => ({ ...state, page: action.page })),
);

export const profileEditReducer = createReducer<IProfileEditState>(
    initialProfileEditState,
    on(userProfileEditLoading, (state, action) => ({ ...state, isLoading: action.isLoading })),
    on(userProfileEditErrorMessage, (state, action) => ({ ...state, errorMessage: action.message }))
);