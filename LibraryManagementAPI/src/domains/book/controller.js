const BookService = require('./service');

const getAllBooks = async (req, res) => {
    try {
        const books = await BookService.getAllBooks();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getBookByCode = async (req, res) => {
    const { bookCode } = req.params;
    try {
        const book = await BookService.getBookByCode(bookCode);
        if (book) {
            res.json(book);
        } else {
            console.error(error);
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const borrowBook = async (req, res) => {
    const { bookId, memberId } = req.params;
    try {
        await BookService.borrowBook(bookId, memberId);
        res.json({ message: 'Book borrowed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const returnBook = async (req, res) => {
    const { bookId } = req.params;
    try {
        await BookService.returnBook(bookId);
        res.json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBookByCode,
    borrowBook,
    returnBook,
};
