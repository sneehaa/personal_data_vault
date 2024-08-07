const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/personal-data-vault';
const dbName = 'personal-data-vault';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });