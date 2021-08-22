import { createAction, props } from '@ngrx/store';
import { ITrip, ITripInfo } from 'src/app/interfaces/trip';

const tripCreateNamespace = '[TRIP CREATE]';
const tripDetailNamespace = '[TRIP DETAIL]';
const tripEditNamespace = '[TRIP EDIT]';
const tripListNamespace = '[TRIP LIST]';

export const tripCreateLoading = createAction(`${tripCreateNamespace} Loading`, props<{ isLoading: boolean }>());
export const tripCreateErrorMessage = createAction(`${tripCreateNamespace} Error Message`, props<{ message: string }>());

export const tripUpdateLoading = createAction(`${tripEditNamespace} Loading`, props<{ isLoading: boolean }>());
export const tripUpdateErrorMessage = createAction(`${tripEditNamespace} Error Message`, props<{ message: string }>());

export const tripDetailSetTrip = createAction(`${tripDetailNamespace} Set Trip`, props<{ trip: ITrip }>());
export const tripDetailSetTripInfo = createAction(`${tripDetailNamespace} Set Trip Info`, props<{ info: ITripInfo }>());
export const tripDetailLoading = createAction(`${tripDetailNamespace} Loading`, props<{ isLoading: boolean }>());
export const tripDetailErrorMessage = createAction(`${tripDetailNamespace} Error Message`, props<{ message: string }>());

export const tripListLoading = createAction(`${tripListNamespace} Loading`, props<{ isLoading: boolean }>());
export const tripListErrorMessage = createAction(`${tripListNamespace} Error Message`, props<{ message: string }>());
export const tripListSetTrips = createAction(`${tripListNamespace} Set Trips`, props<{ trips: ITrip[] }>());
export const tripListSetTripsCount = createAction(`${tripListNamespace} Set Trips Count`, props<{ count: number }>());
export const tripListSetCurrentPage = createAction(`${tripListNamespace} Set Current Page`, props<{ page: number }>());
