
    import React, { FC, createContext } from 'react';
        



    interface KonvaContextProps {
        konvaRefs: Map<string, React.MutableRefObject<undefined>>;
        setKonvaRefs: (value : Map<string, React.MutableRefObject<undefined>>) => void;
        WIDTH: number;
        HEIGHT: number;
      }

    export const KonvaContext = createContext({} as KonvaContextProps);
    
      
    // eslint-disable-next-line
    export const KonvaProvider : FC = (props: any) => {
    const [konvaRefs, setKonvaRefs] = React.useState<Map<string, React.MutableRefObject<undefined>>>(new Map<string, React.MutableRefObject<undefined>>());
    const WIDTH = 160;
    const HEIGHT = 40;
        return(
            <KonvaContext.Provider value={{konvaRefs, setKonvaRefs, WIDTH, HEIGHT}}>
                {props.children}
            </KonvaContext.Provider>
        )
    }