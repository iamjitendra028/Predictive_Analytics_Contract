// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PredictiveAnalytics {

    // Struct to store prediction details
    struct Prediction {
        uint256 trendOutcome;
        uint256 predictionTimestamp;
    }

    // Mapping to store predictions by their ID
    mapping(uint256 => Prediction) public predictions;
    uint256 public predictionCounter;

    // Store a new prediction trend outcome (example: a numeric prediction value)
    function storePrediction(uint256 trendOutcome) external {
        predictionCounter++;
        uint256 currentPredictionId = predictionCounter;

        // Store the prediction details
        predictions[currentPredictionId] = Prediction({
            trendOutcome: trendOutcome,
            predictionTimestamp: block.timestamp
        });
    }

    // Retrieve a prediction by ID
    function getPrediction(uint256 predictionId) external view returns (uint256 trendOutcome, uint256 predictionTimestamp) {
        Prediction memory prediction = predictions[predictionId];
        return (prediction.trendOutcome, prediction.predictionTimestamp);
    }
}
