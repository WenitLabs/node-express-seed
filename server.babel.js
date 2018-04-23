import path from 'path';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import Config from './config';
import App from './src/app';

const app = express();
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/healthz', (req, res) => {
  res.send(`${new Date()}`);
});

App.routes(app);

const port = process.env.PORT || Config.get('server.port', 8080);
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Node.js app is running at http://localhost:${port}/`);
});
