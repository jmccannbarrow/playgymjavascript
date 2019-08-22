'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const trainerStore = {

    store: new JsonStore('./models/trainer-store.json', { trainers: [] }),
    collection: 'trainers',

    getAllTrainers() {
        return this.store.findAll(this.collection);
    },

    addTrainer(trainer) {
        this.store.add(this.collection, trainer);
        this.store.save();
    },

    updateTrainer(trainer) {
        //this.store.add(this.collection, member);
        this.store.save();
        return this.store.findOneBy(this.collection, { id: trainer });
    },

    getTrainerById(id) {
        return this.store.findOneBy(this.collection, { id: id });
    },


    getTrainerByEmail(email) {
        return this.store.findOneBy(this.collection, { email: email });
    },


    getTrainerByPassword(password) {
        return this.store.findOneBy(this.collection, { password: password });
    },
};

module.exports = trainerStore;