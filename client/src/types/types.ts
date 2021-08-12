import store from "../redux/store";

export interface IUser {
    memberId?: string;
    username?: string;
    email?: string;
    password?: string;
    registrationDate?: string;
    lastLoginDate?: string;
}
export interface ITweet {
    tweets?: ITweet[];
    _id?: string;
    text?: string;
    postDate?: Date;
    memberId?: {
        _id: string;
        username: string;
    }
    stars?: Array<string>;
}

export interface IConfigHeaders {
    headers: {
        [index: string]: string;
    };
}

export interface IAuthFunction {
    name?: string;
    email?: string;
    password?: string;
}

//Redux
export interface IState {
    loading?: boolean;
    isAuthenticated?: boolean;
    isUpdated?: boolean;
    isStarToggled?: boolean;
    isDeleted?: boolean;
    error?: string | undefined;
    success?: boolean;
    user?: IUser;
    tweets?: ITweet[];
    tweet?: ITweet;
}
export interface IAction {
    type?: string;
    payload?: any;
}

export type AppDispatch = typeof store.dispatch