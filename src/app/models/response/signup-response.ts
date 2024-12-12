import { Account } from "../account";

export interface SignupResponse {
    status: string;
    data: SignupDataResponse;
       
}
export interface SignupDataResponse {
    message: string;
    user: Account;
}
