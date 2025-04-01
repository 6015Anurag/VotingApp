import React, { useEffect, useState } from "react";
import Connected from './Connected';

function Popup(props) {
  console.log("Props from popup: ",props);
  // 🔹 Handle file selection and validation
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [valid,setValid] = useState(false)
  const [link, setLink] = useState(null);
  useEffect(() => {
    const getImage = async ()=>{
      try {
        const response = await fetch(`https://dvapp-backend-rrb4.onrender.com/api/getimage/${props.account}`, {
          method: "GET",
        });
        const data = await response.json();
        setLink(data.imageUrl)
        
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
  }, [])
  

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

  // 🔹 Handle file upload (connect to blockchain later)
  const handleSubmitVerification = async(isAdmin, isValid) => {
    if (!isAdmin) {
      console.log("Submit: ",isAdmin, isValid)
      // User side: Validate and submit file
      if (!selectedFile) {
        setError("Please upload an image first!");
        return;
      }
      
      const formData = new FormData();
      formData.append("photo", selectedFile);
      formData.append("id", props.account); // Include user ID
  
      try {
        const response = await fetch("https://dvapp-backend-rrb4.onrender.com/api/post", {
          method: "POST",
          body: formData
        });
        
        const data = await response.json();
        if (response.ok) {
          console.log("File uploaded successfully:", data);
        } else {
          setError(data.message || "File upload failed");
        }
      } catch (error) {
        setError("An error occurred while uploading the file");
      }
    } else {
      // Admin side: Approve the submission
      setValid(isValid); // ⭐ This is what you wanted!
      console.log("Submit: ",isAdmin, isValid)
      // User side: Validate and submit file
  
      try {
        const response = await fetch(`https://dvapp-backend-rrb4.onrender.com/api/approval/${props.account}`, {
          method: "POST"
        });
        
        const data = await response.json();
        if (response.ok) {
          console.log("Account verified:", data);
        } else {
          setError(data.message || "File upload failed");
        }
      } catch (error) {
        setError("An error occurred while uploading the file");
      }
      // (Optional: Notify backend of approval)
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content" >
        {props.isAdmin ? (
          <>
            <h2>Verify</h2>
            <p className="connected-account">Metamask Account: {props.account}</p>
            {/* <img src=""></img> */}
            <div className="id-card-frame">
            <img src={link}></img>
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
              handleSubmitVerification(props.isAdmin,valid);
              props.closePopup(false, selectedFile);
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
    </div>
  );
}

export default Popup;
