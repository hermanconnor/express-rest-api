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

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
    });
  })
);

// Route that will create a new user
router.post(
  '/users',
  asyncHandler(async (req, res) => {})
);

module.exports = router;
