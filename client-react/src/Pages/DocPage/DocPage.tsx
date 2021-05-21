import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { DragonSchema } from '../../drakon_schema/dragon.schema';
import { IconAction } from '../../drakon_schema/icon.model';
import { DrgTranslationSave } from '../../drakon_schema/translator';



const schema = new DragonSchema();
function myFunc(schema: DragonSchema) {
    const action = new IconAction();
     action.text = "let a = 10";
     schema.Insert(action,schema._head.id);
     console.log(schema.toJson());
    
     const iconToUpdate = schema.Get(schema._head.id);
     if (iconToUpdate !== undefined) {
        iconToUpdate.text = "Schema name";
        schema.Update(iconToUpdate)
     }
}
myFunc
export const DocPage: FC = () => {
    return (
        <div>
            <Button variant="btn btn-primary btn-block" onClick={() => { handleSubmit(); }}>Download</Button>{' '}
        </div>
    )
}

function handleSubmit() {
    DrgTranslationSave(schema);
}
