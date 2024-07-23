import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose';
import { PORT, MONGODB_URI, MONGODB_CONFIG } from './config';

const app = express();

// Callback for server start
const serverStartMessage = (port) => {
    console.log(`Your server is running on port ${port}`);
};

// Function for starting Express server
const startExpressServer = (port, message) => {
    return app.listen(port, () => message(port));
};

// Function to initialize database
const initializeDatabase = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGODB_URI, MONGODB_CONFIG);
};

// Function to configure body parser
const configureBodyParser = () => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
};

// Server setup
initializeDatabase();
configureBodyParser();
routes(app);
startExpressServer(PORT, serverStartMessage);
