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
    const [selectedFile, setSelectedFile] = useState(null);
    const[approve,setApprove] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // 🔹 State for popup visibility


      const getDetails = async (account)=>{
        try {
          const response = await fetch(`https://dvapp-backend-rrb4.onrender.com/api/getimage/${account}`, {
            method: "GET",
          });
          const data = await response.json();
          console.log(data.user);
          setApprove(data.user.approved)
          
          if (response.ok) {
            console.log("Status : Approved ", data);
          } else {
            console.log("Something: ", data.message)
          }
        } catch (error) {
          console.log("An error: ",error)
        }
      }
    

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
                getDetails(address)
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

    const handlePopupClose = (popup, file) => {
        setIsPopupOpen(popup);
        setSelectedFile(file);
        console.log(selectedFile);
    };

    // 🔹 Function to open the verification popup
    const handleVerifyClick = (click) => {
        console.log("From handleverifyclick",click)
        setIsPopupOpen(click);
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
                            approve = {approve}
                            voteFunction={vote}

                            showButton={canVote}
                            showVerify={handleVerifyClick}
                            isAdmin={false}
                        />
                        {isPopupOpen && (
                            <Popup closePopup={handlePopupClose} account={account} isAdmin={false} />
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



