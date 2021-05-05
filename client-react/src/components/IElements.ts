export interface IElement {
    type: string;
    coord: number[]; // [x1, y1, x2, y2, ... xN, yN]
    matrix: number[];
    layers: number[];
    groupId: number;
    anchor: number;
    msg: string; // bubble message
  }
  
  export interface IColorBox {
    pos: number; // color position
    color: string; // #HEXA
  }
  
  export interface IFillBox {
    fillType: number;
    colorBoxes: IColorBox[];
  }
  
  export interface IFont {
    size: number;
    family: string;
    weight: number;
    style: string;
    decoration: string;
  }
  
  // ---- interfejsy rysowanych elementów ----
  
  export interface ILine extends IElement {
    stroke: {
      color: string;
      width: number;
      linecap: number;
      dashstyle: number;
    };
  }
  
  export interface IText extends IElement {
    text: string[]; // nowa linia == nowy element tablicy
    fill: string; //#HEXA
    fillBoxes: IFillBox[];
    font: IFont;
    align: {
      h: number; // horizontal
      v: number; // vertical
    };
    // lockedInSh: number; // lockedShinsh - blokada w schematach pochodnych
  }
  
  export function createLine(element: ILine) {
    console.log(element);
  }
  
  export function createElement(element: IElement) {
    console.log(element);
  }
  