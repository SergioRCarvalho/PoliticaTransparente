# PoliticaTransparente

The objective is to create a web application where we will have several users, these users can be anonymous in case they are not registered, citizen in case the user proceeds to register, if the user is created by the administrator, then the user is accredited which guarantees other privileges and finally the administrator for managing members. If the user has an account on the Platform, he can view the relationships and cast votes, otherwise he will only be able to view, if the user has privileges (is accredited), he can insert relationships.


Administrator
1.	Create users (administrator, politician and accredited user type);
2.	Consult users;
3.	Edit users;
4.	Delete users;
5.	Consult records;

Anonymous (unregistered citizen)
1.	Create account;
2.	Consult records.

Accredited user
1.	Register Entities (Politicians, Companies, …);
2.	Record relationships between entities (reasons, events, contract values, …);
3.	Consult relationships;
4.	Insert votes in the lists made (do not allow voting for the same).

Registered citizen
1.	Delete account (deactivate);
2.	Consult your own data;
3.	Edit your own data;
4.	Consult relationships;
5.	Insert votes in the relationships made.



Website:
The React Framework for Production, Vercel: https://nextjs.org/
A JavaScript library for building user interfaces, React: https://reactjs.org/
Simple, unobtrusive authentication for Node.js, Passaport.js: https://www.passportjs.org/
MongoDB is a document database designed for ease of development and scaling, MongoDB: https://www.mongodb.com/

