import axios from 'axios';

export class UserService {
    private static _instance: UserService;
    private static BASE_API_PREFIX = "/api/schema/";

    constructor(){
        // empty constructor
    }

    public getInstance(): UserService {
        if (!UserService._instance){
            UserService._instance = new UserService();
        }
        return UserService._instance;
    }
}