import axios from 'axios';
import { loginResponseDTO } from '../DTO/IloginResponseDTO';

export class AuthStateService {
    private static _instance: AuthStateService;
    private static _accessToken: string;
    private static _role: string;
    private static _uuid: string;
    private static BASE_API_PREFIX = "/api/auth/";

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

    public TokenVerification(token: string) {
        const baseApiURl = process.env.REACT_APP_CLIENT_DOMAIN + "/api/auth/verify";
        return axios.post(baseApiURl,{params: token}).then((response) => {
            return true;
        }).catch(err=> {
            return false;
        });
    }

    public async  Authentificate (username:string, password:string) : Promise<ResponsePayload> {
        // here works proxy!!! 
        const URL = process.env.REACT_APP_CLIENT_DOMAIN + AuthStateService.BASE_API_PREFIX + "login";

        try {
            const response = await axios.post<loginResponseDTO>(URL, { username, password });
            AuthStateService._accessToken = response.data.access_token;
            AuthStateService._role = response.data.role;
            AuthStateService._uuid = response.data.uuid;
            return {
                status: response.status,
                statusText: response.statusText,
                body: response.data
            };
        } catch (err) {
            const responseData: ResponsePayload = { status: err.status, statusText: err.message };
            if (err.response) {
                responseData.statusText = err.response.data.message;
            }
            return responseData;
        }
    }

    public async RegisterUser(username:string, password:string) : Promise<ResponsePayload> {
        const URL = process.env.REACT_APP_CLIENT_DOMAIN + AuthStateService.BASE_API_PREFIX + "signup";
        try {
            const response = await axios.post<loginResponseDTO>(URL, { username, password });
            AuthStateService._accessToken = response.data.access_token;
            AuthStateService._role = response.data.role;
            AuthStateService._uuid = response.data.uuid;
            return {
                status: response.status,
                statusText: response.statusText,
                body: response.data
            };
        } catch (err) {
            const responseData: ResponsePayload = { status: err.status, statusText: err.message };
            if (err.response) {
                responseData.statusText = err.response.data.message;
            }
            return responseData;
        }
    }

    public Logout() : void {
            AuthStateService._accessToken = AuthStateService._role = AuthStateService._uuid = "";
    }
    

}

type ResponsePayload = {
    status: number;
    statusText: string;
    body?: loginResponseDTO 
};
