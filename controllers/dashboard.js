"use strict";

const accounts = require ('./accounts.js');
const logger = require("../utils/logger");
const memberCollection = require("../models/member-store.js");
const assessmentStore = require("../models/assessment-store.js");
const uuid = require("uuid");
const utils = require("../utils/utility");

const dashboard = {
    index(request, response) {
        logger.info("dashboard rendering...");
        const loggedInMember = accounts.getCurrentMember(request);
        const assessments = assessmentStore.getMemberAssessments(loggedInMember.id);
        const viewData = {
            title: "Member Dashboard",
            member: loggedInMember,
            memberassessments: assessments,

        };
        //logger.info("about to render", index);
        response.render("dashboard", viewData);
    },


    deleteAssessment(request, response) {
        const loggedInMember = accounts.getCurrentMember(request);
        const assessmentId = request.params.id;
        assessmentStore.removeAssessment(assessmentId);
        var assessments = [];
        assessments = assessmentStore.getMemberAssessments(loggedInMember.id);
        if (assessments.length > 0) {
            const weight = assessments[assessments.length-1].weight;
            logger.info(weight);
            //Get the bmi stuff
            const bmi = utils.calculateBMI(weight, loggedInMember.height);
            const bmicategory = utils.determineBMICategory(bmi)
            const isidealbodyweight = utils.isIdealBodyWeight(loggedInMember.height, loggedInMember.gender, weight)
            //Get rid of the existing member
            memberCollection.removeMember(loggedInMember.id);

            //Add the bmi stuff to the saved member
            loggedInMember.bmi = bmi;
            loggedInMember.bmicategory = bmicategory;
            loggedInMember.isidealbodyweight = isidealbodyweight ;
            loggedInMember.assessmentcount = assessments.length;

            //Add the member back in
            memberCollection.addMember(loggedInMember);
        }
        else
        {
            //Get the bmi stuff
            const bmi = utils.calculateBMI(loggedInMember.startingweight, loggedInMember.height);
            const bmicategory = utils.determineBMICategory(bmi)
            const isidealbodyweight = utils.isIdealBodyWeight(loggedInMember.height, loggedInMember.gender, loggedInMember.startingweight)

            //Get rid of the existing member
            memberCollection.removeMember(loggedInMember.id);

            //Add the bmi stuff to the saved member
            loggedInMember.bmi = bmi;
            loggedInMember.bmicategory = bmicategory;
            loggedInMember.isidealbodyweight = isidealbodyweight ;
            loggedInMember.assessmentcount = 0;

            //Add the member back in
            memberCollection.addMember(loggedInMember);
        }
        response.redirect("/dashboard");


    },

    addAssessment(request, response) {
        const loggedInMember = accounts.getCurrentMember(request);

        const newAssessment = {
            id: uuid(),
            memberid: loggedInMember.id,
            weight: request.body.weight,
            chest: request.body.chest,
            thigh: request.body.thigh,
            upperArm: request.body.upperArm,
            waist: request.body.waist,
            hips: request.body.hips,
            date: new Date().toGMTString('en-GB'),
            trainerComment: ""
        };

//Add the assessment
        assessmentStore.addAssessment(newAssessment);

//Get the bmi stuff
        const bmi = utils.calculateBMI(request.body.weight, loggedInMember.height);
        const bmicategory = utils.determineBMICategory(bmi)
        const isidealbodyweight = utils.isIdealBodyWeight(loggedInMember.height, loggedInMember.gender, request.body.weight)

//Get rid of the existing member
        memberCollection.removeMember(loggedInMember.id);

//Add the bmi stuff to the saved member
        loggedInMember.bmi = bmi;
        loggedInMember.bmicategory = bmicategory;
        loggedInMember.isidealbodyweight = isidealbodyweight ;

        //increment the member count by one
        const assessmentcount = loggedInMember.assessmentcount;
        loggedInMember.assessmentcount = assessmentcount + 1;

//Add the member back in
        memberCollection.addMember(loggedInMember);

        response.redirect("/dashboard/" );
    }  ,


};

module.exports = dashboard;