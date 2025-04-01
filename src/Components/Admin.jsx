// import React from "react";
// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { contractAbi, contractAddress } from "../Constant/constant";
// import Login from "./Login";
// import Finished from "./Finished";
// import Popup from "./Popup";
// import Connected from "./Connected";
// // import user from './Components/user';
// import "../../src/App.css";

// function Admin() {
//   const [provider, setProvider] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [votingStatus, setVotingStatus] = useState(true);
//   const [remainingTime, setremainingTime] = useState("");
//   const [candidates, setCandidates] = useState([]);
//   const [number, setNumber] = useState("");
//   const [CanVote, setCanVote] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false); // 🔹 State for popup visibility
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     getCandidates();
//     getRemainingTime();
//     getCurrentStatus();
//     if (window.ethereum) {
//       window.ethereum.on("accountsChanged", handleAccountsChanged);
//     }

//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeListener(
//           "accountsChanged",
//           handleAccountsChanged
//         );
//       }
//     };
//   }, []);

//   useEffect(() => {
//     setInterval(() => {
//       // getRemainingTime();
//     }, 1000);
//   }, []);

//   //   function VerificationRequest({ account }) {
//   //     const [file, setFile] = useState(null);
//   //     const [isUploading, setIsUploading] = useState(false);
//   //     const [isVerified, setIsVerified] = useState(false);
//   //     const [verificationStatus, setVerificationStatus] = useState('');

//   //     const handleFileChange = (e) => {
//   //       setFile(e.target.files[0]);
//   //     };

//   //     const uploadToIPFS = async (file) => {
//   //       // Implement your IPFS upload logic here
//   //       // Return the IPFS hash
//   //       return 'Qm...'; // Example hash
//   //     };}

//   //     const handleVerificationRequest = async () => {
//   //       if (!file) return;

//   //       try {
//   //         setIsUploading(true);
//   //         const imageHash = await uploadToIPFS(file);

//   //         const provider = new ethers.providers.Web3Provider(window.ethereum);
//   //         const signer = provider.getSigner();
//   //         const contract = new ethers.Contract(contractAddress, contractABI, signer);

//   //         const tx = await contract.requestVerification(imageHash);
//   //         await tx.wait();

//   //         setVerificationStatus('Pending verification from admin');
//   //         checkVerificationStatus();
//   //       } catch (error) {
//   //         console.error(error);
//   //         setVerificationStatus('Error submitting verification');
//   //       } finally {
//   //         setIsUploading(false);
//   //       }
//   //     };

//   //     const checkVerificationStatus = async () => {
//   //       const provider = new ethers.providers.Web3Provider(window.ethereum);
//   //       const contract = new ethers.Contract(contractAddress, contractABI, provider);

//   //       const isVerified = await contract.verifiedUsers(account);
//   //       const request = await contract.verificationRequests(account);

//   //       if (isVerified) {
//   //         setIsVerified(true);
//   //         setVerificationStatus('Verified! You can now vote.');
//   //       } else if (request.isPending) {
//   //         setVerificationStatus('Pending verification from admin');
//   //       } else if (!request.isApproved && !request.isPending) {
//   //         setVerificationStatus('Verification rejected. Please try again.');
//   //       }
//   //     };

//   //     // Check status when component mounts
//   // useEffect(() => {
//   //   if (account) {
//   //     checkVerificationStatus();

//   //     // Set up listener for verification events
//   //     const provider = new ethers.providers.Web3Provider(window.ethereum);
//   //     const contract = new ethers.Contract(contractAddress, contractABI, provider);

//   //     contract.on('UserVerified', (user) => {
//   //       if (user.toLowerCase() === account.toLowerCase()) {
//   //         setIsVerified(true);
//   //         setVerificationStatus('Verified! You can now vote.');
//   //       }
//   //     });

//   //     return () => {
//   //       contract.removeAllListeners();
//   //     };
//   //   }
//   // }, [account]);

//   async function vote() {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     await provider.send("eth_requestAccounts", []);
//     const signer = await provider.getSigner();
//     const contractInstance = new ethers.Contract(
//       contractAddress,
//       contractAbi,
//       signer
//     );

//     const tx = await contractInstance.vote(number);
//     await tx.wait();
//     canVote();
//   }

//   async function canVote() {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     await provider.send("eth_requestAccounts", []);
//     const signer = await provider.getSigner();
//     const contractInstance = new ethers.Contract(
//       contractAddress,
//       contractAbi,
//       signer
//     );
//     const voteStatus = await contractInstance.voters(await signer.getAddress());
//     setCanVote(voteStatus);
//   }

//   async function getCandidates() {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     await provider.send("eth_requestAccounts", []);
//     const signer = await provider.getSigner();
//     const contractInstance = new ethers.Contract(
//       contractAddress,
//       contractAbi,
//       signer
//     );
//     const candidatesList = await contractInstance.getAllVotesOfCandiates();
//     const formattedCandidates = candidatesList.map((candidate, index) => {
//       return {
//         index: index,
//         name: candidate.name,
//         voteCount: Number(candidate.voteCount),
//       };
//     });
//     setCandidates(formattedCandidates);
//   }

