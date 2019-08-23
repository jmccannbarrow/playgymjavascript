'use strict';

const memberstore = require('../models/member-store');
const memberCollection = require("../models/member-store.js");
const assessmentStore = require("../models/assessment-store.js");
const trainerstore = require('../models/trainer-store');
const logger = require('../utils/logger');
const uuid = require('uuid');
const utils = require("../utils/utility");

const accounts = {

    index(request, response) {

        const viewData = {
            title: 'Login or Signup',
        };
        response.render('index', viewData);
    },

    login(request, response) {
        const viewData = {
            title: 'Login to the Service',
        };
        response.render('login', viewData);
    },

    logout(request, response) {
        response.cookie('assessment', '');
        response.redirect('/');
    },

    signup(request, response) {
        const viewData = {
            title: 'Login to the Service',
        };
        response.render('signup', viewData);
    },

    register(request, response) {
        const member = request.body;

        const BMI = utils.toTwoDecimalPlaces(((member.startingweight) / (member.height) * (member.height)));
        member.BMI = BMI;
        member.bmiCategory = (utils.determineBMICategory((member.BMI)));
        member.assessmentcount = 0;
        member.id = uuid();
        memberstore.addMember(member);
        logger.info(`registering ${member.email}`);
        response.redirect('/');
    },

    authenticate(request, response) {

        const member = memberstore.getMemberByEmail(request.body.email);
        //The person logging in is a member, not a trainer
        if (member) {
            const password = request.body.password;
            if (password == member.password)  //Good password
            {
                response.cookie('assessment', member.email,member.password);
                response.redirect('/dashboard');
            }
            else //Bad password
            {
                response.redirect('/login');
            }

            //Not a member so check if trainer
        } else {

            const trainer = trainerstore.getTrainerByEmail(request.body.email);

            if (trainer) {
                //is a trainer so check password
                const password = request.body.password;
                if (password == trainer.password){
                    //Good password
                    response.cookie('assessment', trainer.email,trainer.password);
                    response.redirect('/admin');
                }
                //Bad password
                else{
                    response.redirect('/login');

                }

            }




            response.redirect('/login');
        }



    },



    getCurrentMember(request) {
        const memberEmail = request.cookies.assessment;
        return memberstore.getMemberByEmail(memberEmail);

    },

    getMemberById(request) {
        const memberId = request.cookies.assessment;
        return memberstore.getMemberById(memberId);

    },



    getCurrentTrainer(request) {
        const trainerEmail = request.cookies.assessment;
        return trainerstore.getTrainerByEmail(trainerEmail);

    },


    settings(request, response) {
        const loggedInMember = accounts.getCurrentMember(request);
        const viewData = {
            title: "Member Dashboard",
            member: loggedInMember,


        };
        response.render('settings', viewData);
    },

    updateMember(request, response) {

        const loggedInMember = accounts.getCurrentMember(request);
//loggedInMember.comments = "This is new content";

        loggedInMember.firstname = request.body.firstname;
        loggedInMember.lastname = request.body.lastname;
        loggedInMember.gender = request.body.gender;
        loggedInMember.email = request.body.email;
        loggedInMember.password = request.body.password;
        loggedInMember.address = request.body.address;
        loggedInMember.height = request.body.height;
        loggedInMember.startingweight = request.body.startingweight;





        //logger.info("this is a test");
        memberstore.updateMember(loggedInMember);
        response.redirect('/');
    }







    // updateMember(request, response) {
    //const loggedInMember = accounts.getCurrentMember(request);

    //const loggedInMember = accounts.getCurrentMember(request);

    //  const member = {
    //
    //// firstname: request.body.firstname,
    //   lastname: request.body.lastname,
    //   gender: request.body.gender,
    //     email: request.body.email,
    //     password: request.body.password,
//     address: request.body.address,
//     height: request.body.height,
    //    startingweight: request.body.startingweight,
    //    id: loggedInMember.id,
    //     bmi: loggedInMember.bmi,
    //    bmicategory: loggedInMember.bmicategory,
//  isidealbodyweight : loggedInMember.isidealbodyweight,

//   };

//Add the member
//    memberCollection.addMember(member);

//Get the bmi stuff
    //const bmi = utils.calculateBMI(request.body.weight, loggedInMember.height);
    //const bmicategory = utils.determineBMICategory(bmi)
    //const isidealbodyweight = utils.isIdealBodyWeight(loggedInMember.height, loggedInMember.gender, request.body.weight)

//Get rid of the existing member
//memberCollection.removeMember(loggedInMember.id);

//Add the bmi stuff to the saved member
//loggedInMember.bmi = bmi;
//loggedInMember.bmicategory = bmicategory;
//loggedInMember.isidealbodyweight = isidealbodyweight ;

//Add the member back in
//memberCollection.addMember(loggedInMember);

//  response.redirect("/dashboard/" );
//  }  ,

};

module.exports = accounts;