![Imagem1](https://user-images.githubusercontent.com/25557099/153646732-33270366-1867-402c-a38c-d19e13155266.png)

![Imagem3](https://user-images.githubusercontent.com/25557099/153647253-b0dcc7cd-5ece-4d39-8899-5144f324336c.png)
Administrator use cases

![Imagem4](https://user-images.githubusercontent.com/25557099/153647255-dd4e09f4-e6aa-4cf3-ad86-d8202d027e3f.png)
Anonymous use cases

![Imagem5](https://user-images.githubusercontent.com/25557099/153647256-eabea4df-7497-4787-a982-9e5e84829cf6.png)
Citizen use cases

![Imagem6](https://user-images.githubusercontent.com/25557099/153647257-5d799121-a73e-4b84-8aa2-c39292e70d57.png)
Accredited user use cases

![Imagem7](https://user-images.githubusercontent.com/25557099/153647260-1efd49af-512e-445d-8939-a56d708a335b.png)
Architeture 

![Screenshot_1](https://user-images.githubusercontent.com/25557099/153649361-3a659da3-f30c-4d4d-8e00-6a9e4059fb9c.png)


![Screenshot_2](https://user-images.githubusercontent.com/25557099/153649519-b4ea67c2-0ce3-4654-8d7a-ce1ff6c0b44e.png)


![Screenshot_3](https://user-images.githubusercontent.com/25557099/153649672-c3f7a2b9-c04e-4836-96e0-c78cfbe1de27.png)



![hla](https://user-images.githubusercontent.com/25557099/153650735-dcce8bc0-80fc-4632-ae03-b197ddbdc8c9.png)

To configure our network, we enter the project directory through WSL and execute the following code.

export MICROFAB_CONFIG='{"port": 8080,"endorsing_organizations":[{"name": "Admin"},{"name": "Credenciado"},{"name": "Cidadao"},{"name": "Anonimo"}],"channels":[{"name":"mychannel","endorsing_organizations":["Admin","Credenciado","Cidadao","Anonimo"]}]}'
  

And then we create the image in Docker

docker run -e MICROFAB_CONFIG -p 8080:8080 ibmcom/ibp-microfab:0.0.11 


Hyperledger Fabric network: 
Creating a Hyperledger Fabric network from scratch — Part IV SDK and Rest API, Iván Alberquilla :
https://medium.com/coinmonks/creating-a-hyperledger-fabric-network-from-scratch-part-iv-sdk-and-rest-api-29594e89fefa
Hyperledger Fabric SDK for Node.js, Hyperledger: https://github.com/hyperledger/fabric-sdk-node 
Configuração multi-organizacional microfab, IBM-Blockchain: https://github.com/IBM-Blockchain/microfab


![Imagem8](https://user-images.githubusercontent.com/25557099/153647261-999aa353-19f5-450f-a4e1-d8848748b9e8.png)
Home page

![Imagem9](https://user-images.githubusercontent.com/25557099/153647262-b1921c8b-66f3-4be4-bca5-baa2d0a7eae9.png)
Login

![Imagem10](https://user-images.githubusercontent.com/25557099/153648080-f7ecfb71-0925-4578-b273-51cd1d7bde49.png)
Recover password

![Imagem11](https://user-images.githubusercontent.com/25557099/153648083-42a8469f-3e78-49a7-9768-6453ee560857.png)
Citizen registration

![Imagem12](https://user-images.githubusercontent.com/25557099/153648102-26568e95-c3c8-4395-ac15-bb8b34907a06.png)
List of created relations

![Imagem13](https://user-images.githubusercontent.com/25557099/153647264-a929213b-8487-4242-b78f-74734d27b37c.png)
Vote registration, to cancel the vote the user needs to click again on the button

![Imagem14](https://user-images.githubusercontent.com/25557099/153647265-891f87f9-7c21-4ecb-86f7-3ee34dd9a981.png)
Search box with autocomplete

![Imagem15](https://user-images.githubusercontent.com/25557099/153647267-ec58afcd-13f0-40b8-8ffb-bc6c2206667c.png)
Relation details

![Imagem16](https://user-images.githubusercontent.com/25557099/153647270-c5dc5f10-cdba-4cc1-97a7-c5a7ec127097.png)
Relation Comments

![Imagem17](https://user-images.githubusercontent.com/25557099/153647274-34551e2a-939a-4b4c-85ea-e3468e33c6e8.png)
User profile part 1

![Imagem18](https://user-images.githubusercontent.com/25557099/153647276-a91c4863-d096-4468-a46e-978f664a9483.png)
User profile part 2

![Imagem19](https://user-images.githubusercontent.com/25557099/153647277-f2b7eb92-cd6d-4dba-9468-f9fec168fb5d.png)
In case a user tries to vote without having an account

![Imagem20](https://user-images.githubusercontent.com/25557099/153647278-f0a91d01-8e83-4496-bbeb-507b52e74a00.png)
If a user tries to comment without having an account

![Imagem21](https://user-images.githubusercontent.com/25557099/153648553-874edb88-f151-4729-bf1f-df2b17dbfd25.png)
If the user is accredited, he can add relationships from the FAB

![Imagem22](https://user-images.githubusercontent.com/25557099/153648558-7dfdb785-4e36-43cf-8b4a-3f6b58f115bd.png)
In case the relationship belongs to the user accredited by editing or removing

![Imagem23](https://user-images.githubusercontent.com/25557099/153648561-878abfa3-59d0-4ae7-b52c-4f6618a6f08a.png)
Edit Relation

![Imagem24](https://user-images.githubusercontent.com/25557099/153647282-d0ed956e-116a-4a57-9fed-a8781d68f615.png)
Remove Relation

![Imagem25](https://user-images.githubusercontent.com/25557099/153647283-6f58c2ba-6e34-4c1b-8a7d-ef1e2286fc71.png)
Administrator page

![Imagem26](https://user-images.githubusercontent.com/25557099/153647284-958cc2aa-9552-4cea-967d-676e69af267f.png)
User activity graphs

Before run project you need to configure your blockchain network, the smart contract can be fund on contract folder
You will need to configure the network schema

Install project:

install nvm
sudo apt install curl 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 

install node v12.13.1
install node v12.22.0 at least(need to run project)
nvm install v12.13.1
nvm install v12.22.0


git clone https://github.com/SergioRCarvalho/PoliticaTransparente.git

open project

nvm use v12.13.0
npm install

now you can run project:
npm use v12.22.0
next dev
