import { Icon, IconBegin, IconEnd, IconIf } from "./icon.model";


export class DragonSchema {
    public _head: IconBegin;
    public _storage: Map<string, Icon>;

    constructor(){
        const end = new IconEnd();
        this._head = new IconBegin();
        this._head.next = end.id;
        this._storage = new Map([
            [this._head.id, this._head],
            [end.id, end],
        ]);
    }

    // eslint-disable-next-line
    public toJson() {
        return Object.fromEntries(this._storage);
    }

    // eslint-disable-next-line
    public InsertIf(toInsert: IconIf, whereToInsert: string) {
        const ancestor = this._storage.get(whereToInsert);
        if (ancestor) {
            toInsert.next = ancestor.next;
            ancestor.next = toInsert.id;
        }
        this._storage.set(toInsert.id, toInsert);
    }

    // eslint-disable-next-line
    public Insert(toInsert: Icon, whereToInsert: string ) {
        const ancestor = this._storage.get(whereToInsert);
        if (ancestor) {
            toInsert.next = ancestor.next;
            ancestor.next = toInsert.id;
        }
        this._storage.set(toInsert.id, toInsert);
    }

    // eslint-disable-next-line
    public Update(icon: Icon) {
        if (!this._storage.has(icon.id))
            throw new Error('icon not exists');
        this._storage.set(icon.id, icon);
    }

    public Get(id: string) : Icon | undefined{
        return this._storage.get(id);
    }

    public ToString(): string {
        let result ="";
        let endFlag = false;
        let current = this._head.id;
        while (!endFlag) {
            const icon = this._storage.get(current);
            if (icon === undefined)
                throw new Error("invalid icon id");
            result += `${icon.type}  ${icon.id}\n`;
            result += `${icon.text} ${icon.next}\n`;
            current = icon.next;
            if (current === "")
                endFlag = true;
        }
        return result;
    }
}