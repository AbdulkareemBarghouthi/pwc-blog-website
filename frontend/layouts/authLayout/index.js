import React from 'react';
import { Container } from './styles';

const AuthLayout = (props) => {
    return (
        <Container>
            {props.children}
        </Container>
    )
}

export default AuthLayout;