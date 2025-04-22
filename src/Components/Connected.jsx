// import React from 'react';
// import './Connected.css';

// const Connected = (props) => {
//     return (
//         <div className="connected-container">
//             <h1 className="connected-header">You are Connected to Metamask</h1>
//             <p className="connected-account">Metamask Account: {props.account}</p>
//             <p className="connected-account">Remaining Time: {props.remainingTime}</p>
            
//             {/* NEW: Added face verification status display */}
//             {props.approve && props.faceMatch === false && (
//                 <p className="auth-failed">Authentication failed. Please try again.</p>
//             )}
            
//             {props.showButton ? (
//                 <p className="connected-account">You have already voted</p>
//             ) : (
//                 <div>
//                     <input 
//                         type="number" 
//                         placeholder="Enter Candidate Index" 
//                         value={props.number} 
//                         onChange={props.handleNumberChange}
//                     />
//                     <br />
//                     {/* Modified button logic for new flow */}
//                     {props.approve ? (
//                         props.faceMatch ? (
//                             <button className="login-button" onClick={props.voteFunction}>
//                                 Vote
//                             </button>
//                         ) : (
//                             <button 
//                                 className="auth-button" 
//                                 onClick={() => props.showAuth()}
//                             >
//                                 Authenticate
//                             </button>
//                         )
//                     ) : (
//                         <button className="login-button" onClick={props.showVerify}>
//                             Verify
//                         </button>
//                     )}
//                 </div>
//             )}
            
//             <table id="myTable" className="candidates-table">
//                 <thead>
//                     <tr>
//                         <th>Index</th>
//                         <th>Candidate name</th>
//                         {props.isAdmin && <th>Candidate votes</th>}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {props.candidates.map((candidate, index) => (
//                         <tr key={index}>
//                             <td>{candidate.index}</td>
//                             <td>{candidate.name}</td>
//                             {props.isAdmin && <td>{candidate.voteCount}</td>}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Connected;

import React from 'react';
import './Connected.css';

const Connected = ({
    account,
    candidates,
    remainingTime,
    number,
    handleNumberChange,
    approve,
    faceMatch,
    showAuth,
    voteFunction,
    showButton,
    showVerify,
    isAdmin
}) => {
    return (
        <div className="connected-container">
            <h1 className="connected-header">You are Connected to Metamask</h1>
            <p className="connected-account">Metamask Account: {account}</p>
            <p className="connected-account">Remaining Time: {remainingTime}</p>

            {approve && faceMatch === false && (
                <p className="auth-failed">❌ Authentication failed. Please try again.</p>
            )}

            {showButton ? (
                <p className="connected-account">You have already voted</p>
            ) : (
                <div>
                    <input
                        type="number"
                        placeholder="Enter Candidate Index"
                        value={number}
                        onChange={handleNumberChange}
                    />
                    <br />
                    {approve ? (
                        faceMatch ? (
                            <button className="vote-button" onClick={voteFunction}>
                                Vote Now
                            </button>
                        ) : (
                            <button className="auth-button" onClick={showAuth}>
                                Authenticate to Vote
                            </button>
                        )
                    ) : (
                        <button className="verify-button" onClick={showVerify}>
                            Verify Identity
                        </button>
                    )}
                </div>
            )}

            <table className="candidates-table">
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Candidate</th>
                        {isAdmin && <th>Votes</th>}
                    </tr>
                </thead>
                <tbody>
                    {candidates.map((candidate) => (
                        <tr key={candidate.index}>
                            <td>{candidate.index}</td>
                            <td>{candidate.name}</td>
                            {isAdmin && <td>{candidate.voteCount}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Connected;