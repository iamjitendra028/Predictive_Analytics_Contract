// Connect Wallet Function
async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log("Wallet connected");
        } catch (error) {
            console.error("Wallet connection failed", error);
        }
    } else {
        alert("Please install MetaMask!");
    }
}

// Smart contract setup
const contractAddress = "0xEd35d33A56D4C6D8e35CD77BF0d5dDc50a48E22d"; // Replace with deployed contract address
const contractABI = [
    {
        "inputs": [{"internalType": "uint256","name": "trendOutcome","type": "uint256"}],
        "name": "storePrediction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256","name": "predictionId","type": "uint256"}],
        "name": "getPrediction",
        "outputs": [
            {"internalType": "uint256","name": "trendOutcome","type": "uint256"},
            {"internalType": "uint256","name": "predictionTimestamp","type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Store Prediction on Blockchain
async function storePrediction() {
    const trendOutcome = document.getElementById("trendOutcome").value;
    
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const tx = await contract.storePrediction(trendOutcome);
        await tx.wait();
        alert("📊 Prediction stored successfully!");
    } catch (error) {
        console.error("Error storing prediction:", error);
        alert("❌ Error storing prediction!");
    }
}

// Get Prediction from Blockchain
async function getPrediction() {
    const predictionId = document.getElementById("predictionId").value;

    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        document.getElementById("predictionResult").innerText = "⏳ Fetching AI Prediction...";
        const [trendOutcome, predictionTimestamp] = await contract.getPrediction(predictionId);
        
        const date = new Date(predictionTimestamp * 1000).toLocaleString();
        document.getElementById("predictionResult").innerText = `✅ AI Prediction: ${trendOutcome} (Saved on: ${date})`;
    } catch (error) {
        console.error("Error fetching prediction:", error);
        document.getElementById("predictionResult").innerText = "❌ Error fetching prediction!";
    }
}

// Auto-connect wallet if already connected
if (window.ethereum) {
    window.ethereum.on("accountsChanged", () => {
        connectWallet();
    });
}

// Event listener for wallet connect button
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("connectWallet").addEventListener("click", connectWallet);
});
