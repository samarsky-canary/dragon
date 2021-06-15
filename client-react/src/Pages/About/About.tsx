import React, { FC, useEffect } from 'react';



export const About : FC = () => {

    useEffect(() => {
        document.title = "О продукте"
    },[]);

    
    return(
        <div>About</div>
    );
}