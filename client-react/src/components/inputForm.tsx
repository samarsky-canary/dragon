import React from 'react';
import { iText } from '../interfaces/text.interface';



export const InputForm : React.FC<iText> = (props : iText) => {
    const type = props.isPassword ? "password" : "text";

    return(
        <div>
            <input type={type} value={props.textValue}/>
        </div>
    )
}