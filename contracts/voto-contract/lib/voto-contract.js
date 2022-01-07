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

    async createVoto(ctx, votoId, voto, user, relacao) {
        //    const identity = ctx.clientIdentity;   
        //    const checkAttr = identity.assertAttributeValue('registado', 'true');
        //   if (checkAttr) {
            const exists = await this.votoExists(ctx, votoId);

            if (exists) {
                throw new Error(`The voto ${votoId} already exists`);
            }

                if ((voto !== '1') && (voto !== '-1') && (voto != '0')) {
                    throw new Error(`O voto tem que ter os valores 1(sim) -1(nao) ou 0(nulo) `);
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
        let resultsIterator = await ctx.stub.getStateByRange(startKey, endKey);
		let results = await this._GetAllResults(resultsIterator, false);

		return JSON.stringify(results);
    }


async queryAllVotoByRelation(ctx, idRelacao) { 
    let queryString = {};
		queryString.selector = {};
		queryString.selector.idRelacao = idRelacao;
		return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); 
}

async GetQueryResultForQueryString(ctx, queryString) {

    let resultsIterator = await ctx.stub.getQueryResult(queryString);
    let results = await this._GetAllResults(resultsIterator, false);

    return JSON.stringify(results);
}

async _GetAllResults(iterator, isHistory) {
    let allResults = [];
    let res = await iterator.next();
    while (!res.done) {
        if (res.value && res.value.value.toString()) {
            let jsonRes = {};
            console.log(res.value.value.toString('utf8'));
            if (isHistory && isHistory === true) {
                jsonRes.TxId = res.value.txId;
                jsonRes.Timestamp = res.value.timestamp;
                try {
                    jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Value = res.value.value.toString('utf8');
                }
            } else {
                jsonRes.Key = res.value.key;
                try {
                    jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Record = res.value.value.toString('utf8');
                }
            }
            allResults.push(jsonRes);
        }
        res = await iterator.next();
    }
    iterator.close();
    return allResults;
}


}

module.exports = VotoContract;
// export default e export 
// const sadfasdg = diretorio ; 
// const {Utilitario} = require("../../");