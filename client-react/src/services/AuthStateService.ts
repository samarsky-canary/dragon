import axios from 'axios';
import { loginResponseDTO } from '../DTO/IloginResponseDTO';
import { UserDTO } from '../DTO/UserDTO';

export class AuthStateService {
    private static _instance: AuthStateService;
    private static _accessToken: string | undefined;
    private static _role: string | undefined;
    private static _uuid: string | undefined;
    private static _username: string | undefined;
    private static _email: string | undefined;
    private static BASE_API_PREFIX = "/api/auth/";


    public setMeta(uuid: string, role: string, username: string, access_token: string, email: string) {
        AuthStateService._uuid = uuid;
        AuthStateService._role = role;
        AuthStateService._username = username;
        AuthStateService._accessToken = access_token;
        AuthStateService._email = email;
    }
    constructor() {
        // empty constructor
    }

    public getInstance(): AuthStateService {
        if (!AuthStateService._instance) {
            AuthStateService._instance = new AuthStateService();
        }
        return AuthStateService._instance;
    }



    public getToken(): string {
        if (AuthStateService._accessToken) {
            return AuthStateService._accessToken;
        } else {
            throw new Error("token is undefined");
        }
    }

    public getRole() : string {
        if (AuthStateService._role) {
            return AuthStateService._role;
        } else {
            throw new Error("token is undefined");

        }
    }

    public getUUID(): string {
        if (AuthStateService._uuid) {
            return AuthStateService._uuid;
        } else {
            throw new Error('uuid is not set');
        }
    }

    public getUsername(): string {
        if (AuthStateService._username) {
            return AuthStateService._username;
        } else {
            throw new Error('username is not set');
        }
    }

    public getEmail(): string {
        if (AuthStateService._email) {
            return AuthStateService._email;
        } else {
            throw new Error('email is not set');
        }
    }


    public setUsername(name: string) {
        AuthStateService._username = name;
        if (AuthStateService._username) {
            return AuthStateService._username;
        } else {
            throw new Error('username is not set');
        }
    }

    public setRole(role: string) {
        AuthStateService._role = role;
        if (AuthStateService._role) {
            return AuthStateService._role;
        } else {
            throw new Error('role is not set');
        }
    }


    public async TokenVerification(token: string): Promise<boolean> {
        const URL = process.env.REACT_APP_CLIENT_DOMAIN + AuthStateService.BASE_API_PREFIX + "verify/" + token;
        return await axios.get(URL).then(() => {
            return true
        }).catch(() => {
            return false
        });
    }

    public async Authentificate(username: string, password: string): Promise<ResponsePayload> {
        // here works proxy!!! 
        const URL = process.env.REACT_APP_CLIENT_DOMAIN + AuthStateService.BASE_API_PREFIX + "login";

        try {
            const response = await axios.post<loginResponseDTO>(URL, { username, password });
            AuthStateService._accessToken = response.data.access_token;
            AuthStateService._role = response.data.role;
            AuthStateService._uuid = response.data.uuid;
            AuthStateService._username = response.data.username;
            AuthStateService._email = response.data.email;
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

    public async RegisterUser(username: string, password: string, email: string): Promise<ResponsePayload> {
        const URL = process.env.REACT_APP_CLIENT_DOMAIN + AuthStateService.BASE_API_PREFIX + "signup";
        try {
            const response = await axios.post<loginResponseDTO>(URL, { username, password, email });
            AuthStateService._accessToken = response.data.access_token;
            AuthStateService._role = response.data.role;
            AuthStateService._uuid = response.data.uuid;
            AuthStateService._email = response.data.email;
            AuthStateService._username = response.data.username;
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

    public Logout(): void {
        AuthStateService._accessToken = AuthStateService._role = AuthStateService._uuid = "";
    }

    public async DeleteRegistrationData(uuid: string) {
        try {
            return await axios.delete(AuthStateService.BASE_API_PREFIX + "/delete", {
                headers: {
                    "Authorization": `Bearer ${AuthStateService._instance.getToken()}`,
                    "uuid": uuid
                }
            });
        } catch (err) {
            const responseData: ResponsePayload = { status: err.status, statusText: err.message };
            if (err.response) {
                responseData.statusText = err.response.data.message;
            }
            return responseData;
        }
    }

    public async changePassword(oldPassword: string, newPassword: string) {
        const body = {
            username: this.getUsername(),
            password: oldPassword,
            newPassword: newPassword
        }
        try {
            return await axios.patch(AuthStateService.BASE_API_PREFIX + "/changePassword", body );
        } catch (err) {
            const responseData: ResponsePayload = { status: err.status, statusText: err.message };
            if (err.response) {
                responseData.statusText = err.response.data.message;
            }
            return responseData;
        }
    }
}

type ResponsePayload = {
    status: number;
    statusText: string;
    body?: loginResponseDTO
};
