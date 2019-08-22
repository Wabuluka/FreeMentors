import  dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './api/routes/routes';
import morgan from 'morgan';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(routes);

const port = process.env.PORT || 8080;

// when a random route is inputed
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow_Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-Width');
    next();
  });
 
 
 app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
 });
 
 
 export default app;
