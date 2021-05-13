import { IconTypes } from "./icon.enums";
import { Icon, IconBegin } from "./icon.model"

test(('BeginIcon initon'),()=>{
    var beginIcon = new IconBegin();
    expect(beginIcon.type).toBe(IconTypes.BEGIN)
})


test(('BeginIcon text'),()=>{
    var beginIcon = new IconBegin();
    const innerText = "Invokation";
    beginIcon.updateText(innerText);
    expect(beginIcon.text).toBe("Invokation");    



    let arr: {[id :string] : Icon} = {};
    arr.s1 = beginIcon;
    let begin = arr.s1 as IconBegin;
})


