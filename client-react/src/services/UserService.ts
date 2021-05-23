import axios from 'axios';
import { AuthStateService } from './AuthStateService';

const BASE_API_PREFIX = "/api/users";

export class UserService {
    private static _instance: UserService;
    private static _authService : AuthStateService;

    constructor(authService : AuthStateService){
        UserService._authService = authService.getInstance();
    }

    public getInstance(): UserService {
        if (!UserService._instance){
            UserService._instance = new UserService(UserService._authService);
        }
        return UserService._instance;
    }


    public getUserinfoById(uuid: string) : Promise<UserDTO> {
        const headers = {
            "Authorization" : `Bearer ${UserService._authService.getToken()}`
        }
        return axios.get(`${BASE_API_PREFIX}/${uuid}`,{
            headers: headers
        })
        .then(response => response.data)
        .catch(err => {throw new Error("Unable to get data")}
        )
    }
}


export type UserDTO = 
{
    uuid: string;
    username: string;
    role : string;
}