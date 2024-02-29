import { User } from "./userTypes";

export interface LoginResponse {
    message: string;
    user:    User;
    token:   string;
}


export interface RegisterProps {
    name: string;
    email: string;
    password: string;
    timezone: string
}

export interface RegisterResponse {
    message: string;
    user:    User;
    token:   string;
}

export interface UserRegisterResponse {
    name:       string;
    email:      string;
    timezone:   string;
    updated_at: Date;
    created_at: Date;
    id:         number;
}
