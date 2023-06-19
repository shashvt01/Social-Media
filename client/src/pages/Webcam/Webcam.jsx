import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user"
};

export const WebcamCapture = () => (
  <Webcam
    audio={false}
    height={400}
    screenshotFormat="image/jpeg"
    width={400}
    videoConstraints={videoConstraints}
  >
    {({ getScreenshot }) => (
      <button
        onClick={() => {
          const imageSrc = getScreenshot()
        }}
      >
        Capture photo
      </button>
    )}
  </Webcam>
);