"use strict";

const accounts = require ('./accounts.js');
const logger = require("../utils/logger");
const trainerCollection = require("../models/trainer-store.js");
const assessmentStore = require("../models/assessment-store.js");
const memberStore = require("../models/member-store.js");
const uuid = require("uuid");

const dashboardtrainer = {
    index(request, response) {
        logger.info("dashboard rendering...");

        logger.info(request);
        //const loggedInMember = accounts.getCurrentMember(request);
        const member = memberStore.getMemberById(request.params.id);
        const assessments = assessmentStore.getMemberAssessments(member.id);

        const viewData = {

            title: "Trainer Dashboard",
            member: member,
            memberassessments: assessments,

        };

        response.render("dashboardtrainer", viewData);

    },

    addAssessmentComment (request, response)
{

    //const member = memberStore.getMemberById(request.params.id);

    const assessmentId = request.body.assessmentid;
    //const assessmentId = request.body.assessmentid;


    logger.info("Hello:" + assessmentId);
    const assessment = assessmentStore.getAssessment(assessmentId);

   // logger.info(request.body.comments);
    const comments = request.body.comments;
   // logger.info(comments);
    assessment.trainerComment = comments;
    assessment.save();
   const assessments = assessmentStore.getMemberAssessments(member.id);

    const viewData = {

        title: "Trainer Dashboard",
        member: member,
        memberassessments: assessments,

    };

    response.render("dashboardtrainer", viewData);

},

};


module.exports = dashboardtrainer;


