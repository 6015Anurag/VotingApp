import React, { useEffect, useState } from "react";
import SuccessPopup from "./SuccessPopup";
import './SuccessPopup.css';

function Popup(props) {
  console.log("Props from popup: ", props);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [valid, setValid] = useState(false);
  const [link, setLink] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await fetch(`https://dvapp-backend-rrb4.onrender.com/api/getimage/${props.account}`, {
          method: "GET",
        });
        const data = await response.json();
        setLink(data.imageUrl);
        
        if (response.ok) {
          console.log("File get:", data);
        } else {
          setError(data.message || "File upload failed");
        }
      } catch (error) {
        setError("An error occurred while uploading the file");
      }
    }
    getImage();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.type;
      if (fileType === "image/jpeg" || fileType === "image/png") {
        setSelectedFile(file);
        setError("");
      } else {
        setError("Only JPG and PNG files are allowed!");
      }
    }
  };

  const handleSubmitVerification = async (isAdmin, isValid) => {
    if (!isAdmin) {
      console.log("Submit: ", isAdmin, isValid);
      if (!selectedFile) {
        setError("Please upload an image first!");
        return;
      }
      
      const formData = new FormData();
      formData.append("photo", selectedFile);
      formData.append("id", props.account);

      try {
        const response = await fetch("https://dvapp-backend-rrb4.onrender.com/api/post", {
          method: "POST",
          body: formData
        });
        
        const data = await response.json();
        if (response.ok) {
          console.log("File uploaded successfully:", data);
          setSuccessMessage("Photo has been uploaded successfully!");
          setShowSuccess(true);
        } else {
          setError(data.message || "File upload failed");
        }
      } catch (error) {
        setError("An error occurred while uploading the file");
      }
    } else {
      setValid(isValid);
      console.log("Submit: ", isAdmin, isValid);

      try {
        const response = await fetch(`https://dvapp-backend-rrb4.onrender.com/api/approval/${props.account}`, {
          method: "POST"
        });
        
        const data = await response.json();
        if (response.ok) {
          console.log("Account verified:", data);
          setSuccessMessage("User verification approved successfully!");
          setShowSuccess(true);
        } else {
          setError(data.message || "Approval failed");
        }
      } catch (error) {
        setError("An error occurred while approving the file");
      }
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    props.closePopup(false, selectedFile);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {props.isAdmin ? (
          <>
            <h2>Verify</h2>
            <p className="connected-account">Metamask Account: {props.account}</p>
            <div className="id-card-frame">
              <img src={link} alt="User verification"></img>
            </div>
          </>
        ) : (
          <>
            <h2>Upload Verification Image</h2>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
            />
          </>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="popup-buttons">
          <button
            onClick={() => {
              handleSubmitVerification(props.isAdmin, valid);
            }}
            style={{ backgroundColor: "#28a745", color: "white" }}
          >
            {props.isAdmin ? "Accept" : "Submit"}
          </button>
          <button
            onClick={() => {
              props.closePopup(false, null);
            }}
            style={{ backgroundColor: "red", color: "white" }}
          >
            {props.isAdmin ? "Reject" : "Cancel"}
          </button>
        </div>
      </div>

      {showSuccess && (
        <SuccessPopup 
          message={successMessage}
          onClose={handleCloseSuccess}
        />
      )}
    </div>
  );
}

export default Popup;