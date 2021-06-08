import { type } from "os";
import {v4 as uuidv4} from "uuid";

export const InstructionType = {
    SCHEMA : "schema",
    PRIMITIVE : "primitive",
    ACTION : "action",
    CONDITION: "condition",
    BRANCH: "branch",
    INPUT: "input",
    OUTPUT: "output",
} as const



abstract class DragonInstruction {
    type: string;
    id: string;
    parent: string;
    text: string = "";
    // вложенные инструкции
    children: DragonInstruction[];

    constructor(type: string, parent: string, resolve_id?: string) {
        this.type = type;
        this.parent = parent;
        this.id = uuidv4();
        this.children = [];
    }

    public Add(instruction : DragonInstruction, uuid_next?: string) {
        if (uuid_next) {
            const pos = this.children.findIndex((element,index,array)=>{
                return element.id === uuid_next
            });
            this.children.splice(pos,0,instruction);
        } else {
            this.children.push(instruction)
        }
    }

    public Remove(uuid: string) {
        const pos = this.children.findIndex((element,index,array)=>{
            return element.id === uuid
        });
        this.children.splice(pos,1);
    }


    public Find (uuid: string) {
        if (this.id === uuid) {
            return this;
        } else {
            this.children.forEach(element => {
                element.Find(uuid);
            });
        }
    }

}



export class DragonActionInstruction extends DragonInstruction {
    constructor(parent: string) {
        super(InstructionType.ACTION,parent);
    }
}


export class DragonInputInstruction extends DragonInstruction {
    constructor(parent: string) {
        super(InstructionType.INPUT,parent);
    }
}

export class DragonOutputInstruction extends DragonInstruction {
    constructor(parent: string) {
        super(InstructionType.OUTPUT,parent);
    }
}


class DragonBranchInstruction extends DragonInstruction {
    constructor(parent: string) {
        super(InstructionType.BRANCH,parent);
    }
}

export class DragonConditionInstruction extends DragonInstruction{
    constructor(parent: string) {
        super(InstructionType.CONDITION,parent);
        //if
        this.Add(new DragonBranchInstruction(this.id));
        //else
        this.Add(new DragonBranchInstruction(this.id));
    }
}

class DragonSchemaInstruction extends DragonInstruction{
    constructor() {
        super(InstructionType.SCHEMA, "")
    }
}


class DragonPrimitiveIstruction extends DragonInstruction{
    constructor(parent: string) {
        super(InstructionType.PRIMITIVE, parent)
        this.text ="Start";
    }
}


export class DragonSchema2 {
    head: string
    containers: Map<string,DragonInstruction> = new Map();

    constructor() {
        const dragonInstruction = new DragonSchemaInstruction();
        this.head = dragonInstruction.id;
        this.containers.set(
            dragonInstruction.id,
            dragonInstruction
        )
        this.Insert(new DragonPrimitiveIstruction(this.head));
    }

    public Insert(instruction : DragonInstruction, next?: string) {
        switch(instruction.type){

            case InstructionType.CONDITION:
                this.containers.get(instruction.parent)?.Add(instruction,next);
                const ifInstruction = instruction.children[0];
                const elseInstruction = instruction.children[1];

                this.containers.set(instruction.id, instruction);
                this.containers.set(ifInstruction.id, ifInstruction);
                this.containers.set(elseInstruction.id, elseInstruction);
                break;
            

            case InstructionType.BRANCH:
                throw new Error('manual branch insert not allowed');
            default:
                this.containers.get(instruction.parent)?.Add(instruction,next);
                this.containers.set(instruction.id, instruction);
                break;
        }
        
    }

    public toJSON() {
        let jsonOjb = Object.create(null);
        jsonOjb.head = this.head;
        this.containers.forEach((value,key)=> {

            const arr:string[] = [];
            value.children.forEach((value,key)=>{
                arr.push(value.id)
            })
            const iconD : metadataInterface = {
                type: value.type,
                text: value.text,
                parent: value.parent,
                children: arr
            }
            jsonOjb[key] = iconD;
        })

        return(jsonOjb);
        
    }

    public Delete(parent: string, uuid: string) {
        this.containers.get(parent)?.Remove(uuid);
        this.containers.delete(uuid);
    }

    public Find(uuid: string) {
        return this.containers.get(this.head)?.Find(uuid);
    }


    public getInstruction(uuid: string) {
        return this.containers.get(uuid);
    }

    public Update(uuid: string, text: string) {
        this.containers.get(uuid)!.text = text;
    }



    public parseInstruction(instruction: DragonInstruction, code: string, deep: number = 0) : string {
        const offset = '\t'.repeat(deep);
        switch (instruction.type) {
            case InstructionType.SCHEMA:
                code = `[${instruction.children[0].id}]\n`;
                code = this.parseInstruction(instruction.children[0], code, ++deep);
                break;

            case InstructionType.PRIMITIVE:
                let stringOfChildren:string = "";
                instruction.children.forEach((value,key)=>{
                    stringOfChildren+=`${offset}[${value.id}]\n`;
                })
                let generatedCode = `function ${instruction.text}() {\n${stringOfChildren}\n}`
                code = code.replace(`[${instruction.id}]`, generatedCode);
                instruction.children.forEach((value,key)=>{
                    code = this.parseInstruction(value,code, ++deep);
                })
                break;

                case InstructionType.ACTION:
                    if (instruction.text !== "")
                        code = code.replace(`[${instruction.id}]`, instruction.text + ";");
                    break;
                

                case InstructionType.OUTPUT:
                    if (instruction.text !== "")
                        code = code.replace(`[${instruction.id}]`, `console.log(${instruction.text});`);
                    break;

                // Condition SCOPES if {inner} else {inner2}
                case InstructionType.CONDITION:
                    let arrayOfChildren : string[]= [];
                    instruction.children.forEach((value,key)=>{
                        arrayOfChildren.push(`\t[${value.id}]\n`);
                    })
                    generatedCode = `if (${instruction.text}) {\n\t${arrayOfChildren[0]}\t} else {\n\t${arrayOfChildren[1]}\t}`
                    code = code.replace(`[${instruction.id}]`, generatedCode);
                    instruction.children.forEach((value,key)=>{
                        code = this.parseInstruction(value,code, ++deep);
                    })
                    break;

                    // BRANC SCOPES {inner}
                    case InstructionType.BRANCH:
                    stringOfChildren = "";
                    instruction.children.forEach((value,key)=>{
                        stringOfChildren+=`[${value.id}]\n`;
                    })
                    generatedCode = stringOfChildren;
                    code = code.replace(`[${instruction.id}]`, generatedCode);
                    instruction.children.forEach((value,key)=>{
                        code = this.parseInstruction(value,code);
                    })
                    break;

            default:
                break;
        }
        return code;
    }

    public toJavaScript() : string{
        let code = ``;
        return this.parseInstruction(this.containers.get(this.head)!, code);
    }
}

type metadataInterface = {
    type: string;
    parent: string;
    text: string;
    children: Array<string>
}