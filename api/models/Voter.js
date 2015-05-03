/**
* Voter.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    q1: {
      collection: 'vote',
      via: 'voter'
    },
  	q2_1: 'string',
  	q2_2: 'string',
  	city: {
  		model: 'city'
  	},
  	district: 'string',
  	q3: 'array',
  	q4: 'array',
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

