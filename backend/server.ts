import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import sequelize from './services/sequelize';
import productRoute from './routes/product.route';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/api', productRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});