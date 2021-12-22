/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { VotoContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('VotoContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new VotoContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"voto 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"voto 1002 value"}'));
    });

    describe('#votoExists', () => {

        it('should return true for a voto', async () => {
            await contract.votoExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a voto that does not exist', async () => {
            await contract.votoExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createVoto', () => {

        it('should create a voto', async () => {
            await contract.createVoto(ctx, '1003', 'voto 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"voto 1003 value"}'));
        });

        it('should throw an error for a voto that already exists', async () => {
            await contract.createVoto(ctx, '1001', 'myvalue').should.be.rejectedWith(/The voto 1001 already exists/);
        });

    });

    describe('#readVoto', () => {

        it('should return a voto', async () => {
            await contract.readVoto(ctx, '1001').should.eventually.deep.equal({ value: 'voto 1001 value' });
        });

        it('should throw an error for a voto that does not exist', async () => {
            await contract.readVoto(ctx, '1003').should.be.rejectedWith(/The voto 1003 does not exist/);
        });

    });

    describe('#updateVoto', () => {

        it('should update a voto', async () => {
            await contract.updateVoto(ctx, '1001', 'voto 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"voto 1001 new value"}'));
        });

        it('should throw an error for a voto that does not exist', async () => {
            await contract.updateVoto(ctx, '1003', 'voto 1003 new value').should.be.rejectedWith(/The voto 1003 does not exist/);
        });

    });

    describe('#deleteVoto', () => {

        it('should delete a voto', async () => {
            await contract.deleteVoto(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a voto that does not exist', async () => {
            await contract.deleteVoto(ctx, '1003').should.be.rejectedWith(/The voto 1003 does not exist/);
        });

    });

});
