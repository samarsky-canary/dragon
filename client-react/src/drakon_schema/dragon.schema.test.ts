import { DragonSchema } from "./dragon.schema";
import { IconTypes } from "./icon.enums/icon.enum";
import { IconAction } from "./icon.model";
// 
let schema = new DragonSchema();
test(('Container test'),()=>{
    let end = schema._storage.get(schema._head.next);
    expect (end?.type).toBe(IconTypes.END);
})


test(('Container insert'), ()=> {
     let action = new IconAction();
     action.text = "let a = 10";
     schema.Insert(action,schema._head.id);
     console.log(schema.ToString());
    
     let iconToUpdate = schema.Get(schema._head.id);
     iconToUpdate!.text = "Schema name";
     schema.Update(iconToUpdate!)
     

});