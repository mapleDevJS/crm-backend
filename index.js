import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose';

const app = express();
const PORT = 4000;
const MONGODB_URI = 'mongodb://localhost/CRMdb';

// Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Express body parser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

// Extracted route handler
const rootHandler = (req, res) => {
    res.send(`Node and express server running on port ${PORT}`);
};

// Root endpoint
app.get('/', rootHandler);

// Server listening
app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
});
