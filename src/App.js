import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import React, { useEffect, useState } from "react";


function App() {
  const [gretting, setGrettingValue] = useState();

  async function requestAccount() {
    await window.ethereum.request({method: 'eth_requestAccounts'});
  }

  async function fetchGreeting() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Greeter.abi, provider);

      try {
        const data = await contract.greet();
        setGrettingValue(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function setGreeting() {
    if(gretting) {
      if (window.ethereum) {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(ethers.constants.AddressZero, Greeter.abi, signer);

        const transaction = await contract.setGreeting(gretting);
        await transaction.wait();
        
        await fetchGreeting();
      }
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={requestAccount}>Request account</button>
        <button onClick={fetchGreeting}>fetchGreeting</button>
        <button onClick={setGreeting}>setGreeting</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {gretting}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
