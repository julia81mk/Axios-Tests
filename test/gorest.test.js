const axios = require('axios').default;
const assert = require('assert').strict;
const { faker } = require('@faker-js/faker');


describe('Gorest testig', function () {
    let userid;
    const token = "bd4b7fe44dcf612e63b562eb92b5bc3d935d48f43d54b5f8b8b80f4ba3047bd3"
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let userpostid;
    let emailuser;

    it('Create user with bear token', async function () {
        let response1 = {};

        // const bodyParameters = {
        //     name: "Test Dou", //faker.person.fullName(),
        //     email:"test@tes.com" ,//faker.internet.email(),
        //     gender:  "male",   //faker.person.gender(),
        //     status: "active"
        // };

        const bodyParameters = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            gender: "male",
            status: "active"
        };

        console.log('==>> data: ', bodyParameters)
        try {
            response1 = await axios.post('https://gorest.co.in/public/v2/users',
                bodyParameters, config);
            // console.log('==>> response: ', response1.status);
            // console.log('==>> response: ', response1.statusText);
            userid = response1.data.id;
            emailuser = response1.data.email;
            // console.log('==>> User id: ', userid);
        } catch (error) {
            // console.log('error: ', error);
            // console.log('==>> ERROR response: ', error.response.data.message);
            console.log('==>> ERROR response: ', error);
        }
        assert(response1.status == 201);
        //assert(response1.ststatusTextatus == Created);
    })
    it('Find user by Id', async function () {
        let response = {};
        try {
            response = await axios.get('https://gorest.co.in/public/v2/users/' + userid, config);
            console.log('==>> response: ', response.data);
            result = response;
        } catch (error) {
            console.log('error: ', error);
            //console.log('==>> ERROR response: ', error.response.data.message);
        }

        assert(response.status == 200);
    })

    it('Create user post', async function () {
        let response2 = {};
        let infopost = {};
        let url = "https://gorest.co.in/public/v2/users/" + userid + "/posts";
        //let url1 = "https://gorest.co.in/public/v2/users/ ${userid}/posts";

        const postbody = {
            user: userid,
            title: faker.lorem.sentence(5),
            body: faker.lorem.sentences(3)
        }
        // console.log('==>> POSTBODY: ', postbody)
        try {
            response2 = await axios.post(url, postbody, config);
            //console.log('==>> responsePOST: ', response);
            // console.log('==>> responsePost: ', response2.status);
            // console.log('==>> responsePost: ', response2.statusText);
            userpostid = response2.data.id
            infopost = response2.data
            console.log('==>> User Post id: ',response2.data );
            // console.log('==>> User Post data: ', infopost);
        }
        catch (error) {
            console.log('==>> ERROR POSTresponse: ', error);
        }
        assert(response2.status == 201);
        // assert.deepEqual(infopost, {
        //     ...postbody,
        //     id:userpostid
        // }),`Expected data matched`
    })
    it('Create comments for User post', async function () {
        let response3 = {};
        let url = "https://gorest.co.in/public/v2/posts/" + userpostid + "/comments";
        const bodycommennts = {
            post: userpostid,
            name: faker.lorem.words(5),
            email: emailuser,
            body: faker.lorem.text()
        }
        try {
            response3 = await axios.post(url, bodycommennts, config);
            console.log('==>> 111 Data Comments: ', response3);
            // response3 = response3.data
        }
        catch (error) {
            console.log('==>> ERROR Comments created: ', error.response);
        }
        console.log('==>> Data Comments: ', response3)
        assert(response3.status == 201);
    })
    it('Delete user',async function(){
        let url = "https://gorest.co.in/public/v2/users/" + userid ;
        let response4 = {};
        try {
            response4 = await axios.delete(url, config);
            console.log('==>> Deleted user: ', response4);
            // response4 = response4.data
        }
        catch (error) {
            console.log('==>> ERROR Deleted user: ', error.response);
        }
        assert(response4.status == 204);
    })
})
