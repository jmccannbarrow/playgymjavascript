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


       const members = memberStore.getAllMembers()
        const assessmentcount =  assessmentStore.getMemberAssessments().length;
            const assessments =  assessmentStore.getMemberAssessments()


        const viewData = {

            title: "Trainer Dashboard",

            members: members,
            memberassessments: assessments,
            assessmentcount: assessmentcount

        }
        logger.info(assessmentcount)

        response.render("admin", viewData);

    },

    deleteMember(request, response){

        const member = memberStore.getMemberById(request.params.id);
        logger.info(member.id);

        const assessmentcount = member.assessmentcount;


        if (assessmentcount == 0) {

            memberStore.removeMember(member.id);

        }


        const members = memberStore.getAllMembers()
        const assessments =  assessmentStore.getMemberAssessments()

        const viewData = {

            title: "Trainer Dashboard",

            members: members,
            memberassessments: assessments

        }

        response.render("admin", viewData);
    } ,




};




module.exports = admin;


