const Book = require('./model');
const Member = require('../member/model');

class BookRepository {
    async getAllBooks() {
        const books = await Book.find();
        const availableBooks = books.filter(book => !book.borrowedBy && book.stock > 0); // Filter out borrowed books and those with 0 stock
        return availableBooks;
    }

    async findBookByCode(bookCode) {
        return Book.findOne({ code: bookCode });
    }

    async borrowBook(bookId, memberId) {
        const book = await Book.findById(bookId);
        const member = await Member.findById(memberId);
    
        if (!book || !member) {
            throw new Error('Book or member not found');
        }
    
        if (book.borrowedBy) {
            throw new Error('Book is already borrowed');
        }
    
        if (member.borrowedBooks.length >= 2) {
            throw new Error('Member cannot borrow more than 2 books');
        }
    
        if (book.stock === 0) {
            throw new Error('Book is out of stock');
        }
    
        book.borrowedBy = member;
        book.borrowedAt = new Date();
        await book.save();
    
        member.borrowedBooks.push(book);
        await member.save();
    
        // Reduce the book's stock by 1
        book.stock -= 1;
        await book.save();
    }

    async returnBook(bookId) {
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
    
        if (!book.borrowedBy) {
            throw new Error('Book is not borrowed');
        }
    
        const currentDate = new Date();
        const borrowedDate = new Date(book.borrowedAt);
        const daysDifference = (currentDate - borrowedDate) / (1000 * 60 * 60 * 24);
    
        if (daysDifference > 7) {
            book.borrowedBy.isPenalized = true;
            book.borrowedBy.penalizedUntil = new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days penalty
        }
    
        const member = await Member.findById(book.borrowedBy);
        member.borrowedBooks.pull(book);
        await member.save();
    
        // Increase the book's stock by 1
        book.stock += 1;
        book.borrowedBy = null;
        book.borrowedAt = null;
        book.returnedAt = currentDate;
        await book.save();
    }
}

module.exports = new BookRepository();
