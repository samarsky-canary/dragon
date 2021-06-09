import { DragonActionInstruction, DragonCommentInstruction, DragonConditionInstruction, DragonLoopInstruction, DragonOutputInstruction, DragonModel } from "./dragon.model";


const schema = new DragonModel();
const PrimitiveRef = schema.containers.get(schema.head)?.children[0].id;

const Action = new DragonActionInstruction(PrimitiveRef!);
Action.text="let simple = 10"
schema.Insert(Action);

var id : string = "";
test(('Schema Init'),()=>{
    const Action2 = new DragonActionInstruction(PrimitiveRef!);
    Action2.text = "simple = (simple++)*2"
    schema.Insert(Action2);
});

test(('Schema Test2'),()=>{
    const condition = new DragonConditionInstruction(PrimitiveRef!);
    condition.text = "simple === 22"
    schema.Insert(condition)

    const loop = new DragonLoopInstruction(condition.children[0].id!);
    loop.text
    loop.text = "simple > 22"
    schema.Insert(loop);

    id = condition.children[0].id;

    const action = new DragonActionInstruction(id);
    action.text = "simple++"
    schema.Insert(action)

    const action3 = new DragonActionInstruction(id);
    action3.text = "simple+1"
    schema.Insert(action3)


    id = condition.children[1].id;
    const action2 = new DragonActionInstruction(id);
    action2.text = "simple--"
    schema.Insert(action2);

    const output = new DragonOutputInstruction(PrimitiveRef!);
    output.text = ("simple");
    schema.Insert(output);


    const comment = new DragonCommentInstruction(id);
    comment.text="my sample comment";
    schema.Insert(comment);

});

test(('Schema Test3'),()=>{
    console.log(schema.toJavaScript());
    const str = JSON.stringify(schema);
    const obj = JSON.parse(str);
});
