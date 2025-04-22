// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import { contractAbi, contractAddress } from '../Constant/constant';
// import Login from './Login';
// import Finished from './Finished';
// import Connected from './Connected';
// import '../../src/App.css';
// import Popup from './Popup';

// function User() {
//     const [provider, setProvider] = useState(null);
//     const [account, setAccount] = useState(null);
//     const [isConnected, setIsConnected] = useState(false);
//     const [votingStatus, setVotingStatus] = useState(true);
//     const [remainingTime, setRemainingTime] = useState('');
//     const [candidates, setCandidates] = useState([]);
//     const [number, setNumber] = useState('');
//     const [canVote, setCanVote] = useState(true);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const[approve,setApprove] = useState(false);
//     const [isPopupOpen, setIsPopupOpen] = useState(false); // 🔹 State for popup visibility

//       const getDetails = async (account)=>{
//         try {
//           const response = await fetch(`https://dvapp-backend-rrb4.onrender.com/api/getimage/${account}`, {
//             method: "GET",
//           });
//           const data = await response.json();
//           console.log(data.user);
//           setApprove(data.user.approved)

//           if (response.ok) {
//             console.log("Status : Approved ", data);
//           } else {
//             console.log("Something: ", data.message)
//           }
//         } catch (error) {
//           console.log("An error: ",error)
//         }
//       }

//     useEffect(() => {
//         getCandidates();
//         getRemainingTime();
//         getCurrentStatus();

//         if (window.ethereum) {
//             window.ethereum.on('accountsChanged', handleAccountsChanged);
//         }

//         return () => {
//             if (window.ethereum) {
//                 window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
//             }
//         };
//     }, []);

//     async function getCandidates() {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         const signer = await provider.getSigner();
//         const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
//         const candidatesList = await contractInstance.getAllVotesOfCandiates();

//         const formattedCandidates = candidatesList.map((candidate, index) => ({
//             index,
//             name: candidate.name,
//             voteCount: Number(candidate.voteCount),
//         }));

//         setCandidates(formattedCandidates);
//     }

//     async function handleNumberChange(e) {
//       setNumber(e.target.value);
//     }

//     async function getCurrentStatus() {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = await provider.getSigner();
//       const contractInstance = new ethers.Contract (
//         contractAddress, contractAbi, signer
//       );
//       const status = await contractInstance.getVotingStatus();
//       console.log(status);
//       setVotingStatus(status);
//   }

//   async function kanVote() {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     await provider.send("eth_requestAccounts", []);
//     const signer = await provider.getSigner();
//     const contractInstance = new ethers.Contract (
//       contractAddress, contractAbi, signer
//     );
//     const voteStatus = await contractInstance.voters(await signer.getAddress());
//     setCanVote(voteStatus);

//   }

//     async function getRemainingTime() {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = await provider.getSigner();
//       const contractInstance = new ethers.Contract (
//         contractAddress, contractAbi, signer
//       );
//       const time = await contractInstance.getRemainingTime();
//       console.log(parseInt(time, 16));
//       // setTimeout(() => {
//         setRemainingTime(parseInt(time, 16));
//       // }, 1000);
//   }

//     function handleAccountsChanged(accounts) {
//         if (accounts.length > 0 && account !== accounts[0]) {
//             setAccount(accounts[0]);
//             kanVote();
//         } else {
//             setIsConnected(false);
//             setAccount(null);
//         }
//     }

//     async function connectToMetamask() {
//         if (window.ethereum) {
//             try {
//                 const provider = new ethers.BrowserProvider(window.ethereum);
//                 setProvider(provider);
//                 await provider.send("eth_requestAccounts", []);
//                 const signer = await provider.getSigner();
//                 const address = await signer.getAddress();
//                 setAccount(address);
//                 getDetails(address)
//                 console.log("Metamask Connected: " + address);
//                 setIsConnected(true);
//                 kanVote();
//             } catch (err) {
//                 console.error(err);
//             }
//         } else {
//             console.error("Metamask is not detected in the browser");
//         }
//     }

//     async function vote() {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         const signer = await provider.getSigner();
//         const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
//         const tx = await contractInstance.vote(number);
//         await tx.wait();
//         kanVote();
//     }

//     const handlePopupClose = (popup, file) => {
//         setIsPopupOpen(popup);
//         setSelectedFile(file);
//         console.log(selectedFile);
//     };

//     // 🔹 Function to open the verification popup
//     const handleVerifyClick = (click) => {
//         console.log("From handleverifyclick",click)
//         setIsPopupOpen(click);
//     };

