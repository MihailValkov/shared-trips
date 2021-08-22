import { createReducer, on } from '@ngrx/store';
import { IUser } from '../interfaces/user';
import { login, logout, register, authenticate, updateUser } from './actions';

export interface IAuthState { user: IUser | undefined | null };

export const initialAuthState: IAuthState = { user: undefined };

export const authReducer = createReducer<IAuthState>(
    initialAuthState,
    on(login, (state, action) => ({ ...state, user: action.user})),
    on(register, (state, action) => ({ ...state, user: action.user })),
    on(authenticate, (state, action) => ({ ...state, user: action.user })),
    on(updateUser, (state, action) => ({ ...state, user: action.user })),
    on(logout, (state) => ({ ...state, user: null })),
);