//   async function getCurrentStatus() {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     await provider.send("eth_requestAccounts", []);
//     const signer = await provider.getSigner();
//     const contractInstance = new ethers.Contract(
//       contractAddress,
//       contractAbi,
//       signer
//     );
//     const status = await contractInstance.getVotingStatus();
//     console.log(status);
//     setVotingStatus(status);
//   }

//   async function getRemainingTime() {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     await provider.send("eth_requestAccounts", []);
//     const signer = await provider.getSigner();
//     const contractInstance = new ethers.Contract(
//       contractAddress,
//       contractAbi,
//       signer
//     );
//     const time = await contractInstance.getRemainingTime();
//     console.log(parseInt(time, 16));
//     setremainingTime(parseInt(time, 16));
//   }

//   function handleAccountsChanged(accounts) {
//     if (accounts.length > 0 && account !== accounts[0]) {
//       setAccount(accounts[0]);
//       canVote();
//     } else {
//       setIsConnected(false);
//       setAccount(null);
//     }
//   }

//   async function connectToMetamask() {
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         setProvider(provider);
//         await provider.send("eth_requestAccounts", []);
//         const signer = await provider.getSigner();
//         const address = await signer.getAddress();
//         setAccount(address);
//         console.log("Metamask Connected : " + address);
//         setIsConnected(true);
//         canVote();
//       } catch (err) {
//         console.error(err);
//       }
//     } else {
//       console.error("Metamask is not detected in the browser");
//     }
//   }

//   async function handleNumberChange(e) {
//     setNumber(e.target.value);
//   }

//   // 🔹 Function to open the verification popup
//   const handleVerifyClick = (click) => {
//     setIsPopupOpen(click);
//   };

//   // 🔹 Function to close the verification popup
//   const handlePopupClose = () => {
//     setIsPopupOpen(false);
//     setSelectedFile(null);
//     setError("");
//   };

//   // 🔹 Handle file selection and validation
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const fileType = file.type;
//       if (fileType === "image/jpeg" || fileType === "image/png") {
//         setSelectedFile(file);
//         setError("");
//       } else {
//         setError("Only JPG and PNG files are allowed!");
//       }
//     }
//   };

//   // 🔹 Handle file upload (connect to blockchain later)
//   const handleSubmitVerification = () => {
//     if (!selectedFile) {
//       setError("Please upload an image first!");
//       return;
//     }

//     console.log("File uploaded:", selectedFile);
//     handlePopupClose(); // Close the modal after submission
//   };


// //   return (
// //     <div className="App">
// //         {votingStatus ? (
// //             isConnected ? (
// //                 <>
// //                     <Connected
// //                         account={account}
// //                         candidates={candidates}
// //                         remainingTime={remainingTime}
// //                         number={number}
// //                         handleNumberChange={(e) => setNumber(e.target.value)}
// //                         voteFunction={vote}
// //                         showButton={canVote}
// //                         showVerify={handleVerifyClick}
// //                         isAdmin={true}
// //                     />
// //                     {isPopupOpen && (
// //                         <Popup/>
// //                     )}
// //                 </>
// //             ) : (
// //                 <Login connectWallet={connectToMetamask} />
// //             )
// //         ) : (
// //             <Finished />
// //         )}
// //     </div>
// // );

 
//   //   return (
//   //     <div className="App">
//   //         {votingStatus ? (
//   //             isConnected ? (
//   //                 <>
//   //                     <Connected
//   //                         account={account}
//   //                         candidates={candidates}
//   //                         remainingTime={remainingTime}
//   //                         number={number}
//   //                         handleNumberChange={(e) => setNumber(e.target.value)}
//   //                         voteFunction={vote}
//   //                         showButton={canVote}
//   //                         showVerify={handleVerifyClick}
//   //                         isAdmin={true}
//   //                     />
//   //                     {isPopupOpen && (
//   //                         <div className="popup-overlay">
//   //                             <div className="popup-content">
//   //                                 <h2>Upload Verification Image</h2>
//   //                                 <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />
//   //                                 {error && <p style={{ color: "red" }}>{error}</p>}
//   //                                 <div className="popup-buttons">
//   //                                     <button onClick={handleSubmitVerification} style={{ backgroundColor: "#28a745", color: "white" }}>
//   //                                         Submit
//   //                                     </button>
//   //                                     <button onClick={handlePopupClose} style={{ backgroundColor: "red", color: "white" }}>
//   //                                         Cancel
//   //                                     </button>
//   //                                 </div>
//   //                             </div>
//   //                         </div>
//   //                     )}
//   //                 </>
//   //             ) : (
//   //                 <Login connectWallet={connectToMetamask} />
//   //             )
//   //         ) : (
//   //             <Finished />
//   //         )}
//   //     </div>
//   // );


//   return (
//     <div className="App">
//         {votingStatus ? (
//             isConnected ? (
//                 <>
//                     <Connected
//                         account={account}
//                         candidates={candidates}
//                         remainingTime={remainingTime}
//                         number={number}
//                         handleNumberChange={(e) => setNumber(e.target.value)}
//                         voteFunction={vote}
//                         showButton={canVote}
//                         showVerify={handleVerifyClick}
//                         isAdmin={true}
//                     />
//                     {isPopupOpen && (
//                         <Popup/>
//                     )}
//                 </>
//             ) : (
//                 <Login connectWallet={connectToMetamask} />
//             )
//         ) : (
//             <Finished />
//         )}
//     </div>
// );
// }

// export default Admin;
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

