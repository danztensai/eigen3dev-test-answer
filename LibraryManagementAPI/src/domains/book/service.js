const BookRepository = require('./repository');

class BookService {
    async getAllBooks() {
        return BookRepository.getAllBooks();
    }

    async getBookByCode(bookCode) {
        return BookRepository.findBookByCode(bookCode);
    }

    async borrowBook(bookId, memberId) {
        return BookRepository.borrowBook(bookId, memberId);
    }

    async returnBook(bookId) {
        return BookRepository.returnBook(bookId);
    }
}

module.exports = new BookService();
