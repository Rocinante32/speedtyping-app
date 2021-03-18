import React, { useState, useEffect } from "react";
import "./App.css";
const axios = require("axios");

function App() {
	const [text, setText] = useState([""]);
	const [typedText, setTypedtext] = useState([]);

	useEffect(() => {
		console.log("useEffect running");
		// window.addEventListener("keydown", (e) => {
		// 	console.log("key pressed: ", e.key);
		// });
		axios.get(`https://litipsum.com/api/1`).then((response) => {
			// console.log("API call complete: ", response.data);
			let wordArray = response.data.split(" ");
			if (wordArray.length >= 100) {
				// console.log("length is over 100: ", wordArray);
				wordArray.splice(100);
				// console.log("filter text: ", wordArray.join(" "));
				setText(wordArray.join(" "));
			} else {
				// console.log("length is under 100 : ", wordArray);
				setText(response.data);
			}
		});
	}, [text]);

	const handleStart = (e) => {
		console.log("click event pressed");
		document.getElementById("start-btn").remove();
		window.addEventListener("keydown", (e) => {
			// console.log("key pressed: ", e);
			// console.log("key pressed length: ", e.key.length);
			if (e.key.length === 1) {
				setTypedtext((typedText) => [...typedText, e.key]);
			} else if (e.keyCode === 8) {
				console.log("backspace hit");
			}
			console.log("typed text after update: ", typedText);
		});
	};

	const handleNewText = (e) => {
		console.log("click event for new text");
		setText("");
	};

	// const handleKey = (e) => {
	// 	console.log("key pressed is: ", e);
	// };
	console.log("typed text after update: 2 ", typedText);
	return (
		<div className="App">
			<h1>Welcome to the typing speed test!</h1>
			<h2>Type the text below to get your statistics</h2>
			<p id="test-text">{text}</p>
			<button id="start-btn" onClick={handleStart}>
				Ready to start?
			</button>
			<button onClick={handleNewText}>Change text</button>
			<br></br>
			<p>{typedText}</p>
		</div>
	);
}

export default App;
