import React, { useState } from "react";

export default function TextForm(props) {
  const handleSpeakClick = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };
  const handleCopyClick = () => {
    const copy = document.getElementById("box");
    navigator.clipboard.writeText(copy.value);
    props.showAlert("Copied to Clipboard", "success");
  };
  const handleUpClick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to Uppercase", "success");
  };
  const handleLoClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to Lowercase", "success");
  };
  const handleSpacesClick = () => {
    setText(text.split(/[ ]+/).join(" "));
    props.showAlert("Extra spaces removed", "success");
  };
  const handleClearClick = () => {
    setText("");
    props.showAlert("Text Cleared", "success");
  };
  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const [text, setText] = useState("");

  const words = text.split(" ").filter((element) => {
    return element.length !== 0;
  }).length;
  return (
    <div
      className={`container text-${props.mode === "dark" ? "white" : "black"}`}
    >
      <div className="container">
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className={`form-control text-bg-${props.mode}`}
            value={text}
            onChange={handleOnChange}
            id="box"
            rows="8"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button
          type="submit"
          onClick={handleSpeakClick}
          className="btn btn-primary mx-1 my-1"
        >
          Speak
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleCopyClick}>
          Copy Text
        </button>
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleSpacesClick}
        >
          Remove Extra Spaces
        </button>
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleClearClick}
        >
          Clear Text
        </button>
      </div>
      <div className="container my-3">
        <h2>Your text summary</h2>
        <p>
          {words} words and {text.length} characters
        </p>
        <p>{0.008 * words} minutes to read</p>
        <h2>Preview</h2>
        <p>
          {text.length > 0 ? text : "Enter text in the textarea to preview"}
        </p>
      </div>
    </div>
  );
}
