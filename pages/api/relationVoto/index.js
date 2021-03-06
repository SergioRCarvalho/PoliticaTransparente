'use strict';
import { ncOpts } from '@/api-lib/nc';
import { ValidateProps } from '@/api-lib/constants';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { v4 as uuidv4 } from 'uuid';
import nc from 'next-connect';

const handler = nc(ncOpts);
var resu = '';
handler.use(database);
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
const fabric_network_1 = require('fabric-network');
const path = __importStar(require('path'));
const fs = __importStar(require('fs'));
async function main(IdRelation) {
  try {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'CidadaoWallet');
    const wallet = await fabric_network_1.Wallets.newFileSystemWallet(
      walletPath
    );
    // Create a new gateway for connecting to our peer node.
    const gateway = new fabric_network_1.Gateway();
    const connectionProfilePath = path.resolve('CidadaoConnection.json');
    const connectionProfile = JSON.parse(
      fs.readFileSync(connectionProfilePath, 'utf8')
    ); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    const connectionOptions = {
      wallet,
      identity: 'Cidadao Admin',
      discovery: { enabled: true, asLocalhost: true },
    };
    await gateway.connect(connectionProfile, connectionOptions);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');
    // Get the contract from the network.
    const contract = network.getContract('voto-contract');
    // Evaluate the specified transaction.
    const result = await contract.evaluateTransaction(
      'queryAllVotoByRelation',
      IdRelation
    );
    resu = JSON.parse(result.toString());
    // Disconnect from the gateway.
    gateway.disconnect();
  } catch (error) {
    console.error('Failed to submit transaction:', error);
    return status(400).json({
      error: {
        message: `"${error.instancePath.substring(1)}" ${error.message}`,
      },
    });
  }
}

async function mainpost(voto, idRelacao, user_id) {
  try {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'CidadaoWallet');
    const wallet = await fabric_network_1.Wallets.newFileSystemWallet(
      walletPath
    );
    // Create a new gateway for connecting to our peer node.
    const gateway = new fabric_network_1.Gateway();
    const connectionProfilePath = path.resolve('CidadaoConnection.json');
    const connectionProfile = JSON.parse(
      fs.readFileSync(connectionProfilePath, 'utf8')
    ); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    const connectionOptions = {
      wallet,
      identity: 'Cidadao Admin',
      discovery: { enabled: true, asLocalhost: true },
    };
    await gateway.connect(connectionProfile, connectionOptions);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');
    // Get the contract from the network.
    const contract = network.getContract('voto-contract');
    // Submit the specified transaction.
    await contract.submitTransaction(
      'createVoto',
      uuidv4(),
      voto,
      user_id,
      idRelacao
    );
    console.log('Success');

    // Disconnect from the gateway.
    gateway.disconnect();
  } catch (error) {
    console.error('Failed to submit transaction:', error);
    return status(400).json({
      error: {
        message: `"${error.instancePath.substring(1)}" ${error.message}`,
      },
    });
  }
}

handler.get(async (req, res) => {
  await main(req.query.id);
  return res.json({ resu });
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      voto: ValidateProps.voto.voto,
      idRelation: ValidateProps.voto.idRelation,
    },
    additionalProperties: true,
  }),

  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }
    const post = await mainpost(
      req.body.voto,
      req.body.idRelation,
      req.user._id
    );
    return res.json({ post });
  }
);

export default handler;