//     return (
//         <div className="App">
//             {votingStatus ? (
//                 isConnected ? (
//                     <>
//                         <Connected
//                             account={account}
//                             candidates={candidates}
//                             remainingTime={remainingTime}
//                             number={number}
//                             handleNumberChange={(e) => setNumber(e.target.value)}
//                             approve = {approve}
//                             voteFunction={vote}

//                             showButton={canVote}
//                             showVerify={handleVerifyClick}
//                             isAdmin={false}
//                         />
//                         {isPopupOpen && (
//                             <Popup closePopup={handlePopupClose} account={account} isAdmin={false} />
//                         )}
//                     </>
//                 ) : (
//                     <Login connectWallet={connectToMetamask} />
//                 )
//             ) : (
//                 <Finished />
//             )}
//         </div>
//     );
// }

// export default User;

// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import { contractAbi, contractAddress } from '../Constant/constant';
// import Login from './Login';
// import Finished from './Finished';
// import Connected from './Connected';
// import '../../src/App.css';
// import Popup from './Popup';

// // NEW: Face verification imports
// import AuthPopup from './AuthPopup';
// import * as faceapi from 'face-api.js';

// function User() {
//     // ORIGINAL STATE (unchanged)
//     const [provider, setProvider] = useState(null);
//     const [account, setAccount] = useState(null);
//     const [isConnected, setIsConnected] = useState(false);
//     const [votingStatus, setVotingStatus] = useState(true);
//     const [remainingTime, setRemainingTime] = useState('');
//     const [candidates, setCandidates] = useState([]);
//     const [number, setNumber] = useState('');
//     const [canVote, setCanVote] = useState(true);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [approve, setApprove] = useState(false);
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const [modelsLoaded, setModelsLoaded] = useState(false);

//     // NEW STATE for face verification
//     const [referenceImage, setReferenceImage] = useState(null);
//     const [showAuthPopup, setShowAuthPopup] = useState(false);
//     const [faceMatch, setFaceMatch] = useState(null);

//     // NEW: Load face-api models (added to existing useEffect)
//     // useEffect(() => {
//     //     // Original code remains first
//     //     getCandidates();
//     //     getRemainingTime();
//     //     getCurrentStatus();

//     //     if (window.ethereum) {
//     //         window.ethereum.on('accountsChanged', handleAccountsChanged);
//     //     }

//     //     return () => {
//     //         if (window.ethereum) {
//     //             window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
//     //         }
//     //     };

//     //     // NEW: Add face-api model loading
//     //     faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
//     // }, []);

//     useEffect(() => {
//       const loadModels = async () => {
//           try {
//               await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
//               await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
//               await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
//               setModelsLoaded(true);
//           } catch (error) {
//               console.error("Failed to load face-api models:", error);
//           }
//       };

//       // Original code remains
//       getCandidates();
//       getRemainingTime();
//       getCurrentStatus();

//       if (window.ethereum) {
//           window.ethereum.on('accountsChanged', handleAccountsChanged);
//       }

//       loadModels(); // Load models after initial setup

//       return () => {
//           if (window.ethereum) {
//               window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
//           }
//       };
//   }, []);

//     // ORIGINAL getDetails function (with NEW additions)
//     const getDetails = async (account) => {
//         try {
//             const response = await fetch(`https://dvapp-backend-rrb4.onrender.com/api/getimage/${account}`, {
//                 method: "GET",
//             });
//             const data = await response.json();
//             console.log(data.user);
//             setApprove(data.user.approved);

//             // NEW: Store reference image if approved
//             if (data.user.approved && data.imageUrl) {
//                 setReferenceImage(data.imageUrl);
//             }

//             if (response.ok) {
//                 console.log("Status : Approved ", data);
//             } else {
//                 console.log("Something: ", data.message);
//             }
//         } catch (error) {
//             console.log("An error: ", error);
//         }
//     };

//     // NEW: Face verification function
//     const verifyFaceMatch = async (liveImageFile) => {
//         try {
//             if (!referenceImage) return false;

//             const liveImg = await faceapi.bufferToImage(liveImageFile);
//             const refImg = await faceapi.fetchImage(referenceImage);

//             const liveDetection = await faceapi.detectSingleFace(liveImg).withFaceDescriptor();
//             const refDetection = await faceapi.detectSingleFace(refImg).withFaceDescriptor();

//             if (!refDetection || !liveDetection) return false;

//             const distance = faceapi.euclideanDistance(
//                 refDetection.descriptor,
//                 liveDetection.descriptor
//             );

//             return distance < 0.6;
//         } catch (error) {
//             console.error("Face verification failed:", error);
//             return false;
//         }
//     };

