// const addEducationData = require('./education')
const SeedData = require('./data/index');
const education = require('../seed/educationSetup');
const insertLookupData = require('../seed/insertLookupData');

education.educationSetup();
insertLookupData.insertLookUp();

