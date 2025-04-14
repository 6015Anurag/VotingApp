import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../Constant/constant';
import Login from './Login';
import Finished from './Finished';
import Connected from './Connected';
import '../../src/App.css';
import Popup from './Popup';

function User() {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [votingStatus, setVotingStatus] = useState(true);
    const [remainingTime, setRemainingTime] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [number, setNumber] = useState('');
    const [canVote, setCanVote] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // 🔹 State for popup visibility
    const [error, setError] = useState('');

    useEffect(() => {
        getCandidates();
        getRemainingTime();
        getCurrentStatus();

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    }, []);

    async function getCandidates() {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        const candidatesList = await contractInstance.getAllVotesOfCandiates();

        const formattedCandidates = candidatesList.map((candidate, index) => ({
            index,
            name: candidate.name,
            voteCount: Number(candidate.voteCount),
        }));

        setCandidates(formattedCandidates);
    }

    async function handleNumberChange(e) {
      setNumber(e.target.value);
    }

    

    async function getCurrentStatus() {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const status = await contractInstance.getVotingStatus();
      console.log(status);
      setVotingStatus(status);
  }

  async function kanVote() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractAbi, signer
    );
    const voteStatus = await contractInstance.voters(await signer.getAddress());
    setCanVote(voteStatus);

  }

    async function getRemainingTime() {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const time = await contractInstance.getRemainingTime();
      console.log(parseInt(time, 16));
      // setTimeout(() => {
        setRemainingTime(parseInt(time, 16));
      // }, 1000);
  }

    function handleAccountsChanged(accounts) {
        if (accounts.length > 0 && account !== accounts[0]) {
            setAccount(accounts[0]);
            kanVote();
        } else {
            setIsConnected(false);
            setAccount(null);
        }
    }

    async function connectToMetamask() {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                setProvider(provider);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                console.log("Metamask Connected: " + address);
                setIsConnected(true);
                kanVote();
            } catch (err) {
                console.error(err);
            }
        } else {
            console.error("Metamask is not detected in the browser");
        }
    }

    async function vote() {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        const tx = await contractInstance.vote(number);
        await tx.wait();
        kanVote();
    }

    // 🔹 Function to open the verification popup
    const handleVerifyClick = (click) => {
        setIsPopupOpen(click);
    };

    // 🔹 Function to close the verification popup
    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="App">
            {votingStatus ? (
                isConnected ? (
                    <>
                        <Connected
                            account={account}
                            candidates={candidates}
                            remainingTime={remainingTime}
                            number={number}
                            handleNumberChange={(e) => setNumber(e.target.value)}
                            voteFunction={vote}
                            showButton={canVote}
                            showVerify={handleVerifyClick}
                            isAdmin={true}
                        />
                        {isPopupOpen && (
                            <Popup closePopup={handlePopupClose} account={account} isAdmin={true}/>
                        )}
                    </>
                ) : (
                    <Login connectWallet={connectToMetamask} />
                )
            ) : (
                <Finished />
            )}
        </div>
    );
}

export default User;

