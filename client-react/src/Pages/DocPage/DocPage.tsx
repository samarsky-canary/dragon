import React, { FC, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Markdown from 'markdown-to-jsx';

export const DocPage: FC = () => {

    const file_name = 'TODO.md';
    const [post, setPost] = useState('');

    useEffect(() => {
        import(`./${file_name}`)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setPost(res))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });


    return (
        <Container>
            <Markdown>{post}</Markdown>
        </Container>
    )
}
