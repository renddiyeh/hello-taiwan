/**
* Voter.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    q1_1: {
      collection: 'vote',
      via: 'voter'
    },
    q1_2: 'array',
  	q2_1: 'string',
  	q2_2: 'string',
  	city: {
  		model: 'city'
  	},
    otherCity: {
      type: 'string'
    },
  	q3_1: 'array',
  	q3_2: 'array',
    sex: 'string',
  	age: 'integer',
  	curCity: {
  		model: 'city'
  	},
  	job: 'integer',
  	salary: 'integer',
  	email: 'email',
  	comment: 'text'
  }
};

