const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

if (!process.env.SKIP_MONGODB) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/velocitytask')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection skipped:', err.message));
}

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const workspaceRoutes = require('./routes/workspaceRoutes');

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/workspaces', workspaceRoutes);

const staticDir = path.join(__dirname, '..', 'stitch_golden_synergy_hub', 'collab');
app.use(express.static(staticDir));

app.get('/', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});