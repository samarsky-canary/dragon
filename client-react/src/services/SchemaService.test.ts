import {SchemaService} from './SchemaService';
import {AuthStateService} from './AuthStateService';

// default user for test
const user = {
    username : "Willy",
    password: 'qwerty'
}

const authStateService = new AuthStateService().getInstance();
const schemaService = new SchemaService(authStateService).getInstance();
var UUID : string;

test(('Willy login'),()=>{
    authStateService.Authentificate(user.username, user.password)
    .then(response => {
        UUID = response.body?.uuid!;
        expect(response).toBe(200)});
});

test("Get user schemas",async ()=>{
    authStateService.Authentificate(user.username, user.password)
    const res = await schemaService.getUserSchemas(UUID)
    .then(response => {
        expect(response).toBeDefined();
    })
})

