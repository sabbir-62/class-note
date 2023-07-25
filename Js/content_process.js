let text_content = document.getElementById('note-writting');
let content = document.querySelector('.content');
let paragraph = null;

text_content.addEventListener('input', () => {
    let text = text_content.value;
    paragraph = document.createElement('p');
    paragraph.innerHTML = text;
});

let addBtn = document.querySelector('.add-btn');

addBtn.addEventListener('click', () => {
    content.appendChild(paragraph);
    text_content.value = '';
});

let stream;
const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const startButton = document.getElementById('startButton');
const captureButton = document.getElementById('captureButton');
const stopButton = document.getElementById('stopButton');
const capturedPhotoContainer = document.getElementById('capturedPhotoContainer');
const capturedPhotoWrapper = document.getElementById('capturedPhotoWrapper');
const capturedPhoto = document.getElementById('capturedPhoto');
const backToCameraButton = document.getElementById('backToCameraButton');



// Function to start the camera
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
        captureButton.disabled = false;
        stopButton.disabled = false;
        startButton.disabled = true;
    } catch (error) {
        console.error('Error accessing the camera:', error);
    }
}

// Function to capture a photo
function capturePhoto() {
    const context = canvasElement.getContext('2d');
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    // Convert the captured photo to base64 data URL
    const imageDataUrl = canvasElement.toDataURL('image/png');

    // Create an image element to display the captured photo
    const capturedImage = document.createElement('img');
    capturedImage.src = imageDataUrl;

    // Append the captured photo to the content div
    content.appendChild(capturedImage);

    // Hide the camera feed and buttons
    videoElement.style.display = 'none';
    captureButton.style.display = 'none';
    stopButton.style.display = 'none';
    backToCameraButton.style.display = 'block';
    stopCamera();
}

// Function to stop the camera
function stopCamera() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;
        captureButton.disabled = true;
        stopButton.disabled = true;
        startButton.disabled = false;
    }

    // Hide the captured photo and show the camera feed and buttons
    capturedPhotoWrapper.style.display = 'none';
    capturedPhotoContainer.style.display = 'none';
    videoElement.style.display = 'block';
    captureButton.style.display = 'block';
    stopButton.style.display = 'block';
}

// Function to go back to the camera view
function backToCamera() {
    // Show the camera feed and buttons
    videoElement.style.display = 'block';
    captureButton.style.display = 'block';
    stopButton.style.display = 'block';
    backToCameraButton.style.display = 'none';

    // Hide the captured photo
    const capturedImages = document.querySelectorAll('.content img');
    capturedImages.forEach(img => img.remove());
}

// Event listeners for the buttons
startButton.addEventListener('click', startCamera);
captureButton.addEventListener('click', capturePhoto);
stopButton.addEventListener('click', stopCamera);
backToCameraButton.addEventListener('click', backToCamera);
