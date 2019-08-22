'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const memberStore = {

    store: new JsonStore('./models/member-store.json', { members: [] }),
    collection: 'members',

    getAllMembers() {
        return this.store.findAll(this.collection);
    },

    addMember(member) {
        this.store.add(this.collection, member);
        this.store.save();
    },

    removeMember(id) {
        const member = this.getMemberById(id);
        this.store.remove(this.collection, member);
        this.store.save();
    },

    updateMember(member) {
        const loggedInMember = this.getCurrentMember();
        this.removeMember(member.id);
        this.addMember(member);

    },

    getMemberById(id) {
        return this.store.findOneBy(this.collection, { id: id });
    },

    getMemberByEmail(email) {
        return this.store.findOneBy(this.collection, { email: email });
    },

    getTrainerByEmail(email) {
        return this.store.findOneBy(this.collection, { email: email });
    },


    getMemberByPassword(password) {
        return this.store.findOneBy(this.collection, { password: password });
    },

    getCurrentMember(id) {
        //const memberEmail = request.cookies.assessment;
        return this.store.findOneBy(this.collection, { id: id });

    },

};

module.exports = memberStore;