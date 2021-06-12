import { v4 as uuidv4 } from "uuid";

export const InstructionType = {
    SCHEMA: "schema",
    PRIMITIVE: "primitive",
    ACTION: "action",
    CONDITION: "condition",
    BRANCH: "branch",
    INPUT: "input",
    OUTPUT: "output",
    LOOP: "loop",
    SWITCH: 'switch',
    COMMENT: 'comment',
    SLEEP: 'sleep'
} as const



export class DragonInstruction {
    type: string;
    id: string;
    parent: string;
    text: string;
    offset: number;
    // вложенные инструкции
    children: DragonInstruction[];

    constructor(type: string, parent: string) {
        this.type = type;
        this.parent = parent;
        this.text = "";
        this.id = uuidv4();
        this.children = [];
        this.offset = 0;
    }

    public setMeta(meta: metadataInterface) {
        this.type = meta.type;
        this.parent = meta.parent;
        this.text = meta.text;
    }

    public Add(instruction: DragonInstruction, uuid_next?: string) {
        if (uuid_next) {
            const pos = this.children.findIndex((element) => {
                return element.id === uuid_next
            });
            this.children.splice(pos, 0, instruction);
        } else {
            this.children.push(instruction)
        }
    }

    public Remove(uuid: string) {
        const pos = this.children.findIndex((element) => {
            return element.id === uuid
        });
        this.children.splice(pos, 1);
    }

    public Find(uuid: string) {
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
        super(InstructionType.ACTION, parent);
    }
}

export class DragonSleepInstruction extends DragonInstruction {
    constructor(parent: string) {
        super(InstructionType.SLEEP, parent);
    }
}

export class DragonInputInstruction extends DragonInstruction {
    constructor(parent: string) {
        super(InstructionType.INPUT, parent);
    }
}

export class DragonOutputInstruction extends DragonInstruction {
    constructor(parent: string) {
        super(InstructionType.OUTPUT, parent);
    }
}

export class DragonCommentInstruction extends DragonInstruction {
    constructor(parent: string) {
        super(InstructionType.COMMENT, parent);
    }
}

export class DragonBranchInstruction extends DragonInstruction {
    constructor(parent: string) {
        super(InstructionType.BRANCH, parent);
    }
}

export class DragonConditionInstruction extends DragonInstruction {
    constructor(parent: string, restore?: boolean) {
        super(InstructionType.CONDITION, parent);
        if (restore) {
            return;
        }
        //if
        this.Add(new DragonBranchInstruction(this.id));
        //else
        this.Add(new DragonBranchInstruction(this.id));
    }
}

export class DragonLoopInstruction extends DragonInstruction {
    constructor(parent: string, restore?: boolean) {
        super(InstructionType.LOOP, parent);
        if (restore) {
            return
        }
        this.Add(new DragonBranchInstruction(this.id));
    }
}

export class DragonSwitchInstruction extends DragonInstruction {
    constructor(parent: string) {
        super(InstructionType.SWITCH, parent);
        this.Add(new DragonBranchInstruction(this.id));
        this.Add(new DragonBranchInstruction(this.id));
    }

    addBranch(branch: DragonBranchInstruction) {
        throw new Error('Not implemented');
    }
}

export class DragonSchemaInstruction extends DragonInstruction {
    constructor() {
        super(InstructionType.SCHEMA, "")
    }
}

export class DragonPrimitiveIstruction extends DragonInstruction {
    constructor(parent: string) {
        super(InstructionType.PRIMITIVE, parent)
        this.text = "Start";
    }
}


export class DragonModel {
    head: string
    containers: Map<string, DragonInstruction> = new Map();

    constructor() {
        const dragonInstruction = new DragonSchemaInstruction();
        this.head = dragonInstruction.id;
        this.containers.set(
            dragonInstruction.id,
            dragonInstruction
        )
        this.Insert(new DragonPrimitiveIstruction(this.head));
    }

    public Insert(instruction: DragonInstruction, next?: string): void {

        this.containers.get(instruction.parent)?.Add(instruction, next);
        this.containers.set(instruction.id, instruction);
        switch (instruction.type) {

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
                    this.containers.set(value.id, value);
                })
                break;
            case InstructionType.BRANCH:
                throw new Error('manual branch insert not allowed');
            default:

