import React from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Link } from "react-router-dom";
import axios from "axios";

export class Scoreboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: this.props.state.playerOneName,
      playerTwoName: this.props.state.playerTwoName,
      scoreboard: [],
    };
  }

  async componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/historys")
      .then((response) => {
        Promise.all(
          response.data.map((historyItem) => {
            return historyItem.title;
          })
        ).then((historyData) => {
          this.setState({ scoreboard: historyData });
        });
      })
      .catch((error) => console.error(error));
  };

  handleInputChange = (event) => {
    event.preventDefault();

    let stateKey = event.target.dataset.name;
    let stateValue = event.target.value;

    this.setState({
      [stateKey]: stateValue,
    });

    this.props.nameChangeHandler(stateKey, stateValue);
  };

  handleNameValidation = (event) => {
    if (
      this.state.playerOneName.length !== 0 &&
      this.state.playerTwoName.length !== 0
    ) {
      return;
    } else {
      event.preventDefault();
    }
  };

  render() {
    return (
      <div
        className={
          this.props.darkMode ? "view view-dark" : "view view--scoreboard"
        }
      >
        <h1
          className={
            this.props.darkMode
              ? "scoreboard__title scoreboard__title-dark"
              : "scoreboard__title"
          }
        >
          Welcome to Jedah
        </h1>
        {/* dark mode switch */}
        <label className="switch">
          <input
            type="checkbox"
            onChange={this.props.onDarkModeToggle}
            checked={this.props.darkMode}
          />
          <span className="slider"></span>
        </label>

        <h2
          className={
            this.props.darkMode
              ? "scoreboard__subtitle scoreboard__subtitle-dark"
              : "scoreboard__subtitle"
          }
        >
          Would you like to play a game?
        </h2>

        <div className="scoreboard__names">
          <div
            className={
              this.props.darkMode
                ? "scoreboard__name-box scoreboard__name-box-dark"
                : "scoreboard__name-box"
            }
          >
            <label htmlFor="playerOneName">Player one name (x):</label>

            <input
              id="playerOneName"
              className={
                this.props.darkMode
                  ? "scoreboard__input scoreboard__input-dark"
                  : "scoreboard__input"
              }
              type="text"
              value={this.state.playerOneName}
              //onChange={this.handleInputChange}
              data-name="playerOneName"
            />
          </div>

          <div
            className={
              this.props.darkMode
                ? "scoreboard__name-box scoreboard__name-box-dark"
                : "scoreboard__name-box"
            }
          >
            <label htmlFor="playerTwoName">Player two name (o):</label>

            <input
              id="playerTwoName"
              className={
                this.props.darkMode
                  ? "scoreboard__input scoreboard__input-dark"
                  : "scoreboard__input"
              }
              type="text"
              value={this.state.playerTwoName}
              // onChange={this.handleInputChange}
              data-name="playerTwoName"
            />
          </div>
        </div>

        <Link
          to="/board"
          onClick={this.handleNameValidation}
          className="scoreboard__btn btn"
        >
          Start new game
        </Link>

        <h2
          className={
            this.props.darkMode
              ? "scoreboard__subtitle scoreboard__subtitle-dark"
              : "scoreboard__subtitle"
          }
        >
          Recent games:
        </h2>

        {this.state.scoreboard.length === 0 && (
          <p className={this.props.darkMode ? "p-dark" : ""}>
            There are no previous games to show.
          </p>
        )}

        {this.state.scoreboard.length !== 0 && (
          <ul
            className={
              this.props.darkMode
                ? "scoreboard__list scoreboard__list-dark"
                : "scoreboard__list"
            }
          >
            {this.state.scoreboard.map((leader, key) => {
              return <li key={key}>- {leader}</li>;
            })}
          </ul>
        )}
      </div>
    );
  }
}