//     // ALL ORIGINAL FUNCTIONS REMAIN EXACTLY THE SAME:
//     async function getCandidates() {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         const signer = await provider.getSigner();
//         const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
//         const candidatesList = await contractInstance.getAllVotesOfCandiates();

//         const formattedCandidates = candidatesList.map((candidate, index) => ({
//             index,
//             name: candidate.name,
//             voteCount: Number(candidate.voteCount),
//         }));

//         setCandidates(formattedCandidates);
//     }

//     async function handleNumberChange(e) {
//         setNumber(e.target.value);
//     }

//     async function getCurrentStatus() {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         const signer = await provider.getSigner();
//         const contractInstance = new ethers.Contract(
//             contractAddress, contractAbi, signer
//         );
//         const status = await contractInstance.getVotingStatus();
//         console.log(status);
//         setVotingStatus(status);
//     }

//     async function kanVote() {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         const signer = await provider.getSigner();
//         const contractInstance = new ethers.Contract(
//             contractAddress, contractAbi, signer
//         );
//         const voteStatus = await contractInstance.voters(await signer.getAddress());
//         setCanVote(voteStatus);
//     }

//     async function getRemainingTime() {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         const signer = await provider.getSigner();
//         const contractInstance = new ethers.Contract(
//             contractAddress, contractAbi, signer
//         );
//         const time = await contractInstance.getRemainingTime();
//         console.log(parseInt(time, 16));
//         setRemainingTime(parseInt(time, 16));
//     }

//     function handleAccountsChanged(accounts) {
//         if (accounts.length > 0 && account !== accounts[0]) {
//             setAccount(accounts[0]);
//             kanVote();
//         } else {
//             setIsConnected(false);
//             setAccount(null);
//         }
//     }

//     async function connectToMetamask() {
//         if (window.ethereum) {
//             try {
//                 const provider = new ethers.BrowserProvider(window.ethereum);
//                 setProvider(provider);
//                 await provider.send("eth_requestAccounts", []);
//                 const signer = await provider.getSigner();
//                 const address = await signer.getAddress();
//                 setAccount(address);
//                 getDetails(address);
//                 console.log("Metamask Connected: " + address);
//                 setIsConnected(true);
//                 kanVote();
//             } catch (err) {
//                 console.error(err);
//             }
//         } else {
//             console.error("Metamask is not detected in the browser");
//         }
//     }

//     async function vote() {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         const signer = await provider.getSigner();
//         const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
//         const tx = await contractInstance.vote(number);
//         await tx.wait();
//         kanVote();
//     }

//     const handlePopupClose = (popup, file) => {
//         setIsPopupOpen(popup);
//         setSelectedFile(file);
//         console.log(selectedFile);
//     };

//     const handleVerifyClick = (click) => {
//         console.log("From handleverifyclick", click);
//         setIsPopupOpen(click);
//     };

//     // Render with NEW additions
//     return (
//         <div className="App">
//             {votingStatus ? (
//                 isConnected ? (
//                     <>
//                         <Connected
//                             account={account}
//                             candidates={candidates}
//                             remainingTime={remainingTime}
//                             number={number}
//                             handleNumberChange={(e) => setNumber(e.target.value)}
//                             approve={approve}
//                             // NEW props added
//                             faceMatch={faceMatch}
//                             showAuth={() => setShowAuthPopup(true)}
//                             voteFunction={vote}
//                             showButton={canVote}
//                             showVerify={handleVerifyClick}
//                             isAdmin={false}
//                         />
//                         {isPopupOpen && (
//                             <Popup closePopup={handlePopupClose} account={account} isAdmin={false} />
//                         )}
//                         {/* NEW: Auth Popup added */}
//                         {showAuthPopup && (
//                             <AuthPopup
//                                 onClose={() => setShowAuthPopup(false)}
//                                 onVerify={async (file) => {
//                                     const result = await verifyFaceMatch(file);
//                                     setFaceMatch(result);
//                                     setShowAuthPopup(false);
//                                 }}
//                             />
//                         )}
//                     </>
//                 ) : (
//                     <Login connectWallet={connectToMetamask} />
//                 )
//             ) : (
//                 <Finished />
//             )}
//         </div>
//     );
// }

// export default User;

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress, MODEL_URL } from "../Constant/constant";
import Login from "./Login";
import Finished from "./Finished";
import Connected from "./Connected";
import "../../src/App.css";
import Popup from "./Popup";
import AuthPopup from "./AuthPopup";
import * as faceapi from "face-api.js";
import SuccessPopup from "./SuccessPopup";

