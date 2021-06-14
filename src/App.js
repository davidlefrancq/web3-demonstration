import './App.css';
import EncodeMessage from "./components/EncodeMessage";
import DecodeAddress from "./components/DecodeAddress";

function App() {
    return (
        <div className="App">
            <h1>Web3 Demonstration</h1>
            <div className={"main"}>
                <EncodeMessage/>
                <DecodeAddress/>
            </div>
        </div>
    );
}

export default App;
