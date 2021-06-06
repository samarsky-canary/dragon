import axios from 'axios';
import { loginResponseDTO } from '../DTO/IloginResponseDTO';

export class AuthStateService {
    private static _instance: AuthStateService;
    private static _accessToken: string | undefined;
    private static _role: string | undefined;
    private static _uuid: string | undefined;
    private static _username: string | undefined;
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
        if (AuthStateService._accessToken) {
            return AuthStateService._accessToken;
        } else {
            throw new Error("token is undefined");
        }
    }

    public getUUID() : string {
        if (AuthStateService._uuid) {
            return AuthStateService._uuid;
        } else {
            throw new Error('uuid is not set');
        }
    }


    public async TokenVerification(token: string) : Promise<boolean> {
        const URL = process.env.REACT_APP_CLIENT_DOMAIN + AuthStateService.BASE_API_PREFIX  + "verify/" + token;
        return await axios.post(URL).then(() => {
            return true
        }).catch(()=> {
            return false
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
            AuthStateService._username = response.data.uuid;
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
