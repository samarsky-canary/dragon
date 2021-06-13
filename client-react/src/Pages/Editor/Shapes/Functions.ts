import React from "react";
import { Text } from 'konva/lib/shapes/Text';
import { DragonModel } from "../../../dragon/dragon.model/dragon.model";


export function Updatetext(textRef: Text, id: string, model: DragonModel){
    if(textRef){
        const textPosition = textRef.getAbsolutePosition();

    const areaPosition = {
      x: textPosition.x + 300,
      y: textPosition.y,
    };

    // create textarea and style it
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = textRef.text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width = textRef.width().toString();

    textarea.focus();
    textarea.addEventListener('keydown',(e)=>{
        if (e.keyCode === 13) {
            textRef!.text(textarea.value);
            model.getInstruction(id).text = textRef!.text();
            document.body.removeChild(textarea);
          }
    });

}
}