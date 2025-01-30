const express = require("express");
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
// Route files
const corsOptions = require('./config/corsoption')
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const placesRoutes = require("./Routes/places");
const subscriberRouter = require('./Routes/subscriber');
const destinationRoutes = require('./Routes/destination');
const blogRoutes = require('./Routes/BlogRouter');
const contactRouter = require('./Routes/ContactRouter');
require('dotenv').config();
require('./Models/db');
const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// API routes
app.use("/api/places", placesRoutes);
app.use('/api/destination', destinationRoutes);
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/api/subscribers', subscriberRouter);
app.use('/api/blogs', blogRoutes); 
app.use('/api/contact', contactRouter);

app.get("/about", (req,res) => {
  res.status(200).send("About Page");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
