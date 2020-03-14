const helpers = require('../utils/helpers.js');


describe('#TestName - Member', function() {

let endpoint =  '/companies/2/members'
let login = null 
let requester = null
let token = null

beforeEach(async function() {
    requester = helpers.getRequest().keepOpen();
    login = await requester.post('/auth/login').send({ email: 'antopiscio@gmail.com', password: 'Intel123!' });
    token = login.body.results.token
    expect(login.body.success).to.equal(true);
  }); 
  
   // before 
   // beforeEach(async function()
   // afterEach 
   // after 

    it('Get all members ', async() => {
        const members = await requester.get(endpoint).set('Authorization', 'Bearer ' +token  );
        expect(members.body.success).to.equal(true);
        await requester.close();
    });

    it('Get all members without token', async() => {
        const members = await requester.get(endpoint);
        expect(members.body.error.message).to.equal('Missing token');
        expect(members.body.success).to.equal(false);
        await requester.close();
    });

    it('Create new member', (done)=> {    
		let emailMember = 'asd@yopami.com';
		let role = 'CEO';
		requester.post(endpoint).set({'Authorization': 'Bearer ' + token})
			.send(
				[
					{email: emailMember,roleName:role}
				]) 
			.end((err, res) => {
				res.should.have.status(201);
				expect(res.body.success).to.equal(true);
				done();
			});
    });
    
    it('Delete Members with invalid member id', (done)=> {    
		requester.delete(endpoint + '2132132312321312312').set({'Authorization': 'Bearer ' + token})
			.end((err, res) => {
				res.should.have.status(404);
				done();
			});
	});

})
