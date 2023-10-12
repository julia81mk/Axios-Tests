const axios = require('axios').default;
const assert = require('assert').strict;
// const { Petcontroller}  = require ('..api/controller/pet.controller')

// const pet = new Petcontroller


describe('Pet', function () {
    it('Find pet by Id', async function () {
        let result;
        let response = {};


        try {
            // throw new Error('Custom Error !!!!');
            response = await axios.get('https://petstore.swagger.io/v2/pet/1');
            // console.log('==>> response: ', response)//.data);
            result = response.data.id;
        } catch (error) {
            // console.log('error: ', error);
            console.log('==>> ERROR response: ', error.response.data.message);
        }
        //assert(result == 1 ,`Expected Api return pet with id 1, but got ${responce.data.id});
        //assert(response.url =='https://petstore.swagger.io/v2/pet/1');
        // assert(response.status == 200 && response.statusText == "OK");
        assert(response.status == 200);
        assert(response.statusText == "OK");
    })

    it('Find pet by tag', async function () {
        let response1 = {};
        let response2 = {};
        let response3 = {};
        let response4 = {};
        let params = { status: [/*'available',*/ 'sold', 'pending'] }

        try {
            // response1 = await axios.get('https://petstore.swagger.io/v2/pet/findByStatus', {
            //     params: { status: 'available' }
            // });

            // response2 = await axios.get('https://petstore.swagger.io/v2/pet/findByStatus', {
            //     params: { status: 'sold' }
            // });

            // response3 = await axios.get('https://petstore.swagger.io/v2/pet/findByStatus', {
            //     params: { status: 'pending' }
            // });

            // console.log('==>> response1: ', response1.data);
            // console.log('==>> response2: ', response2.data);
            // console.log('==>> response3: ', response3.data);

//вместо создания 3 переменных можно использовать промис:
            // const [response1, response2, response3] = await Promise.all(
            //     ['available', 'sold', 'pending'].map((status) => {
            //         return axios.get('https://petstore.swagger.io/v2/pet/findByStatus', {
            //             params: { status }
            //         });
            //     })
            // );

            // console.log('==>> response1: ', response1.data);
            // console.log('==>> response2: ', response2.data);
            // console.log('==>> response3: ', response3.data);

            //можно исрользовать url searchparam:
            response4 = await axios.get('https://petstore.swagger.io/v2/pet/findByStatus', {
                params: new URLSearchParams(params)
                //params: new URLSearchParams({status: ['sold', 'pending', 'available']})
            });
            // console.log('==>> response4: ', response4.data);

        } catch (error) {
            console.log('==>> ERROR response: ', error);
        }
        //assert(response1.status == 200);
        //assert(response1.data.length > 0);
        assert(response4.data.some((pet)=>pet.status == 'sold'))
        assert(response4.data.some((pet)=>pet.status !== 'available'))

    })

})