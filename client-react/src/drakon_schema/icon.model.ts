import {v4 as uuidv4} from 'uuid';


export class Icon {
    public type!: string;
    public id!: string;
    private text!: string;

    constructor(type: string) {
        this.type = type;
        this.id = uuidv4();
    }

    public updateText(text: string) : string {
        this.text = text;
        return this.text;
    }

}