                break;
        }

    }

    public toJSON(): JSON {
        const jsonOjb = Object.create(null);
        jsonOjb.head = this.head;
        this.containers.forEach((value, key) => {

            const arr: string[] = [];
            value.children.forEach((value, key) => {
                arr.push(value.id)
            })
            const iconD: metadataInterface = {
                type: value.type,
                text: value.text,
                parent: value.parent,
                offset: value.offset,
                children: arr
            }
            jsonOjb[key] = iconD;
        })

        return (jsonOjb);

    }


    private seOffset(instruction: DragonInstruction) {
        const parent = this.containers.get(instruction.parent);
        if (parent) {
            switch (instruction.type) {
                case InstructionType.BRANCH:
                    instruction.offset = parent.offset + parent.children.findIndex((value) => { return value === instruction });
                    break;
                case InstructionType.PRIMITIVE:
                    instruction.offset = parent.offset + parent.children.findIndex((value) => { return value === instruction });
                    break;
                default:
                    instruction.offset = parent.offset;
            }
        }
        const children = instruction.children;
        children.forEach((value) => {
            this.seOffset(value);
        })
    }

    public setInstructionsOffset() {
        this.seOffset(this.containers.get(this.head)!)
    }

    public Delete(parent: string, uuid: string) {
        this.containers.get(parent)?.Remove(uuid);
        this.containers.delete(uuid);
    }

    public Find(uuid: string) {
        return this.containers.get(this.head)?.Find(uuid);
    }


    public getInstruction(uuid: string) {
        if (this.containers.get(uuid)){
            return this.containers.get(uuid)!;
        } else {
            throw new Error("instruction with id not found");
        }
    }

    public Update(uuid: string, text: string) {
        Promise.resolve(this.containers.get(uuid)).then(container => {
            if (container)
                container.text = text;
            else
                throw new Error("Instruction not found")
        }).catch(err =>
            console.log(err));
    }


    private castInstruction<T extends DragonInstruction>(instruction: T, instruction_meta: metadataInterface) {
        const val = instruction as T;
        val.id = instruction_meta.id!;
        val.text = instruction_meta.text;
        val.parent = instruction_meta.parent;
        this.containers.set(val.id, val);
        if (val.parent) {
            this.containers.get(val.parent)?.children.push(val);
        }
    }



    private parseInstructionFromJSON(instruction_id: string, schema: any) {
        const instruction: metadataInterface = schema[instruction_id];
        instruction.id = instruction_id;

        switch (instruction.type) {
            case InstructionType.SCHEMA:
                this.castInstruction(new DragonSchemaInstruction(), instruction);
                break;

            case InstructionType.PRIMITIVE:
                this.castInstruction(new DragonPrimitiveIstruction(instruction.parent), instruction);
                break;

            case InstructionType.BRANCH:
                this.castInstruction(new DragonBranchInstruction(instruction.parent), instruction);
                break;

            case InstructionType.ACTION:
                this.castInstruction(new DragonActionInstruction(instruction.parent), instruction);
                break;

            case InstructionType.COMMENT:
                this.castInstruction(new DragonCommentInstruction(instruction.parent), instruction);
                break;

            case InstructionType.CONDITION:
                this.castInstruction(new DragonConditionInstruction(instruction.parent, true), instruction);
                break;

            case InstructionType.INPUT:
                this.castInstruction(new DragonInputInstruction(instruction.parent), instruction);
                break;

            case InstructionType.LOOP:
                this.castInstruction(new DragonLoopInstruction(instruction.parent, true), instruction);
                break;

            case InstructionType.OUTPUT:
                this.castInstruction(new DragonOutputInstruction(instruction.parent), instruction);
                break;

            case InstructionType.SLEEP:
                this.castInstruction(new DragonSleepInstruction(instruction.parent), instruction);
                break;

            case InstructionType.SWITCH:
                this.castInstruction(new DragonSwitchInstruction(instruction.parent), instruction);
                break;

        }
        const children: string[] = instruction.children;
        children.forEach((value) => {
            this.parseInstructionFromJSON(value, schema);
        })
    }

    static restoreFromJSON(schema: any) {
        const restored = new DragonModel();
        restored.restoreFromJSON(schema);
        return restored;
    }

    public restoreFromJSON(schema: any) {
        this.head = schema.head;
        this.containers.clear(); // clear previos state
        this.parseInstructionFromJSON(this.head, schema);

    }

    public parseInstruction(instruction: DragonInstruction, code: string, deep = 0): string {
        const offset = '\t'.repeat(deep);
        switch (instruction.type) {
            case InstructionType.SCHEMA:
                code = `[${instruction.children[0].id}]\n`;
                code = this.parseInstruction(instruction.children[0], code, ++deep);
                break;

            case InstructionType.PRIMITIVE:
                {
                    let stringOfChildren = "";
                    instruction.children.forEach((value) => {
                        stringOfChildren += `${offset}[${value.id}]\n`;
                    })
                    const generatedCode = `function ${instruction.text}() {\n${stringOfChildren}\n}`
                    code = code.replace(`[${instruction.id}]`, generatedCode);
                    instruction.children.forEach((value) => {
                        code = this.parseInstruction(value, code, ++deep);
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
                    const arrayOfChildren: string[] = [];
                    instruction.children.forEach((value) => {
                        arrayOfChildren.push(`\t[${value.id}]\n`);
                    })
                    const generatedCode = `if (${instruction.text}) {\n\t${arrayOfChildren[0]}\t} else {\n\t${arrayOfChildren[1]}\t}`
                    code = code.replace(`[${instruction.id}]`, generatedCode);
                    instruction.children.forEach((value) => {
                        code = this.parseInstruction(value, code, ++deep);
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
                    instruction.children.forEach((value) => {
                        stringOfChildren += `[${value.id}]\n`;
                    })
                    const generatedCode = stringOfChildren;
                    code = code.replace(`[${instruction.id}]`, generatedCode);
                    instruction.children.forEach((value) => {
                        code = this.parseInstruction(value, code);
                    })
                }
                break;

            default:
                break;
        }
        return code;
    }

    public toJavaScript(): string {
        const code = ``;
        return this.parseInstruction(this.containers.get(this.head)!, code);
    }
}

type metadataInterface = {
    id?: string;
    type: string;
    parent: string;
    offset: number;
    text: string;
    children: Array<string>
}