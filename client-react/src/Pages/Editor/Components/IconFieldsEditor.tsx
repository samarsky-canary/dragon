import React from 'react';
import { Card, InputGroup, FormControl } from 'react-bootstrap';

type Props = {
    text: string | undefined;
    setText: (value: string) => void

}

export const IconFieldsEditor : React.FC<Props> = ({text,setText}) => {

    return(
        <Card>
        <Card.Header>Содержимое иконы</Card.Header>
        <Card.Body>
            <InputGroup className="icon-content-form">
                <FormControl
                    placeholder="Содержимое иконы"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={text}
                />
            </InputGroup>
        </Card.Body>
    </Card>
    )
}