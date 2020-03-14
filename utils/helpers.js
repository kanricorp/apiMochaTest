const chai = require('chai');
chai.use(require('chai-json'));
chai.use(require('chai-http'));
expect = chai.expect;
chai.should();


const getRequest = () => {
    return chai.request('http://development-api.scalevision.net');
  };


  module.exports = {
    getRequest
  };