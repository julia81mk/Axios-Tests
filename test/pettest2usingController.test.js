// const axios = require('axios').default;
const assert = require('assert').strict;
const petController = require('../api/controller/pet.controller');

describe('User can', function () {
    it('receive pet by his id', async function () {
        let data;
        try {
            data = await petController.getById(44);
        }
        catch (error) {
            // console.log('==>> ERROR response: ', error);
            console.log('==>> ERROR response: ', error.response.data.message);
        }
        // console.log('data: ', data);
        assert(data.status == 200);
        assert(data.statusText == "OK");
        //assert(data.data.id === 1);
        //assert(data?.id === 1);
        // data && data.user && data.user.id && data.user.id === 1;
        // data?.user?.id === 1
    })
    it('find pet by tag', async function () {
        let datatag;
        try {
            datatag = await petController.findPetbytag({ status: ['sold', 'pending'] })
        }
        catch (error) {
            console.log('==>> ERROR response: ', error.response.data.message);
        }
        // console.log('datatag: ', datatag);
        assert(datatag.some((pet) => pet.status == 'sold'))
        assert(datatag.some((pet) => pet.status !== 'available'))
    })

    it('create new pet', async function () {
        let result;
        try {
            result = await petController.createPet();
            // console.log('==>>Response Pet create: ', result);

        }

        catch (error) {
            console.log('==>> ERROR response: ', error);
        }
        let resultbody = result.data;
        let idpet = result.data.id;

        // console.log('==>>Response Pet data: ', resultbody);
        // console.log('==>>Response Pet id: ', idpet);
        assert(result?.status == 200);
    })


})