import express from 'express';
import routes from '../Api';

export default ({ app }: { app: express.Application }) => {
    app.use('/api', routes)
};