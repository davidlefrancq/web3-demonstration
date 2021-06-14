import React, {Component} from 'react';
import Web3 from "web3";

class DecodeAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msgDecrypted:"",
            msgToDescrypt: "",
            addressOfMessageSender:"",
        };
    }


    recoverAddressOfMessage = () => {

        const web3 = new Web3(Web3.givenProvider);
        const addressOfMessageSender = web3.eth.accounts.recover(this.state.msgDecrypted, this.state.msgToDescrypt);

        if(addressOfMessageSender){
            const state = {...this.state};
            state.addressOfMessageSender = addressOfMessageSender;
            this.setState(state);
        }
    }

    msgDecryptedUpdate = (e) => {
        const state = {...this.state};
        state.msgDecrypted = e.target.value;
        this.setState(state);
    }

    msgCryptedUpdate = (e) => {
        const state = {...this.state};
        state.msgToDescrypt = e.target.value;
        this.setState(state);
    }

    renderDecodeForm() {
        return (
            <div>
                <div>
                    Message
                    <input value={this.state.msgDecrypted} onChange={(e)=>{this.msgDecryptedUpdate(e)}}/>
                </div>
                <div>
                    Encrypted String
                    <input value={this.state.msgToDescrypt} onChange={(e)=>{this.msgCryptedUpdate(e)}}/>
                </div>
                <button onClick={this.recoverAddressOfMessage}>Recover Address from Message</button>
                <div className={"result"}>
                    {this.state.addressOfMessageSender}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h2>Recover Address</h2>
                {this.renderDecodeForm()}
            </div>
        );
    }
}

export default DecodeAddress;
