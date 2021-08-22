import { IUser } from "./user";

export interface ITrip {
    startPoint: string,
    endPoint: string,
    date: string,
    time: string,
    carImage: string,
    carBrand: string,
    seats: number,
    price: number,
    description: string,
    smoking: boolean,
    eating: boolean,
    drinking: boolean,
    climatic: boolean,
    creator: IUser,
    buddies: IUser[],
    createdAt: string,
    _id: string
}

export interface ITripInfo {
    isOwner: boolean,
    alreadyJoined: boolean
}

