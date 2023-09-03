import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {Game} from "./app/Game";
import {Header} from "./shared/header/Header";


ReactDOM.render(
	<>
		<Header/>
		<Game />
	</>, 
	document.getElementById("root")
);
