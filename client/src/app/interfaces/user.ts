import { ITrip } from "./trip";

export interface IUser {
    username: string;
    email: string;
    gender: string;
    company: string;
    city: string;
    profession: string;
    coverImg: string;
    avatarImg: string;
    createdTrips: ITrip[];
    createdAt:string;
    status:string;
    _id: string
}