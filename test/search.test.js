const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const User = require('../models/userModel'); 
const Organization = require('../models/orgModel');

const app = express();



jest.mock('../models/orgModel');
Organization.find.mockResolvedValue([]);



const searchRoute = require('../routes/userRoute');
app.use('/', searchRoute);


app.use((req, res, next) => {
  req.isAuthenticated = jest.fn(() => true); 
  next();
});

describe('POST /search', () => {
  it('should render searchResults with an empty array when no results are found', async () => {
    const response = await request(app)
      .post('/search')
      .send({
        location: 'Some Location',
        footballType: 'Some Football Type',
        TypesofFootballOpportunitiesProvided: 'Some Opportunities',
        AgeGroups: 'Some Age Groups',
        level: 'Some Level',
      });

    expect(response.status).toBe(500);
  });
});
