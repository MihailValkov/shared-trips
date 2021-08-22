import { ActionReducerMap } from '@ngrx/store';
import { IRootState } from 'src/app/+store';
import { ITripCreateState, ITripDetailState, ITripListState, ITripUpdateState, tripCreateReducer, tripDetailReducer, tripListReducer, tripUpdateReducer } from "./reducers";

export interface ITripState {
    readonly create: ITripCreateState;
    readonly update: ITripUpdateState;
    readonly detail: ITripDetailState;
    readonly list: ITripListState;
}

export interface ITripModuleState extends IRootState {
    trip: ITripState
}

export const reducers: ActionReducerMap<ITripState> = {
    create: tripCreateReducer,
    update: tripUpdateReducer,
    detail: tripDetailReducer,
    list: tripListReducer
}

