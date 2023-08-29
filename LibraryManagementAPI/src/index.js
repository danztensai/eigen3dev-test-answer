require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
})
.catch((error) => {
    console.error('Error connecting to the database:', error);
});
