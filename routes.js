
'use strict';

const express = require('express');
const router = express.Router();

const accounts = require('./controllers/accounts.js');
const dashboard = require('./controllers/dashboard.js');
const dashboardtrainer = require('./controllers/dashboardtrainer.js');
const dashboardtrainerassessments = require('./controllers/dashboardtrainer.js');
const about = require('./controllers/about.js');
const assessment = require('./controllers/assessment.js');
const admin = require('./controllers/admin.js');
const utility = require("./utils/utility.js");


router.get('/', accounts.index);
router.get('/signup', accounts.signup);
router.get('/login', accounts.login);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/settings', accounts.settings);
router.post('/updateMember', accounts.updateMember);




router.get('/dashboard', dashboard.index);
router.get('/dashboard/deleteassessment/:id', dashboard.deleteAssessment);
router.post('/dashboard/addassessment', dashboard.addAssessment);
router.get('/dashboardtrainer/:id', dashboardtrainer.index);
router.post('/dashboardtrainer/addassessmentcomment/:id', dashboardtrainer.addAssessmentComment);
router.get('/admin/deletemember/:id', admin.deleteAssessment);



router.get('/about', about.index);
router.get('/admin', admin.index);



module.exports = router;