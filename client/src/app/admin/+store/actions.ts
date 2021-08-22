import { createAction, props } from "@ngrx/store";
import { IExpensiveTrips } from "src/app/interfaces/expensiveTrips";
import { ILogs } from "src/app/interfaces/logger";
import { IStatistics } from "src/app/interfaces/statisitcs";
import { ITrip } from "src/app/interfaces/trip";
import { IUser } from "src/app/interfaces/user";

const adminNamespace = '[ADMIN]';
const adminAsideNamespace = '[ADMIN ASIDE]';
const adminDashboardNamespace = '[ADMIN DASHBOARD]';
const adminTripNamespace = '[ADMIN TRIP]';
const adminUserNamespace = '[ADMIN USER]';
const adminProfileNamespace = '[ADMIN PROFILE]';

export const adminSetMenuIsActive = createAction(`${adminNamespace} Show Admin Menu`);
export const adminAsideSetStatistics = createAction(`${adminAsideNamespace} Set Statistics`, props<{ statistics: IStatistics }>());
export const adminAsideSetErrorMessage = createAction(`${adminAsideNamespace} Error Message`, props<{ message: string }>());

export const adminDashboardLoading = createAction(`${adminDashboardNamespace} Loading`, props<{ isLoading: boolean }>());
export const adminDashboardSetLogs = createAction(`${adminDashboardNamespace} Set Logs`, props<{ logs: ILogs }>());
export const adminDashboardSetExpensiveTrips = createAction(`${adminDashboardNamespace} Set Top Expensive Trips`, props<{ trips: IExpensiveTrips[] }>());
export const adminDashboardSetErrorMessage = createAction(`${adminDashboardNamespace} Error Message`, props<{ message: string }>());
export const adminDashboardClear = createAction(`${adminDashboardNamespace} Clear Data`);

export const adminTripLoading = createAction(`${adminTripNamespace} Loading`, props<{ isLoading: boolean }>());
export const adminTripSetTrips = createAction(`${adminTripNamespace} Set Trips`, props<{ trips: ITrip[] }>());
export const adminTripSetTripsCount = createAction(`${adminTripNamespace} Set Trips Count`, props<{ count: number }>());
export const adminTripSetCurrentPage = createAction(`${adminTripNamespace} Set Trips Page`, props<{ page: number }>());
export const adminTripSetErrorMessage = createAction(`${adminTripNamespace} Error Message`, props<{ message: string }>());
export const adminTripClearTrips = createAction(`${adminTripNamespace} Clear Trips`);

export const adminUserLoading = createAction(`${adminUserNamespace} Loading`, props<{ isLoading: boolean }>());
export const adminUserSetUsers = createAction(`${adminUserNamespace} Set Users`, props<{ users: IUser[] }>());
export const adminUserSetUsersCount = createAction(`${adminUserNamespace} Set Users Count`, props<{ count: number }>());
export const adminUserSetCurrentPage = createAction(`${adminUserNamespace} Set Users Page`, props<{ page: number }>());
export const adminUserSetErrorMessage = createAction(`${adminUserNamespace} Error Message`, props<{ message: string }>());
export const adminUserClearUsers = createAction(`${adminUserNamespace} Clear Users`);

export const adminProfileLoading = createAction(`${adminProfileNamespace} Loading`, props<{ isLoading: boolean }>());
export const adminProfileSetUser = createAction(`${adminProfileNamespace} Set User`, props<{ user: IUser }>());
export const adminProfileSetUserId = createAction(`${adminProfileNamespace} Set User Id`, props<{ id: string }>());
export const adminProfileSetErrorMessage = createAction(`${adminProfileNamespace} Error Message`, props<{ message: string }>());
export const adminProfileUploadAvatarImageSetErrorMessage = createAction(`${adminProfileNamespace} Upload Image Error Message`, props<{ message: string }>());
export const adminProfileClearUser = createAction(`${adminProfileNamespace} Clear User`);
