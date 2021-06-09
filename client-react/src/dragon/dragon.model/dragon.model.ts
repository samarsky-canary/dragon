import {v4 as uuidv4} from "uuid";

export const InstructionType = {
    SCHEMA : "schema",
    PRIMITIVE : "primitive",
    ACTION : "action",
    CONDITION: "condition",
    BRANCH: "branch",
    INPUT: "input",
    OUTPUT: "output",
    LOOP: "loop",
    SWITCH: 'switch',
    COMMENT: 'comment',
    SLEEP: 'sleep'
} as const



abstract class DragonInstruction {
    type: string;
    id: string;
    parent: string;
    text: string;
    // вложенные инструкции
    children: DragonInstruction[];

    constructor(type: string, parent: string) {
        this.type = type;
        this.parent = parent;
        this.text = "";
        this.id = uuidv4();
        this.children = [];
    }

    public Add(instruction : DragonInstruction, uuid_next?: string) {
        if (uuid_next) {
            const pos = this.children.findIndex((element)=>{
                return element.id === uuid_next
            });
            this.children.splice(pos,0,instruction);
        } else {
            this.children.push(instruction)
        }
    }

    public Remove(uuid: string) {
        const pos = this.children.findIndex((element)=>{
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

export class DragonSleepInstruction extends DragonInstruction {
    constructor(parent: string) {
        super(InstructionType.SLEEP,parent);
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

export class DragonCommentInstruction extends DragonInstruction {
    constructor(parent: string) {
        super(InstructionType.COMMENT,parent);
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

export class DragonLoopInstruction extends DragonInstruction{
    constructor(parent: string) {
        super(InstructionType.LOOP,parent);
        this.Add(new DragonBranchInstruction(this.id));
    }
}

export class DragonSwitchInstruction extends DragonInstruction{
    constructor(parent: string) {
        super(InstructionType.SWITCH,parent);
        this.Add(new DragonBranchInstruction(this.id));
        this.Add(new DragonBranchInstruction(this.id));
    }

    addBranch(branch: DragonBranchInstruction){
        throw new Error('Not implemented');
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


export class DragonModel {
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

    public Insert(instruction : DragonInstruction, next?: string) : void{
        
        this.containers.get(instruction.parent)?.Add(instruction,next);
        this.containers.set(instruction.id, instruction);
        switch(instruction.type){

            case InstructionType.CONDITION:
                {
                    const ifInstruction = instruction.children[0];
                    const elseInstruction = instruction.children[1];
                    this.containers.set(ifInstruction.id, ifInstruction);
                    this.containers.set(elseInstruction.id, elseInstruction);
                }
                break;            

            case InstructionType.LOOP:
                instruction.children.forEach(value => {
                    const branch = value;
                    this.containers.set(value.id,value);
                })
                break;
            case InstructionType.BRANCH:
                throw new Error('manual branch insert not allowed');
            default:
                
                break;
        }
        
    }

    public toJSON() : JSON{
        const jsonOjb = Object.create(null);
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


    public getInstruction(uuid: string){
        return this.containers.get(uuid);
    }

    public Update(uuid: string, text: string) {
        Promise.resolve(this.containers.get(uuid)).then(container =>
            {
                if (container)
                    container.text = text;
                else 
                    throw new Error ("Instruction not found")  
            }).catch(err => 
                console.log(err));
    }



    public parseInstruction(instruction: DragonInstruction, code: string, deep = 0) : string {
        const offset = '\t'.repeat(deep);
        switch (instruction.type) {
            case InstructionType.SCHEMA:
                code = `[${instruction.children[0].id}]\n`;
                code = this.parseInstruction(instruction.children[0], code, ++deep);
                break;

            case InstructionType.PRIMITIVE:
                {
                    let stringOfChildren = "";
                    instruction.children.forEach((value)=>{
                        stringOfChildren+=`${offset}[${value.id}]\n`;
                    })
                    const generatedCode = `function ${instruction.text}() {\n${stringOfChildren}\n}`
                    code = code.replace(`[${instruction.id}]`, generatedCode);
                    instruction.children.forEach((value)=>{
                        code = this.parseInstruction(value,code, ++deep);
                    })
                }
                break;

                case InstructionType.ACTION:
                    if (instruction.text !== "")
                        code = code.replace(`[${instruction.id}]`, instruction.text + ";");
                    break;

                case InstructionType.COMMENT:
                    if (instruction.text !== "")
                        code = code.replace(`[${instruction.id}]`, `/*${instruction.text}*/`);
                    break;
                
                case InstructionType.OUTPUT:
                    if (instruction.text !== "")
                        code = code.replace(`[${instruction.id}]`, `console.log(${instruction.text});`);
                    break;

                case InstructionType.INPUT:
                    if (instruction.text !== "")
                        code = code.replace(`[${instruction.id}]`, `console.log(${instruction.text});`);
                    break;

                // Condition SCOPES if {inner} else {inner2}
                case InstructionType.CONDITION:
                    {
                        const arrayOfChildren : string[]= [];
                        instruction.children.forEach((value)=>{
                            arrayOfChildren.push(`\t[${value.id}]\n`);
                        })
                        const generatedCode = `if (${instruction.text}) {\n\t${arrayOfChildren[0]}\t} else {\n\t${arrayOfChildren[1]}\t}`
                        code = code.replace(`[${instruction.id}]`, generatedCode);
                        instruction.children.forEach((value)=>{
                            code = this.parseInstruction(value,code, ++deep);
                        })
                    }
                    break;

                // Condition SCOPES if {inner} else {inner2}
                case InstructionType.LOOP:
                    {
                        const generatedCode = `while (${instruction.text}) {\n\t[${instruction.children[0].id}]\t}`
                        code = code.replace(`[${instruction.id}]`, generatedCode);
                        code = this.parseInstruction(instruction.children[0], code, ++deep);
                    }
                    break;

                    // BRANC SCOPES {inner}
                    case InstructionType.BRANCH:
                    {
                        let stringOfChildren = "";
                        instruction.children.forEach((value)=>{
                            stringOfChildren+=`[${value.id}]\n`;
                        })
                        const generatedCode = stringOfChildren;
                        code = code.replace(`[${instruction.id}]`, generatedCode);
                        instruction.children.forEach((value)=>{
                            code = this.parseInstruction(value,code);
                        })
                    }
                    break;

            default:
                break;
        }
        return code;
    }

    public toJavaScript() : string{
        const code = ``;
        return this.parseInstruction(this.containers.get(this.head)!, code);
    }
}

type metadataInterface = {
    type: string;
    parent: string;
    text: string;
    children: Array<string>
}