// Input: 
// - User clicks the button to turn the camera on/off
// - Confirmation dialog appears to confirm the user's action

// Process: 
// - If the user confirms, the camera is either started or stopped based on its current state
// - The button's text and the message on the page are updated accordingly
// - If the user cancels, a message is shown without any action being taken

// Output: 
// - The webcam feed is displayed if the camera is on
// - Success or failure messages are shown based on the action taken
// - The button text changes depending on the current camera state

// Get the video element, button, and message div from the DOM
const videoElement = document.getElementById('webcam');
const toggleButton = document.getElementById('toggle-btn');
const messageDiv = document.getElementById('message');

let stream;
let isCameraOn = true; // Boolean to track camera status

// Function to start the webcam
function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(mediaStream => {
            stream = mediaStream;
            videoElement.srcObject = mediaStream;
            messageDiv.textContent = "Camera is now ON.";
            messageDiv.style.color = "green"; // Success message
        })
        .catch(err => {
            alert("Failed to access camera: " + err.message); // Handle error
            messageDiv.textContent = "Failed to access camera.";
            messageDiv.style.color = "red"; // Failure message
        });
}

// Function to stop the webcam
function stopCamera() {
    stream.getTracks().forEach(track => track.stop());
    videoElement.srcObject = null;
    messageDiv.textContent = "Camera is now OFF.";
    messageDiv.style.color = "green"; // Success message
}

// Step-by-step logic to handle button click
toggleButton.addEventListener('click', () => {
    // Ask for confirmation before performing the action
    const userConfirmed = confirm(isCameraOn ? "Are you sure you want to turn the camera off?" : "Are you sure you want to turn the camera on?");
    
    if (userConfirmed) {
        if (isCameraOn) {
            // If camera is on, stop it
            stopCamera();
            toggleButton.textContent = 'Turn Camera On'; // Update button text
        } else {
            // If camera is off, start it
            startCamera();
            toggleButton.textContent = 'Turn Camera Off'; // Update button text
        }
        isCameraOn = !isCameraOn; // Toggle the camera status
    } else {
        // Show cancellation message if user cancels action
        messageDiv.textContent = "Action canceled by user.";
        messageDiv.style.color = "orange";
    }
});

// Start the camera by default on page load
startCamera();
