"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_network_1 = require("fabric-network");
const path = require("path");
const fs = require("fs");
async function main() {
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'CidadaoWallet');
        const wallet = await fabric_network_1.Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        // Create a new gateway for connecting to our peer node.
        const gateway = new fabric_network_1.Gateway();
        const connectionProfilePath = path.resolve(__dirname, '..', 'connection.json');
        const connectionProfile = JSON.parse(fs.readFileSync(connectionProfilePath, 'utf8')); // eslint￾ disable-line @typescript-eslint/no-unsafe-assignment
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
        await contract.submitTransaction('createVoto', '007', '1', '004', '0024');
        console.log('Transaction has been submitted');
        // Disconnect from the gateway.
        gateway.disconnect();
    }
    catch (error) {
        console.error('Failed to submit transaction:', error);
        process.exit(1);
    }
}
void main();
