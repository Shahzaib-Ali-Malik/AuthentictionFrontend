import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express'
import app from './app/app.js'
import config from './config/config.js'
import connectDB from './config/db.js';

await connectDB()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../../client/dist'); // Change 'dist' to 'build' if your client uses build
  
  app.use(express.static(clientPath)); // Note: make sure express is imported or available, or put this inside app/app.js where express is initialized

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

app.listen(config.PORT,()=>{
    console.log(`Server is running on port ${config.PORT}`);
})