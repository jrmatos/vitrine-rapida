const sinon = require('sinon');
const { expect } = require('chai');
const { Container } = require('typedi');

const { helloGETController } = require('../src/api/controllers/hello.controller');

const FakeHelloService = {
    greetings: () => {
        return 'Hello Baby';
    }
}

describe('Hello Controller', () => {
    describe('Unit', () => {
        it('GET: should call greetings', async () => {
            const expectedBody = { data: "Hello Baby", status: "OK", user: { name: "Paulo" } };
            const expectedStatusCode = 200;

            const request = {
                currentUser: {
                    name: 'Paulo'
                }
            };

            const response = {
                json: sinon.spy(),
                status: sinon.spy()
            };

            Container.set({ id: 'HelloService', value: FakeHelloService  })
    
            helloGETController(request, response);

            sinon.assert.calledWith(response.json, expectedBody);
            sinon.assert.calledWith(response.status, expectedStatusCode);
        });
    });
});