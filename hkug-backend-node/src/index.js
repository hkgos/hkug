import minimist from 'minimist';
import express from 'express';
import bodyParser from 'body-parser';

import topics from './routers/topics';

const argv = minimist(process.argv.slice(2));

const { port = 8081 } = argv;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', topics);

// TODO: Add error handler / not implemented handler / 404 handler / proxy handler etc...

app.listen(port, () => console.log(`Server started on port: ${port}...`));
