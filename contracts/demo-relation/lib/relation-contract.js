/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const { Contract } = require('fabric-contract-api');

class RelationContract extends Contract {

    async relationExists(ctx, relationId) {
        const buffer = await ctx.stub.getState(relationId);
        return (!!buffer && buffer.length > 0);
    }

    async createRelation(ctx, relationId, descricao, nota, registo,
        tiporel, iduti, entidadeA, entidadeB) {
        const exists = await this.relationExists(ctx, relationId);
        // const identity = ctx.clientIdentity;
        // const checkAttr = identity.assertAttributeValue('credenciado', 'true');

        // if (checkAttr) {
            if (exists) {
                throw new Error(`The relation ${relationId} already exists`);
            }
            if (descricao == '') {
                throw new Error(`Campo descricao obrigatorio`);
            }
            if (registo == '') {
                throw new Error(`Campo registo obrigatorio`);
            }
            if (tiporel == '') {
                throw new Error(`Campo tipo relacao obrigatorio`);
            }
            if (iduti == '') {
                throw new Error(`Campo utilizador obrigatorio`);
            }
            if (entidadeA == '') {
                throw new Error(`Campo entidade A obrigatorio`);
            }
            if (entidadeB == '') {
                throw new Error(`Campo entidade B obrigatorio`);
            }

            if (entidadeA == entidadeB) {
                throw new Error(`As entidades tem de ser diferentes`);
            }

            const asset = {
                desc: descricao,
                notas: nota,
                dataRegisto: registo,
                tipoRel: tiporel,
                idUt: iduti,
                entidade: entidadeA,
                entidade2: entidadeB
            };
            const buffer = Buffer.from(JSON.stringify(asset));
            await ctx.stub.putState(relationId, buffer);
        // }
        // else {
        //     throw new Error('Não pode submeter a relação.');
        // }
    }

    async readRelation(ctx, relationId) {
        const exists = await this.relationExists(ctx, relationId);
        if (!exists) {
            throw new Error(`The relation ${relationId} does not exist`);
        }
        const buffer = await ctx.stub.getState(relationId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateRelation(ctx, relationId, descricao, nota, registo,
        tiporel, tipout, entidadeA, entidadeB) {
        const exists = await this.relationExists(ctx, relationId);
        if (!exists) {
            throw new Error(`The relation ${relationId} does not exist`);
        }
        const asset = {
            desc: descricao,
            notas: nota,
            dataRegisto: registo,
            tipoRel: tiporel,
            tipoUt: tipout,
            entidade: entidadeA,
            entidade2: entidadeB
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(relationId, buffer);
    }

    async deleteRelation(ctx, relationId) {
        const exists = await this.relationExists(ctx, relationId);
        if (!exists) {
            throw new Error(`The relation ${relationId} does not exist`);
        }
        await ctx.stub.deleteState(relationId);
    }

    async queryAllRelation(ctx) {
        11
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const { relationId, value } of ctx.stub.getStateByRange(
            startKey, endKey)) {
                12
            const strValue = Buffer.from(value).toString('utf8');

            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                record = strValue;
            }
            allResults.push({ Key: relationId, Record: record });
        }
        return JSON.stringify(allResults);
    }

}

module.exports = RelationContract;
