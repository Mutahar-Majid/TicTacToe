import React from "react";
import tic_tac_toe_3 from "../../assets/tic_tac_toe_3.png";
import "./Header.scss";
export const Header = () => {
    return (
        <div className="header">
            <div className = "header-content">
                <h1>Welcome to Mutahar's Online Tic Tac Toe Arena</h1>
            </div>
            <div className = "header-logo">
                <img src={tic_tac_toe_3} className="logo" alt = "logo"/>
            </div>
        </div>
    );
}