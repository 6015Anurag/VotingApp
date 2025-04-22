// import React, { useState } from 'react';
// import './AuthPopup.css';

// function AuthPopup({ onClose, onVerify }) {
//     const [liveImage, setLiveImage] = useState(null);
//     const [error, setError] = useState('');

//     const handleSubmit = async () => {
//         if (!liveImage) {
//             setError('Please upload an image first');
//             return;
//         }
//         onVerify(liveImage);
//     };

//     return (
//         <div className="auth-popup-overlay">
//             <div className="auth-popup-content">
//                 <h3>Face Authentication</h3>
//                 <p>Upload a new selfie for verification</p>
//                 <input 
//                     type="file" 
//                     accept="image/*" 
//                     onChange={(e) => setLiveImage(e.target.files[0])}
//                 />
//                 {error && <p className="auth-error">{error}</p>}
//                 <div className="auth-popup-buttons">
//                     <button className="auth-verify" onClick={handleSubmit}>
//                         Verify
//                     </button>
//                     <button className="auth-cancel" onClick={onClose}>
//                         Cancel
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AuthPopup;

import React, { useState } from 'react';
import './AuthPopup.css';

function AuthPopup({ onClose, onVerify }) {
    const [liveImage, setLiveImage] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!liveImage) {
            setError('Please upload an image first');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await onVerify(liveImage);
        } catch (err) {
            setError('Verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-popup-overlay">
            <div className="auth-popup-content">
                <h3>Face Authentication</h3>
                <p>Upload a current selfie for verification</p>
                
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        setLiveImage(e.target.files[0]);
                        setError('');
                    }}
                    disabled={isLoading}
                />
                
                {error && <p className="auth-error">{error}</p>}
                
                <div className="auth-popup-buttons">
                    <button
                        className="auth-verify"
                        onClick={handleSubmit}
                        disabled={isLoading || !liveImage}
                    >
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </button>
                    <button
                        className="auth-cancel"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthPopup;