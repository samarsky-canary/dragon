
export class AuthStateService {
    private static instance: AuthStateService;


    constructor(){}

    public getInstance(): AuthStateService {
        if (!AuthStateService.instance){
            AuthStateService.instance = new AuthStateService();
        }
        return AuthStateService.instance;
    }
}