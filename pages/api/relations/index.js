'use strict';
import { ncOpts } from '@/api-lib/nc';
import { ValidateProps } from '@/api-lib/constants';
import { auths, database, validateBody } from '@/api-lib/middlewares';
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
async function main() {
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
    const contract = network.getContract('demo-relation');
    // Evaluate the specified transaction.
    const result = await contract.evaluateTransaction('queryAllRelation');
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

async function mainpost(entA, entB, tp, tr, nr, user_id) {
  const crypto = require('crypto');
  const id = crypto.randomBytes(12).toString('hex');
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
    const contract = network.getContract('demo-relation');
    // Submit the specified transaction.??
    var today = new Date();
    var date =
      today.getDate() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getFullYear();
    await contract.submitTransaction(
      'createRelation',
      id,
      tp,
      nr,
      date,
      tr,
      user_id,
      entA,
      entB
    );
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

async function deleteRela(id) {
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
    const contract = network.getContract('demo-relation');
    // Submit the specified transaction.??
    await contract.submitTransaction('deleteRelation', id);
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

handler.delete(async (req, res) => {
  const post = await deleteRela(req.body.id);
  return res.json({ post });
});

handler.get(async (req, res) => {
  await main();
  return res.json({ resu });
});

async function editRelation(entA, entB, tp, tr, nr, user_id, id, date) {
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
    const contract = network.getContract('demo-relation');
    // Submit the specified transaction.??
    await contract.submitTransaction(
      'updateRelation',
      id,
      tr,
      nr,
      date,
      tp,
      user_id,
      entA,
      entB
    );
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

handler.put(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      contentEntA: ValidateProps.relation.enta,
      contentEntB: ValidateProps.relation.entb,
      contentTP: ValidateProps.relation.tipo,
      contentTR: ValidateProps.relation.titulo,
      contentNR: ValidateProps.relation.nota,
    },
    additionalProperties: true,
  }),

  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }
    const post = await editRelation(
      req.body.enta,
      req.body.entb,
      req.body.tipo,
      req.body.titulo,
      req.body.nota,
      req.user._id,
      req.body.id,
      req.body.date
    );
    return res.json({ post });
  }
);

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      contentEntA: ValidateProps.relation.enta,
      contentEntB: ValidateProps.relation.entb,
      contentTP: ValidateProps.relation.tipo,
      contentTR: ValidateProps.relation.titulo,
      contentNR: ValidateProps.relation.nota,
    },
    additionalProperties: true,
  }),

  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }
    const post = await mainpost(
      req.body.enta,
      req.body.entb,
      req.body.tipo,
      req.body.titulo,
      req.body.nota,
      req.user._id
    );
    return res.json({ post });
  }
);

export default handler;
