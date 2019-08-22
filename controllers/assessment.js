"use strict";

const accounts = require ('./accounts.js');
const logger = require("../utils/logger");
const memberCollection = require("../models/member-store.js");
const assessmentStore = require("../models/assessment-store.js");
const uuid = require("uuid");
const utils = require("../utils/utility");

const assessment = {
    index(request, response) {
        const assessmentId = request.params.id;
        logger.debug("Assessment id = ", assessmentId);
        const viewData = {
            title: "Assessment",
            assessment: assessmentStore.getAssessment(assessmentId)
        };
        response.render("assessment", viewData);
    },

    deleteAssessment(request, response) {
        const loggedInMember = accounts.getCurrentMember(request);
        const assessmentId = request.params.id;


        logger.info('Assessmentid = ' + assessmentId);
        const assessment = assessmentStore.getAssessment(assessmentId);

        logger.debug(`Deleting Assessment ${assessmentId}`);
        assessmentStore.removeAssessment(assessmentId);
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
            date: new Date().toLocaleString('en-GB')
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

//Add the member back in
        memberCollection.addMember(loggedInMember);

        response.redirect("/dashboard/" );
    }  ,






    getAssessment(request){
        const assessmentId = request.cookies.assessment;
        return assessmentStore.getAssessment(assessmentId);
    }




};



module.exports = assessment;
