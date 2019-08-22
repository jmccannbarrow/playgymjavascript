"use strict";

const accounts = require ('./accounts.js');
const logger = require("../utils/logger");
const trainerCollection = require("../models/trainer-store.js");
const assessmentStore = require("../models/assessment-store.js");
const memberStore = require("../models/member-store.js");
const uuid = require("uuid");

const admin = {
    index(request, response) {
        logger.info("dashboard rendering...");
        //const loggedInTrainer = accounts.getCurrentTrainer(request);
        //const getMembers = memberStore.getAllMembers(request) ;
        //const loggedInMember = accounts.getCurrentMember(request);
        //const assessments = assessmentStore.getMemberAssessments(request);

       const members = memberStore.getAllMembers()
        //    member:memberStore.getMemberById(),
        const assessmentcount =  assessmentStore.getMemberAssessments().length;
            const assessments =  assessmentStore.getMemberAssessments()




        //const loggedInMember = accounts.getCurrentMember(request);
        //const assessments = assessmentStore.getMemberAssessments(id);
        const viewData = {

            title: "Trainer Dashboard",
            //content:"dashboardtrainerassessments",
            //trainer: loggedInTrainer,
           // members: memberStore.getAllMembers(),
            //member:memberStore.getMemberById(),
            //assessments: assessmentStore.getMemberAssessments(),
            //assessmentcount: assessmentStore.getMemberAssessments().length

            members: members,
            memberassessments: assessments,
            assessmentcount: assessmentcount

        }
        logger.info(assessmentcount)
        //const assessmentId = request.params.id;

        //logger.info('Assessmentid = ' + assessmentId);
        //const assessment = assessmentStore.getAssessment(assessmentId);
        //logger.info("about to render", index);
        response.render("admin", viewData);

    },
};





module.exports = admin;


