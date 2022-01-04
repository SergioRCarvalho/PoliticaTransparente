'use strict';
const { stringify } = require('flatted/cjs');
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
const FabricCAServices = require('fabric-ca-client');
const path = __importStar(require('path'));
const fs = __importStar(require('fs'));
async function main() {
  try {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'CidadaoWallet');
    const wallet = await fabric_network_1.Wallets.newFileSystemWallet(
      walletPath
    );
    console.log(`Wallet path: ${walletPath}`);
    // Create a new gateway for connecting to our peer node.
    const gateway = new fabric_network_1.Gateway();
    const connectionProfilePath = path.resolve(
      __dirname,
      '..',
      'CidadaoConnection.json'
    );
    const connectionProfile = JSON.parse(
      fs.readFileSync(connectionProfilePath, 'utf8')
    ); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    const connectionOptions = {
      wallet,
      identity: 'Cidadao Admin',
      discovery: { enabled: true, asLocalhost: true },
    };

    // Create a new CA client for interacting with the CA.
    const caURL =
      connectionProfile.certificateAuthorities[
        'cidadaoca-api.127-0-0-1.nip.io:8080'
      ].url;
    const ca = new FabricCAServices(caURL);

    const userIdentity = await wallet.get('Cidadao Admin');
    if (userIdentity) {
      console.log(
        'An identity for the user "sss" already exists in the wallet'
      );
      // Check to see if we've already enrolled the admin user.
      const adminIdentity = await wallet.get('Cidadao Admin');

      // build a user object for authenticating with the CA
      const provider = wallet
        .getProviderRegistry()
        .getProvider(adminIdentity.type);
      const adminUser = await provider.getUserContext(
        adminIdentity,
        'Cidadao Admin'
      );

      const a = adminUser.getSigningIdentity();
      console.log(stringify(a));
      // build a user object for authenticating with the CA
      const secret = await ca.register(
        {
          affiliation: '',
          enrollmentID: 'Cidadao CA',
          role: '',
        },
        adminUser
      );
      const enrollment = await ca.enroll({
        enrollmentID: 'testinguser',
        enrollmentSecret: secret,
      });
      const x509Identity = {
        credentials: {
          certificate: enrollment.certificate,
          privateKey: enrollment.key.toBytes(),
        },
        mspId: 'CidadaoMSP',
        type: 'X.509',
      };
      await wallet.import('testinguser', x509Identity);
      console.log(
        'Successfully registered and enrolled admin user "testinguser" and imported it into the wallet'
      );
      return;
    }

    await gateway.connect(connectionProfile, connectionOptions);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');
    // Get the contract from the network.
    const contract = network.getContract('demo-relation');
    // Evaluate the specified transaction.
    const result = await contract.evaluateTransaction('queryAllRelation');
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    // Disconnect from the gateway.
    gateway.disconnect();
  } catch (error) {
    console.error('Failed to submit transaction:', error);
    process.exit(1);
  }
}
void main();
