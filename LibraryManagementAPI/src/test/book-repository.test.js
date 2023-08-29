const BookRepository = require('../domains/book/repository');
const Book = require('../domains/book/model');
const Member = require('../domains/member/model');

// Mock the Book and Member models
jest.mock('../domains/book/model');
jest.mock('../domains/member/model');

describe('BookRepository', () => {
  beforeEach(() => {
    // Clear all mock instances and calls
    jest.clearAllMocks();
  });

  it('should get all available books', async () => {
    // Mock the Book.find() method to return an array of books
    Book.find.mockResolvedValue([
      { code: 'JK-45', borrowedBy: null, stock: 1 },
      { code: 'SHR-1', borrowedBy: 'someMemberId', stock: 0 },
      // Add more mock books as needed
    ]);

    // Call the getAllBooks() method
    const availableBooks = await BookRepository.getAllBooks();

    // Verify that the correct books are returned
    expect(availableBooks).toEqual([
      { code: 'JK-45', borrowedBy: null, stock: 1 },
      // Add more expected books as needed
    ]);
  });

  it('should find a book by code', async () => {
    const mockBook = { code: 'JK-45', title: 'Mock Book' };
    // Mock the Book.findOne() method to return a specific book
    Book.findOne.mockResolvedValue(mockBook);

    // Call the findBookByCode() method
    const book = await BookRepository.findBookByCode('JK-45');

    // Verify that the correct book is returned
    expect(book).toEqual(mockBook);
  });

  // Add more test cases for borrowBook() and returnBook() methods
});
