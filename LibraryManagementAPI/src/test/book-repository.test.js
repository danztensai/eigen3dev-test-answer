const BookRepository = require('../domains/book/repository');
const Book = require('../domains/book/model');
const Member = require('../domains/member/model');

jest.mock('../domains/book/model');
jest.mock('../domains/member/model');

describe('BookRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get all available books', async () => {
    Book.find.mockResolvedValue([
      { code: 'JK-45', borrowedBy: null, stock: 1 },
      { code: 'SHR-1', borrowedBy: 'someMemberId', stock: 0 },
    ]);

    const availableBooks = await BookRepository.getAllBooks();
    expect(availableBooks).toEqual([
      { code: 'JK-45', borrowedBy: null, stock: 1 },

    ]);
  });

  it('should find a book by code', async () => {
    const mockBook = { code: 'JK-45', title: 'Mock Book' };
    Book.findOne.mockResolvedValue(mockBook);
    const book = await BookRepository.findBookByCode('JK-45');
    expect(book).toEqual(mockBook);
  });
});
