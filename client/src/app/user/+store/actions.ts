import { createAction, props } from '@ngrx/store';
import { ITrip } from 'src/app/interfaces/trip';

const userLoginNamespace = '[USER LOGIN]';
const userRegisterNamespace = '[USER REGISTER]';
const userProfileNamespace = '[USER PROFILE]';
const userProfileEditNamespace = '[USER PROFILE EDIT]';
const userProfileMyTripsNamespace = '[USER PROFILE MY TRIPS]';

export const userLoginLoading = createAction(`${userLoginNamespace} Loading`, props<{ isLoading: boolean }>());
export const userLoginErrorMessage = createAction(`${userLoginNamespace} Error Message`, props<{ message: string }>());

export const userRegisterLoading = createAction(`${userRegisterNamespace} Loading`, props<{ isLoading: boolean }>());
export const userRegisterErrorMessage = createAction(`${userRegisterNamespace} Error Message`, props<{ message: string }>());

export const userProfileAvatarInputIsActive = createAction(`${userProfileNamespace} Show Avatar Upload Input`, props<{ isActive: boolean }>());
export const userProfileCoverInputIsActive = createAction(`${userProfileNamespace} Show Cover Upload Input`, props<{ isActive: boolean }>());

export const userProfileMyTripsLoading = createAction(`${userProfileMyTripsNamespace} Loading`, props<{ isLoading: boolean }>());
export const userProfileMyTripsErrorMessage = createAction(`${userProfileMyTripsNamespace} Error Message`, props<{ message: string }>());
export const userProfileMyTripsSetTrips = createAction(`${userProfileMyTripsNamespace} Set Trips`, props<{ trips: ITrip[] }>());
export const userProfileMyTripsSetTripsCount = createAction(`${userProfileMyTripsNamespace} Set Count`, props<{ count: number }>());
export const userProfileMyTripsSetTripsCurrentPage = createAction(`${userProfileMyTripsNamespace} Set Current Page`, props<{ page: number }>());

export const userProfileEditLoading = createAction(`${userProfileEditNamespace} Loading`, props<{ isLoading: boolean }>());
export const userProfileEditErrorMessage = createAction(`${userProfileEditNamespace} Error Message`, props<{ message: string }>());

