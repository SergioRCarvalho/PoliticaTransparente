'use strict';
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

export async function createwallet(user) {
  try {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'CidadaoWallet');
    const wallet = await fabric_network_1.Wallets.newFileSystemWallet(
      walletPath
    );
    // Create a new gateway for connecting to our peer node.
    const connectionProfilePath = path.resolve('CidadaoConnection.json');
    const connectionProfile = JSON.parse(
      fs.readFileSync(connectionProfilePath, 'utf8')
    );
    // Create a new CA client for interacting with the CA.
    const caURL =
      connectionProfile.certificateAuthorities[
        'cidadaoca-api.127-0-0-1.nip.io:8080'
      ].url;
    const ca = new FabricCAServices(caURL);
    const userIdentity = await wallet.get('Cidadao CA Admin');
    if (userIdentity) {
      // Check to see if we've already enrolled the admin user.
      const adminIdentity = await wallet.get('Cidadao CA Admin');
      // build a user object for authenticating with the CA
      const provider = wallet
        .getProviderRegistry()
        .getProvider(adminIdentity.type);
      const adminUser = await provider.getUserContext(
        adminIdentity,
        'Cidadao CA Admin'
      );
      const user_id = 'credenciado;' + user;
      try {
        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(user_id);
        if (userIdentity) {
          const errors = JSON.parse(
            '[{"message":"An identity for the user ' +
              user_id +
              ' already exists in the wallet! Contact support!"}]'
          );
          return { errors };
        }
        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register(
          {
            affiliation: '',
            enrollmentID: user_id,
            role: '',
          },
          adminUser
        );
        const enrollment = await ca.enroll({
          enrollmentID: user_id,
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
        await wallet.put(user_id, x509Identity);
        const resu = JSON.parse('[{"user_id":"' + user_id + '"}]');
        return { resu };
      } catch (error) {
        return error;
      }
    }
  } catch (error) {
    return error;
  }
}
