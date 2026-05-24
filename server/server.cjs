const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { PORT } = require('./config/env.js');
const connectDb = require('./config/db.js');
const adminRoutes = require('./routes/adminRoutes.js');
const blogRoutes = require('./routes/blogRoutes.js');

const app = express();

// Connect to DB (async, but we can ignore awaiting in CJS context)
connectDb().catch(err => console.error('DB connection error:', err));

// Middlewares
app.use(cors());
app.use(express.json());

// Netlify path rewrite middleware
app.use((req, res, next) => {
  if (req.url.startsWith('/.netlify/functions/api')) {
    req.url = req.url.replace('/.netlify/functions/api', '');
  }
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to QuickBlog API');
});
app.use('/api/admin', adminRoutes);
app.use('/api/blog', blogRoutes);

if (!process.env.NETLIFY) {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}

module.exports = app;
