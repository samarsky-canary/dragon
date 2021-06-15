import React, { FC } from 'react';
import { Alert } from 'react-bootstrap';



export const NotFoundPage : FC = () => {
    return (
        <Alert variant="danger" dismissible>
        <Alert.Heading>Error 404: Not Found!</Alert.Heading>
        <p>
          Это не та страница, которую ты ищешь!
        </p>
      </Alert>
    )
}