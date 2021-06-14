import React, {Component} from 'react';
import Web3 from "web3";

class EncodeMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            w3Connected: null,
            msg: "",
            msgEncrypted: null,
        };
    }

    connectToWeb3 = async () => {
        if (window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'}).then((result) => {

                const state = {...this.state};
                state.w3Connected = result;
                this.setState(state);

                console.log('connection ok', result);
            }).catch((error) => {
                console.error(error);
            });
        } else {
            alert("Install Metamask");
        }
    }

    encryptMsg = async () => {
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts();
        web3.eth.personal.sign(this.state.msg, accounts[0]).then(this.encryptMsgCallback).catch((error) => {
            console.error(error);
        });
    }

    encryptMsgCallback = (msgEncrypted) => {
        const state = {...this.state};
        state.msgEncrypted = msgEncrypted;
        this.setState(state);
    }

    updateMsg(e) {
        const newMsg = e.target.value;
        const state = {...this.state};
        state.msg = newMsg;
        this.setState(state);
    }


    renderConnexionW3Button() {
        if (!this.state.w3Connected) {
            return (
                <button onClick={this.connectToWeb3}>
                    Connect to Web3
                </button>
            );
        }
    }

    renderConnexionW3State() {
        if (this.state.w3Connected) {
            return (
                <div>Connected</div>
            );
        }
    }

    renderConnexionW3() {
        return (
            <div>
                {this.renderConnexionW3Button()}
                {this.renderConnexionW3State()}
            </div>
        );
    }

    renderMsgEncrypted() {
        if (this.state.w3Connected) {
            if (this.state.msgEncrypted) {
                return (
                    <div className={"result"}>
                        {this.state.msgEncrypted}
                    </div>
                );
            }
        }
    }

    renderMsgSign() {

        if (this.state.w3Connected) {

            return (
                <div>
                    <input type={"text"} value={this.state.msg} onChange={(e) => {
                        this.updateMsg(e);
                    }}/>
                    <button onClick={this.encryptMsg}>Sign Message</button>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h2>Sign Message</h2>

                {this.renderConnexionW3()}

                {this.renderMsgSign()}

                {this.renderMsgEncrypted()}

            </div>
        );
    }
}

export default EncodeMessage;
