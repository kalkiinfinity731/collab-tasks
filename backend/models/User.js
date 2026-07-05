const mongoose = require('mongoose');

let User;
if (!process.env.SKIP_MONGODB) {
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'team_lead'], default: 'user' },
    designation: { type: String, default: 'team_member' },
    companyName: { type: String, default: '' },
    teamName: { type: String, default: '' },
    roomCode: { type: String, default: '' },
    workspaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
    createdAt: { type: Date, default: Date.now }
  });
  User = mongoose.model('User', userSchema);
} else {
  let users = [];
  let nextId = 1;
  const UserModel = {
    findOne: (query) => Promise.resolve(users.find(u => u.email === query.email) || null),
    findById: (id) => {
      const user = users.find(u => u._id == id) || null;
      if (user) {
        return Promise.resolve({ ...user, select: () => { const u = { ...user }; delete u.password; return u; } });
      }
      return Promise.resolve(null);
    },
    findByIdAndUpdate: (id, updates) => {
      const idx = users.findIndex(u => u._id == id);
      if (idx === -1) return Promise.resolve(null);
      users[idx] = { ...users[idx], ...updates };
      return Promise.resolve({ ...users[idx], select: () => { const u = { ...users[idx] }; delete u.password; return u; } });
    },
    create: (data) => { const user = { _id: String(nextId++), ...data, designation: data.designation || 'team_member', companyName: data.companyName || '', teamName: data.teamName || '', roomCode: data.roomCode || '', createdAt: new Date() }; users.push(user); return Promise.resolve({ ...user, select: () => { const u = { ...user }; delete u.password; return u; } }); }
  };
  UserModel.findOne = UserModel.findOne.bind(UserModel);
  User = UserModel;
}

module.exports = User;