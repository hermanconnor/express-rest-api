'use strict';

const express = require('express');
const { User, Course } = require('../models');
const { asyncHandler } = require('../middleware/asynchandler');
const { authenticateUser } = require('../middleware/auth-user');

// CONSTRUCT A ROUTER INSTANCE
const router = express.Router();

// GET route that will return all of a users courses
router.get(
  '/courses',
  asyncHandler(async (req, res) => {
    const course = await Course.findAll({
      include: [
        {
          model: User,
          as: 'student',
        },
      ],
    });
    res.json(course);
  })
);

// GET route that will return a users specific course
router.get(
  '/courses/:id',
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'student',
        },
      ],
    });
    res.json(course);
  })
);

// POST route that will create a new course
router.post(
  '/courses',
  authenticateUser,
  asyncHandler(async (req, res) => {
    try {
      const course = await Course.create(req.body);
      res.location(`/courses/${course.id}`);
      res.status(201).end();
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// PUT route that will update the corresponding course
router.put(
  '/courses/:id',
  authenticateUser,
  asyncHandler(async (req, res) => {})
);

// DELETE route that will delete the corresponding course
router.delete(
  '/courses/:id',
  authenticateUser,
  asyncHandler(async (req, res) => {})
);

module.exports = router;
