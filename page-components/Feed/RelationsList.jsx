'use strict';
import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Post } from '@/components/Post';
import { Text } from '@/components/Text';
import { usePostPages } from '@/lib/post';
import Link from 'next/link';
import styles from './PostList.module.css';
import { zeze } from 'dist/relations';
//import { fabric_network_1 } from 'fabric-network';
//import path from 'path';
//import fs from 'fs';

//const fabric_network_1 = require('fabric-network');
//const path = __importStar(require('path'));
//const fs = __importStar(require('fs'));
/*async function main() {
  try {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'CidadaoWallet');
    const wallet = await fabric_network_1.Wallets.newFileSystemWallet(
      walletPath
    );
    console.log(`Wallet path: ${walletPath}`);
    // Create a new gateway for connecting to our peer node.
    const gateway = new fabric_network_1.Gateway();
    const connectionProfilePath = '../CidadaoConnection.json';
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
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    // Disconnect from the gateway.
    gateway.disconnect();
  } catch (error) {
    console.error('Failed to submit transaction:', error);
    process.exit(1);
  }
}*/
//void main();
const List = () => {
 // const { result } = zeze();
  const posts = '';

  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>{posts.toString} sadsdasd</Wrapper>
    </div>
  );
};

export default List;
