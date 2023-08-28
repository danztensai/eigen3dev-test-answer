const express = require('express');
const memberController = require('./controller');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API endpoints for managing members.
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: List of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The member's ID.
 *         code:
 *           type: string
 *           description: The member's code.
 *         name:
 *           type: string
 *           description: The member's name.
 *         borrowedBooks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Book'
 *           description: The books borrowed by the member.
 *         isPenalized:
 *           type: boolean
 *           description: Indicates if the member is penalized.
 *         __v:
 *           type: integer
 *           description: The version number.
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The book's ID.
 *         code:
 *           type: string
 *           description: The book's code.
 *         title:
 *           type: string
 *           description: The book's title.
 *         author:
 *           type: string
 *           description: The book's author.
 *         stock:
 *           type: integer
 *           description: The number of available copies in stock.
 *         borrowedBy:
 *           $ref: '#/components/schemas/Member'
 *           description: The member who borrowed the book.
 *         borrowedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the book was borrowed.
 *         returnedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the book was returned.
 */
router.get('/', memberController.getAllMembers);

/**
 * @swagger
 * /members/{memberCode}:
 *   get:
 *     summary: Get a member by code
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: memberCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Member code
 *     responses:
 *       200:
 *         description: The member
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not found
 */
router.get('/:memberCode', memberController.getMemberByCode);

/**
 * @swagger
 * /members/{memberId}/penalize:
 *   post:
 *     summary: Penalize a member
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: Member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               penalizedUntil:
 *                 type: string
 *                 format: date
 *             required:
 *               - penalizedUntil
 *     responses:
 *       200:
 *         description: Member penalized successfully
 *       500:
 *         description: Internal server error
 */
router.post('/:memberId/penalize', memberController.penalizeMember);

module.exports = router;
