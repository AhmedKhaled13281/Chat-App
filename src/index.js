import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Container } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
            <Container>
                <Provider store={store}>
                    <App />
                </Provider>
            </Container>
    </BrowserRouter>
);


