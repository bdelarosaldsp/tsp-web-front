export interface SignupRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
    identification_number: string;
    identificationtype_id: number;
}
