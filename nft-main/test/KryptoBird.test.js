const {assert} = require('chai');

const KryptoBird = artifacts.require('./KryptoBirdz');

require('chai').use(require('chai-as-promised')).should();

contract('KryptoBirdz', (accounts) => {
    let contract;

    before(async() => {
        contract = await KryptoBird.deployed();
    });

    describe('deployment', async() => {
        it('deploys sucessfully', async() => {
            const address = contract.address;
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
            assert.notEqual(address, '0x0000000000000000000000000000000000000000');
        });

        it('has a name', async() => {
            const name = await contract.name();
            assert.equal(name, 'KryptoBirds');
        });

        it('has a symbol', async() => {
            const symbol = await contract.symbol();
            assert.equal(symbol, 'KBIRDS');
        });
    });

    describe('minting', async() => {
        it('creates a new token', async() => {
            const result = await contract.mint('k1');
            const totalSupply = await contract.totalSupply();
            
            //sucesso
            assert.equal(totalSupply, 1);
            const event = result.logs[0].args;
            assert.equal(event.from, '0x0000000000000000000000000000000000000000');
            assert.equal(event.to, accounts[0], '_to is this msg.sender');

            //falha
            await contract.mint('k1').should.be.rejected;
        });
    });

    describe('indexing', async() => {
        it('list KryptoBirdz', async()=> {
            await contract.mint('k2');
            await contract.mint('k3');
            await contract.mint('k4');

            const totalSupply = await contract.totalSupply();

            let result =[];
            let KryptoBird;

            for(i = 1; i <= totalSupply; i++) {
                KryptoBird = await contract.kryptoBird(i - 1);
                result.push(KryptoBird);
            }

            let expected = ['k1', 'k2', 'k3', 'k4']
            assert.equal(result.join(','), expected.join(',')); 
        });
    });
});