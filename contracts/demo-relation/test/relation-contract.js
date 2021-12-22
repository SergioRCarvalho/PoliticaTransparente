/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { RelationContract } = require('..');
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

describe('RelationContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new RelationContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"relation 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"relation 1002 value"}'));
    });

    describe('#relationExists', () => {

        it('should return true for a relation', async () => {
            await contract.relationExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a relation that does not exist', async () => {
            await contract.relationExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createRelation', () => {

        it('should create a relation', async () => {
            await contract.createRelation(ctx, '1003', 'relation 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"relation 1003 value"}'));
        });

        it('should throw an error for a relation that already exists', async () => {
            await contract.createRelation(ctx, '1001', 'myvalue').should.be.rejectedWith(/The relation 1001 already exists/);
        });

    });

    describe('#readRelation', () => {

        it('should return a relation', async () => {
            await contract.readRelation(ctx, '1001').should.eventually.deep.equal({ value: 'relation 1001 value' });
        });

        it('should throw an error for a relation that does not exist', async () => {
            await contract.readRelation(ctx, '1003').should.be.rejectedWith(/The relation 1003 does not exist/);
        });

    });

    describe('#updateRelation', () => {

        it('should update a relation', async () => {
            await contract.updateRelation(ctx, '1001', 'relation 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"relation 1001 new value"}'));
        });

        it('should throw an error for a relation that does not exist', async () => {
            await contract.updateRelation(ctx, '1003', 'relation 1003 new value').should.be.rejectedWith(/The relation 1003 does not exist/);
        });

    });

    describe('#deleteRelation', () => {

        it('should delete a relation', async () => {
            await contract.deleteRelation(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a relation that does not exist', async () => {
            await contract.deleteRelation(ctx, '1003').should.be.rejectedWith(/The relation 1003 does not exist/);
        });

    });

});
