import { createReducer, on } from '@ngrx/store';
import { ITrip, ITripInfo } from 'src/app/interfaces/trip';
import { tripCreateErrorMessage, tripCreateLoading, tripDetailErrorMessage, tripDetailLoading, tripDetailSetTrip, tripDetailSetTripInfo, tripListErrorMessage, tripListLoading, tripListSetCurrentPage, tripListSetTrips, tripListSetTripsCount, tripUpdateErrorMessage, tripUpdateLoading } from './actions';

export interface ITripCreateState { isLoading: boolean, errorMessage: string | null };
export interface ITripUpdateState { isLoading: boolean, errorMessage: string | null };
export interface ITripDetailState { trip: ITrip | null, isLoading: boolean, errorMessage: string | null, info: ITripInfo | null };
export interface ITripListState { trips: ITrip[] | null, isLoading: boolean, errorMessage: string | null, count: number, page: number };


export const initialTripCreateState: ITripCreateState = { isLoading: false, errorMessage: null };
export const initialTripUpdateState: ITripUpdateState = { isLoading: true, errorMessage: null };
export const initialTripDetailState: ITripDetailState = { trip: null, isLoading: true, errorMessage: null, info: null };
export const initialTripListState: ITripListState = { trips: null, isLoading: true, errorMessage: null, count: 0, page: 1 };


export const tripCreateReducer = createReducer<ITripCreateState>(
    initialTripCreateState,
    on(tripCreateLoading, (state, action) => ({ ...state, isLoading: action.isLoading })),
    on(tripCreateErrorMessage, (state, action) => ({ ...state, errorMessage: action.message })),
);
export const tripUpdateReducer = createReducer<ITripUpdateState>(
    initialTripUpdateState,
    on(tripUpdateLoading, (state, action) => ({ ...state, isLoading: action.isLoading })),
    on(tripUpdateErrorMessage, (state, action) => ({ ...state, errorMessage: action.message })),
);
export const tripDetailReducer = createReducer<ITripDetailState>(
    initialTripDetailState,
    on(tripDetailSetTrip, (state, action) => ({ ...state, trip: action.trip })),
    on(tripDetailSetTripInfo, (state, action) => ({ ...state, info: action.info })),
    on(tripDetailLoading, (state, action) => ({ ...state, isLoading: action.isLoading })),
    on(tripDetailErrorMessage, (state, action) => ({ ...state, errorMessage: action.message })),
);
export const tripListReducer = createReducer<ITripListState>(
    initialTripListState,
    on(tripListLoading, (state, action) => ({ ...state, isLoading: action.isLoading })),
    on(tripListErrorMessage, (state, action) => ({ ...state, errorMessage: action.message })),
    on(tripListSetTrips, (state, action) => ({ ...state, trips: action.trips })),
    on(tripListSetTripsCount, (state, action) => ({ ...state, count: action.count })),
    on(tripListSetCurrentPage, (state, action) => ({ ...state, page: action.page })),
);
