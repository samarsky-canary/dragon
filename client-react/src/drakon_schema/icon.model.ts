import {v4 as uuidv4} from 'uuid';
import { IconTypes } from './icon.enums';


class D3cords {
    x!: number;
    y!: number;
}

export abstract class Icon extends D3cords {
    public type!: string;
    public id!: string;
    public text!: string;
    public next!: string;

    constructor(type: string) {
        super()
        if (type in IconTypes){
            this.type = type;
            this.id = uuidv4();
        } else {
            throw new TypeError("invalid type")
        }
    }

    public updateText(text: string) : string {
        this.text = text;
        return this.text;
    }

}

export class IconBegin extends Icon {
    constructor() {
        super(IconTypes.BEGIN);
    }
}


export class IconEnd extends Icon {
    public prev!: string;
    constructor() {
        super(IconTypes.END);
        this.next = "";
    }
}


export class IconAction extends Icon {
    constructor() {
        super(IconTypes.ACTION);
    }
}

export class IconSeparator extends Icon {
    constructor() {
        super(IconTypes.SEPARATOR);
    }
}

export class IconIf extends Icon {
    public else!: string;
    constructor() {
        super(IconTypes.SEPARATOR);
    }
}

export class IconIfEnd extends Icon {
    public icon_if!: string;
    constructor() {
        super(IconTypes.SEPARATOR);
    }
}