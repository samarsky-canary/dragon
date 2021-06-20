import axios from 'axios';
import { UserDTO } from '../DTO/UserDTO';
import { AuthStateService } from './AuthStateService';

const BASE_API_PREFIX = "/api/users";

export class UserService {
    private static _instance: UserService;
    private static _authService: AuthStateService;

    constructor(authService: AuthStateService) {
        UserService._authService = authService.getInstance();
    }

    public getInstance(): UserService {
        if (!UserService._instance) {
            UserService._instance = new UserService(UserService._authService);
        }
        return UserService._instance;
    }


    private setTokenBearer() {
        return {
            "Authorization": `Bearer ${UserService._authService.getToken()}`
        }
    }
    public getUserinfoById(uuid: string): Promise<UserDTO> {
        return axios.get(`${BASE_API_PREFIX}/${uuid}`, {
            headers: this.setTokenBearer()
        })
            .then(response => response.data)
            .catch(() => { throw new Error("Unable to get data") }
            )
    }

    public GetUnprevilegedUsers(): Promise<UserDTO[]> {
        return axios.get(`${BASE_API_PREFIX}/nonpriveleged`, {
            headers: this.setTokenBearer()
        })
            .then(response => response.data);
    }


    public GetAllUsers(): Promise<UserDTO[]> {
        return axios.get(`${BASE_API_PREFIX}`, {
            headers: this.setTokenBearer()
        })
            .then(response => response.data);
    }

    public async UpdateData(user: UserDTO) {

        return axios.put(BASE_API_PREFIX + "/update", user, {
            headers: {
                "Authorization": `Bearer ${UserService._authService.getToken()}`,
            }
        })
            .then(response => {
                UserService._authService.setUsername(user.username);
                UserService._authService.setRole(user.role);
                return response.data
            });
    }

    public async UpdateUserRole(user: UserDTO) {

        return axios.put(BASE_API_PREFIX + "/update", user, {
            headers: {
                "Authorization": `Bearer ${UserService._authService.getToken()}`,
            }
        })
            .then(response => {
                return response.data
            });
    }

    public async RenameUser(newname: string) {
        this.UpdateData({
            username: newname,
            role: UserService._authService.getRole(),
            uuid: UserService._authService.getUUID(),
            email: UserService._authService.getEmail(),
        });
    }
}

type ResponsePayload = {
    status: number;
    statusText: string;
};
