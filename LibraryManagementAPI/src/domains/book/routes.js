const express = require('express');
const bookController = require('./controller');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books.
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /books/{bookCode}:
 *   get:
 *     summary: Get a book by code
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Book code
 *     responses:
 *       200:
 *         description: The book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
router.get('/:bookCode', bookController.getBookByCode);

/**
 * @swagger
 * /books/{bookId}/borrow/{memberId}:
 *   post:
 *     summary: Borrow a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: Member ID
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       500:
 *         description: Internal server error
 */
router.post('/:bookId/borrow/:memberId', bookController.borrowBook);

/**
 * @swagger
 * /books/{bookId}/return:
 *   post:
 *     summary: Return a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       500:
 *         description: Internal server error
 */
router.post('/:bookId/return', bookController.returnBook);

module.exports = router;
