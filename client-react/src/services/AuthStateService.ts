import axios from 'axios';
import { loginResponseDTO } from '../DTO/IloginResponseDTO';

export class AuthStateService {
    private static _instance: AuthStateService;
    private static _accessToken: string;
    private static _role: string;
    private static _uuid: string;

    constructor(){
        // empty constructor
    }

    public getInstance(): AuthStateService {
        if (!AuthStateService._instance){
            AuthStateService._instance = new AuthStateService();
        }
        return AuthStateService._instance;
    }



    public getToken() : string {
        return AuthStateService._accessToken;
    }

    public Authentificate (username:string, password:string) : Promise<ResponsePayload> {
        // here works proxy!!! 
        const baseApiURl = process.env.REACT_APP_CLIENT_DOMAIN + "/api/auth/login";

        return axios.post<loginResponseDTO>(baseApiURl,{username, password}).then((response) => {
            AuthStateService._accessToken = response.data.access_token;
            AuthStateService._role = response.data.role;
            AuthStateService._uuid = response.data.uuid;
            return {
                success: true,
                statusText: response.statusText,
                body: response.data
            };
        }).catch(err=> {
            const responseData: ResponsePayload = {success: false, statusText: err.message};
            if (err.response) {
                responseData.statusText = err.response.data.message;
            }
            return responseData;
        });
    }
}

type ResponsePayload = {
    success: boolean;
    statusText: string;
    body?: loginResponseDTO 
};
