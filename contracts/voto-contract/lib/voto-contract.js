/*
 * SPDX-License-Identifier: Apache-2.0
 */

Object.defineProperty(exports, "__esModule", { value: true });
const { Contract } = require('fabric-contract-api');

class VotoContract extends Contract {

    async votoExists(ctx, votoId) {
        
        const buffer = await ctx.stub.getState(votoId);
        return (!!buffer && buffer.length > 0);
    }

    async relationExists(ctx, relationId) {
        const buffer = await ctx.stub.getState(relationId);
        return (!!buffer && buffer.length > 0);
    }

    async createVoto(ctx, votoId, voto, user, relacao) {
        //    const identity = ctx.clientIdentity;   
        //    const checkAttr = identity.assertAttributeValue('registado', 'true');
        //   if (checkAttr) {
            const exists = await this.votoExists(ctx, votoId);
            // const existsRelation = await this.relationExists(ctx, relacao);

            // if(!existsRelation){
            //     throw new Error(`A relação não existe`);
                
            // }

            if (exists) {
                throw new Error(`The voto ${votoId} already exists`);
            }

                if ((voto !== '1') && (voto != '0')) {
                    throw new Error(`O voto tem que ter os valores 1(sim) ou 0(nao) `);
                }
                const asset = {
                    estadoVoto: voto,
                    idUser: user,
                idRelacao: relacao,
            };
            const buffer = Buffer.from(JSON.stringify(asset));
            await ctx.stub.putState(votoId, buffer);
        //   }        
        //   else {
        //       throw new Error('Não pode submeter o voto!');
        //   }
    }

    async readVoto(ctx, votoId) {
        const exists = await this.votoExists(ctx, votoId);
        if (!exists) {
            throw new Error(`The voto ${votoId} does not exist`);
        }
        const buffer = await ctx.stub.getState(votoId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateVoto(ctx, votoId, voto, user, relacao) {
        const exists = await this.votoExists(ctx, votoId);
        if (!exists) {
            throw new Error(`The voto ${votoId} does not exist`);
        }
        const asset = {
            estadoVoto: voto,
            idUser: user,
            idRelacao: relacao,
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(votoId, buffer);
    }

    async deleteVoto(ctx, votoId) {
        const exists = await this.votoExists(ctx, votoId);
        if (!exists) {
            throw new Error(`The voto ${votoId} does not exist`);
        }
        await ctx.stub.deleteState(votoId);
    }

    async queryAllVoto(ctx) {
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

module.exports = VotoContract;
// export default e export 
// const sadfasdg = diretorio ; 
// const {Utilitario} = require("../../");