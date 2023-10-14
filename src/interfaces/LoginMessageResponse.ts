import { User } from './User';

export default interface LoginMessageResponse {
    login: {
        message: string;
        token?: string;
        user: User;
    };
}