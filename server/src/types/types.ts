export default interface IMember extends Document {
    email: string;
    password: string;
    username: string;
    avatar: {
        public_id: string,
        url: string
    },
    role: string;
    registrationDate: Date,
    lastLoginDate: Date,
    tweets: ITweet
    getJwtToken(): string;
    comparePassword(enteredPassword: string): Promise<boolean>;
}

export interface ITweet extends Document {
    member: string
    postDate: Date;
    text: string;
    stars: Array<string>;
}

export default interface Token {
    member: {
        id: string;
    }
}

