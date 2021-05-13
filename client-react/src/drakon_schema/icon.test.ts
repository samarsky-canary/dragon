import { DragonSchema } from "./dragon.schema";
import { IconTypes } from "./icon.enums";
import { Icon, IconBegin } from "./icon.model"

test(('BeginIcon initon'),()=>{
    var beginIcon = new IconBegin();
    expect(beginIcon.type).toBe(IconTypes.BEGIN)
})


test(('BeginIcon test'),()=>{
    var beginIcon = new IconBegin();
    const innerText = "Invokation";
    beginIcon.updateText(innerText);
    expect(beginIcon.text).toBe("Invokation");    
})