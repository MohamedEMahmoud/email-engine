import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SECRET_KEY!, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
