require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./domains/book/model'); 
const Member = require('./domains/member/model'); 

async function setup() {
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Populate initial books
    const initialBooks = [
        {
            code: 'JK-45',
            title: 'Harry Potter',
            author: 'J.K Rowling',
            stock: 1,
        },
        {
            code: 'SHR-1',
            title: 'A Study in Scarlet',
            author: 'Arthur Conan Doyle',
            stock: 1,
        },
        {
            code: 'TW-11',
            title: 'Twilight',
            author: 'Stephenie Meyer',
            stock: 1,
        },
        {
            code: 'HOB-83',
            title: 'The Hobbit, or There and Back Again',
            author: 'J.R.R. Tolkien',
            stock: 1,
        },
        {
            code: 'NRN-7',
            title: 'The Lion, the Witch and the Wardrobe',
            author: 'C.S. Lewis',
            stock: 1,
        },
    ];

    await Book.insertMany(initialBooks);

    // Populate initial members
    const initialMembers = [
        {
            code: 'M001',
            name: 'Angga',
        },
        {
            code: 'M002',
            name: 'Ferry',
        },
        {
            code: 'M003',
            name: 'Putri',
        },
    ];

    await Member.insertMany(initialMembers);

    console.log('Initial data populated.');

    // Close the MongoDB connection
    await mongoose.connection.close();
}

setup().catch(error => {
    console.error('Setup error:', error);
});
