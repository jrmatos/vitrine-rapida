const sinon = require('sinon');
const { expect } = require('chai');
const { Container } = require('typedi');

const HelloService = require('../src/services/hello.service');

describe('Hello Service', () => {
    describe('Unit', () => {
        it('should return expected geeting', async () => {
            const expectedGeeting = 'Hello from the fucking service! 😂';

            const helloService = new HelloService();

            const result = helloService.greetings();

            expect(result).to.equal(expectedGeeting);
        });
    });
});