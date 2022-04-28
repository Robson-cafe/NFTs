import React, {Component} from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBirdz from "../abis/KryptoBirdz.json";
import {MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn} from 'mdb-react-ui-kit';

class App extends Component {
    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() {
        const provider = await detectEthereumProvider();
        if(provider) {
            console.log('ethereum wallet is connected');
            window.web3 = new Web3(provider);
        } 
        else {
            console.log('no ethereum wallet desconnected');
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        this.setState({account:accounts[0]});
        //console.log(this.state.account);

        const networkId = await web3.eth.net.getId();
        const networkData = KryptoBirdz.networks[networkId];
        
        if(networkData){
            const abi = KryptoBirdz.abi;
            const address = networkData.address;
            const contract = new web3.eth.Contract(abi, address);
            this.setState({contract});
            console.log(this.state.contract);

            const totalSupply = await contract.methods.totalSupply().call();
            this.setState({totalSupply});

            for (let i = 1; i <= totalSupply; i++) {
                const KryptoBird = await contract.methods.kryptoBird(i - 1).call();
                this.setState({
                    kryptobirdz: [...this.state.kryptobirdz, KryptoBird]
                });
            }
            console.log(this.state.kryptobirdz);
        } 
        else {
            window.alert('smart concract no deploy');
        }
    }

    mint = (kryptobird) => {
        this.state.contract.methods.mint(kryptobird).send({from: this.state.account})
        .once('receipt', (receipt) => {
            this.setState({
                kryptobirdz: [...this.state.kryptobirdz, KryptoBirdz]
            })
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            contract: null,
            totalSupply: 0,
            kryptobirdz: []
        }
    }

    render() {
        return(
            <div>
                {console.log(this.state.kryptobirdz)};

                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <div className="navbar-brand col-sm-3 col-md-3 mr-0"
                    style={{color:'white'}}>
                        KriptoBirdz NFT
                    </div>
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                            <small className="text-white">
                                {this.state.account}
                            </small>
                        </li>

                    </ul>
                </nav>

                <div className="container-fluid mt-1">
                    <div className="row">
                        <main role='main' className="col-lg-12 d-flex text-center">
                            <div className="content mr-auto ml-auto"
                                style={{opacity:'0.8'}}>
                                
                                <h1 style={{color:'white'}}>KryptoBirdz - NFT Tokens</h1>

                                <form onSubmit={(event)=> {
                                    event.preventDefault();
                                    const kryptobird = this.kryptoBird.value;
                                    this.mint(kryptobird);
                                }}>
                                    <input type="text" placeholder="Add a file location" className="form-control mb-1"
                                    ref= {(input) => this.kryptoBird = input}/>
                                    <input style={{margin:'6px'}} type='submit' className="btn btn-primary btn-black" value='MINT'/>
                                </form>  
                            </div>
                        </main>
                    </div>
                    
                    <div className="row textCenter">
                        {this.state.kryptobirdz.map((kryptoBird, key) => {
                            return(
                                <div>
                                    <div>
                                        <MDBCard className="token-img" style={{maxWidth: '22rem'}}>
                                            <MDBCardImage src={kryptoBird} position='top' height='250rem' style={{marginRight:'4px'}}/>
                                            <MDBCardBody>
                                                <MDBCardTitle>KryptoBirdz</MDBCardTitle>
                                                <MDBCardText>
                                                    Os KryptoBirdz são 10 Passarinhos únicos da Galaxia CyberPunk!!! Baseado na tecnologia da Etherreu,
                                                    cada pássaro possui apenas um dono que pode ser você!!!
                                                </MDBCardText>
                                                <MDBBtn href={kryptoBird}>Download</MDBBtn>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    
                </div>

            </div>
        )
    }

}

export default App;