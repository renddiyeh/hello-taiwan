/**
* Voter.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
required: true
module.exports = {

  attributes: {
    q1_1: {
      collection: 'vote',
      via: 'voter'
    },
    q1_2: {
      type: 'array',
      required: true
    },
  	q2_1: {
      type: 'string',
      required: true
    },
  	q2_2: {
      type: 'string',
      required: true
    },
  	city: {
  		model: 'city',
      required: true
  	},
    otherCity: {
      type: 'string'
    },
  	q3_1: {
      type: 'array'
    },
  	q3_2: {
      type: 'array'
    },
    sex: {
      type: 'string',
      required: true
    },
  	age: {
      type: 'integer',
      required: true
    },
  	curCity: {
  		model: 'city',
      required: true
  	},
  	job: {
      type: 'integer',
      required: true
    },
  	salary: {
      type: 'integer',
      required: true
    },
  	email: 'email',
  	comment: 'text',
    duration: 'array'
  }
};

