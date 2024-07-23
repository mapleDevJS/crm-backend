import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose';
import { PORT, MONGODB_URI, MONGODB_CONFIG } from './config';

const app = express();

function startServer(port) {
    app.listen(port, () => {
        console.log(`Your server is running on port ${port}`);
    });
}

// Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, MONGODB_CONFIG);

// Express body parser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
routes(app);

// Server listening
startServer(PORT);
