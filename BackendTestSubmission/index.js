const express = require('express');
const dotenv = require('dotenv');
const testRoutes = require('./routes/testRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', testRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
