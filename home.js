// Element references
const resultElement = document.getElementById('result');
const totalCheckedElement = document.getElementById('total-checked');
const aiCountElement = document.getElementById('ai-count');
const humanCountElement = document.getElementById('human-count');
const resetButton = document.getElementById('reset-stats');

// Statistics variables
let totalChecked = 0;
let aiCount = 0;
let humanCount = 0;

// Event listener for form submission
document.getElementById('text-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload

    const inputText = document.getElementById('input-text').value.trim(); // Get and trim input

    if (!inputText) {
        resultElement.textContent = "Please enter some text to analyze.";
        return; // Stop if input is empty
    }

    const requestData = { content: inputText }; // Prepare JSON data

    // Send the request using fetch
    fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
        // Display the result: "AI-Generated" or "Human-Written"
        resultElement.textContent = `Prediction: ${data.result}`;

        // Update statistics
        totalChecked++;
        if (data.result === "AI-Generated") {
            aiCount++;
        } else {
            humanCount++;
        }
        updateStatistics();
    })
    .catch(error => {
        console.error('Fetch error:', error);
        resultElement.textContent = "An error occurred while processing your request.";
    });
});

// Update statistics display
function updateStatistics() {
    totalCheckedElement.textContent = totalChecked;
    aiCountElement.textContent = aiCount;
    humanCountElement.textContent = humanCount;
}

// Reset statistics
resetButton.addEventListener('click', function () {
    totalChecked = 0;
    aiCount = 0;
    humanCount = 0;
    updateStatistics();
    resultElement.textContent = ""; // Clear result message
});

pressedEnter(e)