function User() {
  // Original state
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState("");
  const [canVote, setCanVote] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [approve, setApprove] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [successPopup, setSuccessPopup] = useState(false);

  // New face verification state
  const [referenceImage, setReferenceImage] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [faceMatch, setFaceMatch] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  // Load models and initialize
  useEffect(() => {
    const initialize = async () => {
      try {
        // Load face-api models
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);

        // Original initialization
        await getCandidates();
        await getRemainingTime();
        await getCurrentStatus();
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };

    initialize();

    // Ethereum event listeners
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  // Original getCandidates function
  const getCandidates = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    const candidatesList = await contractInstance.getAllVotesOfCandiates();

    const formattedCandidates = candidatesList.map((candidate, index) => ({
      index,
      name: candidate.name,
      voteCount: Number(candidate.voteCount),
    }));

    setCandidates(formattedCandidates);
  };

  // Original handleNumberChange
  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  // Original getCurrentStatus
  const getCurrentStatus = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    const status = await contractInstance.getVotingStatus();
    setVotingStatus(status);
  };

  // Original kanVote
  const kanVote = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    const voteStatus = await contractInstance.voters(await signer.getAddress());
    setCanVote(voteStatus);
  };

  // Original getRemainingTime
  const getRemainingTime = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    const time = await contractInstance.getRemainingTime();
    setRemainingTime(parseInt(time, 16));
  };

  // Original handleAccountsChanged
  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      kanVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  };

  // Original connectToMetamask
  const connectToMetamask = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        getDetails(address);
        setIsConnected(true);
        kanVote();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask not detected");
    }
  };

  // Original vote
  const vote = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    const tx = await contractInstance.vote(number);
    await tx.wait();
    kanVote();
  };

  const handleSuccessClose = () => {
    setSuccessPopup(false);
  };

  // Original handlePopupClose
  const handlePopupClose = (popup, file) => {
    setIsPopupOpen(popup);
    setSelectedFile(file);
  };

  // Original handleVerifyClick
  const handleVerifyClick = (click) => {
    setIsPopupOpen(click);
  };

  // Modified getDetails with face verification
  const getDetails = async (account) => {
    try {
      const response = await fetch(
        `https://dvapp-backend-rrb4.onrender.com/api/getimage/${account}`
      );
      const data = await response.json();
      setApprove(data.user.approved);
      if (data.user.approved && data.imageUrl) {
        setReferenceImage(data.imageUrl);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  // New face verification function
  const verifyFaceMatch = async (liveImageFile) => {
    if (!modelsLoaded || !referenceImage) {
      console.error("Models not ready or missing reference");
      return false;
    }

    try {
      const [liveImg, refImg] = await Promise.all([
        faceapi.bufferToImage(liveImageFile),
        faceapi.fetchImage(referenceImage),
      ]);

      console.log(liveImg, refImg);

      const [liveDetection, refDetection] = await Promise.all([
        faceapi
          .detectSingleFace(liveImg)
          .withFaceLandmarks()
          .withFaceDescriptor(),
        faceapi
          .detectSingleFace(refImg)
          .withFaceLandmarks()
          .withFaceDescriptor(),
      ]);

      if (!liveDetection || !refDetection) {
        console.log("Face detection failed");
        return false;
      }

      const distance = faceapi.euclideanDistance(
        liveDetection.descriptor,
        refDetection.descriptor
      );

      console.log("Face match distance:", distance);
      return distance < 0.4;
    } catch (error) {
      console.error("Face verification error:", error);
      return false;
    }
  };

  return (
    <div className="App">
      {successPopup && (
        <SuccessPopup
          message={"You are now eligible to vote"}
          onClose={handleSuccessClose}
        />
      )}
      {votingStatus ? (
        isConnected ? (
          <>
            <Connected
              account={account}
              candidates={candidates}
              remainingTime={remainingTime}
              number={number}
              handleNumberChange={handleNumberChange}
              approve={approve}
              faceMatch={faceMatch}
              showAuth={() => setShowAuthPopup(true)}
              voteFunction={vote}
              showButton={canVote}
              showVerify={handleVerifyClick}
              isAdmin={false}
            />
            {isPopupOpen && (
              <Popup
                closePopup={handlePopupClose}
                account={account}
                isAdmin={false}
              />
            )}
            {showAuthPopup && (
              <AuthPopup
                onClose={() => setShowAuthPopup(false)}
                onVerify={async (file) => {
                  const result = await verifyFaceMatch(file);
                  setFaceMatch(result);
                  if(result) {
                      setSuccessPopup(true);
                      setShowAuthPopup(false);
                  }
                  else {
                    alert('Not eligible to vote')
                  }
                }}
              />
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
