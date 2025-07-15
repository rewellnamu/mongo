const express = require('express');
const path = require('path');
const { connectToDB, getCollection } = require('./db');

const app = express();
const PORT = 3000;
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'front')));

(async () => {
  await connectToDB();

  app.post('/api/users', async (req, res) => {
    try {
      const { name, email, kidato, adm } = req.body;
      if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
      }

      const result = await getCollection('users').insertOne({ name, email,kidato, adm});
      res.status(201).json(result);
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})();
