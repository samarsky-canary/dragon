import React, { useEffect } from 'react';
import { D3Sample } from '../../components/Sheet';


export const EditorPage: React.FC = () => {


    useEffect(() => {
        document.title = "DRAKON IDE"
    });
    return (
        <div>
            <D3Sample />
        </div>
    );
}