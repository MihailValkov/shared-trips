import { ActionReducerMap } from "@ngrx/store";
import { IRootState } from "src/app/+store";
import {
    ILoginState,
    IMyTripsState,
    IProfileEditState,
    IProfileState,
    IRegisterState,
    loginReducer,
    myTripsReducer,
    profileEditReducer,
    profileReducer,
    registerReducer
} from './reducers';

export interface IUserState {
    readonly login: ILoginState;
    readonly register: IRegisterState;
    readonly profile: IProfileState;
    readonly profileTrips: IMyTripsState;
    readonly profileEdit: IProfileEditState;
}

export interface IUserModuleState extends IRootState {
    user: IUserState
}

export const reducers: ActionReducerMap<IUserState> = {
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    profileTrips: myTripsReducer,
    profileEdit: profileEditReducer
}