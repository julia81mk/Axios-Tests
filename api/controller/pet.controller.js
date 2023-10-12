const axios = require('axios').default;
const { faker } = require('@faker-js/faker');

class PetController {
    async getById(id) {
        const response = await axios.get(`https://petstore.swagger.io/v2/pet/${id}`)
        return response//.data;
    }
    async findPetbytag(params) {
        const response = await axios.get('https://petstore.swagger.io/v2/pet/findByStatus', {
            params: new URLSearchParams(params)// обьект, работает с параметрами запроса
        })
        return response.data
    }
    async createPet() {
        const body = {
            "id": faker.number.int(30),
            "category": {
                "id": faker.number.int(10),
                "name": "NewCategoryT"
            },
            "name": faker.person.firstName(),
            "photoUrls": [],
            "tags": [
                {
                    "id": 5,
                    "name": faker.animal.type()
                }
            ],
            "status": "available"
        }
        // const token = "special-key"
        // const config = {
        //     headers: { Authorization: 'x-api-key'`${token}` }
        // }
        const response = await axios.post(`https://petstore.swagger.io/v2/pet/`, body)
        return response//.data;
        // result = response;

    }

}
module.exports = new PetController();