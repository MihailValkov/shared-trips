export interface ILogger {
    email: string,
    avatarImg: string,
    action: string,
    message: string,
    time: string,
    status: string
}

export interface ILogs { admin: ILogger[], member: ILogger[] };