import React, { useState, useEffect } from "react";
import "./App.css";
const axios = require("axios");

function App() {
	const [text, setText] = useState([]);

	useEffect(() => {
		console.log("useEffect running");
		// window.addEventListener("keydown", (e) => {
		// 	console.log("key pressed: ", e.key);
		// });
		axios.get(`https://litipsum.com/api/1`).then((response) => {
			// console.log("API call complete: ", response.data);
			let wordArray = response.data.split(" ");
			if (wordArray.length >= 100) {
				console.log("length is over 100: ", wordArray);
				wordArray.splice(100);
				console.log("filter text: ", wordArray.join(" "));
				setText(wordArray.join(" "));
			} else {
				console.log("response data is : ", response.data);
				setText(response.data);
			}
		});
	}, [text]);

	const handleStart = (e) => {
		console.log("click event pressed");
		window.addEventListener("keydown", (e) => {
			console.log("key pressed: ", e.key);
		});
	};

	const handleNewText = (e) => {
		console.log("click event for new text");
		setText("");
	};

	// const handleKey = (e) => {
	// 	console.log("key pressed is: ", e);
	// };

	return (
		<div className="App">
			<h1>Welcome to the typing speed test!</h1>
			<h2>Type the text below to get your statistics</h2>
			<p id="test-text">{text}</p>
			<button onClick={handleStart}>Ready to start?</button>
			<button onClick={handleNewText}>Change text</button>
		</div>
	);
}

export default App;
