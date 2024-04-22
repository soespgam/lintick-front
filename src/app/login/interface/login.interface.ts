export interface Login {
    email: string;
    password: string;
}

export interface ResponseLogin {
    access_token: string;
    message: string;
    status: boolean;
}