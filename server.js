require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authenticationRoutes = require('./routes/authenticationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authenticationRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
