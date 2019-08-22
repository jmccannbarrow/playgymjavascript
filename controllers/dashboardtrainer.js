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
        const assessmentcount =  "hello there"
            //assessments.length;

        const viewData = {

            title: "Trainer Dashboard",
            member: member,
            memberassessments: assessments,
            assessmentcount: assessmentcount
            //assessmentcount: 0

        };

        response.render("dashboardtrainer", viewData);

    },

    addAssessmentComment (request, response)
{
    logger.info(request.params.id);

    const assessment = assessmentStore.getAssessment(request.params.id);
    const newassessment = assessment;
    const memberid = assessment.memberid;
    const member =  memberStore.getMemberById(memberid);
    const comments = request.body.comments;
    logger.info(comments);

    newassessment.trainerComment = comments;
    logger.info(newassessment.trainerComment);

    assessmentStore.removeAssessment(request.params.id);
    assessmentStore.addAssessment(newassessment)

    const assessments = assessmentStore.getMemberAssessments(memberid);

    const viewData = {

        title: "Trainer Dashboard",
        member: member,
        memberassessments: assessments,

    };

    response.render("dashboardtrainer", viewData);

},

};


module.exports = dashboardtrainer;


