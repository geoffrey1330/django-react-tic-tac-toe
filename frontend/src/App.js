import React, { Component } from "react";
import { Route } from "react-router-dom";

import { Board } from "./components/board";
import { Scoreboard } from "./components/scoreboard";

import "./styles/style.css";

class App extends React.Component {
  state = {
    playerOneName: "x",
    playerTwoName: "o",
    darkMode: localStorage.getItem("darkmode")
      ? JSON.parse(localStorage.getItem("darkmode"))
      : false,
    roomcode: "",
  };

  handlePlayerNameChange = (stateKey, stateValue) => {
    this.setState({
      [stateKey]: stateValue,
    });
  };

  handleDarkModeToggle = () => {
    const darkMode = !this.state.darkMode;
    localStorage.setItem("darkmode", JSON.stringify(darkMode));
    this.setState({ darkMode });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Scoreboard
              state={this.state}
              nameChangeHandler={this.handlePlayerNameChange}
              onDarkModeToggle={this.handleDarkModeToggle}
              darkMode={this.state.darkMode}
              roomcode={this.state.roomcode}
            />
          )}
        />

        <Route
          path="/board"
          render={() => (
            <Board
              state={this.state}
              nameChangeHandler={this.handlePlayerNameChange}
              onDarkModeToggle={this.handleDarkModeToggle}
              darkMode={this.state.darkMode}
              roomcode={this.state.roomcode}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
