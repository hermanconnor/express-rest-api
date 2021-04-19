'use strict';

const express = require('express');
const { User, Course } = require('../models');
const { asyncHandler } = require('../middleware/asynchandler');

// CONSTRUCT A ROUTER INSTANCE
const router = express.Router();

// Route that will return the currently authenticated user
router.get(
  '/users',
  asyncHandler(async (req, res) => {
    const user = req.currentUser;
  })
);

// Route that will create a new user
router.post(
  '/users',
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.location('/');
      res.status(201).json({ message: 'Success! Account created.' });
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

module.exports = router;
