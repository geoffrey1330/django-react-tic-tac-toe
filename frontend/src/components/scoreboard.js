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
      roomcode: this.props.state.roomcode,
    };
  }

  async componentDidMount() {
    this.refreshList();
    console.log(this.state.roomcode.length);
  }

  refreshList = () => {
    axios
      .get("http://jedah.herokuapp.com/api/historys")
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
    console.log(this.state.roomcode);
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
        <div
          className={
            this.props.darkMode
              ? "scoreboard__name-box scoreboard__name-box-dark"
              : "scoreboard__name-box"
          }
        >
          <label htmlFor="playerTwoName">gameid:</label>

          <input
            id="roomcode"
            className={
              this.props.darkMode
                ? "scoreboard__input scoreboard__input-dark"
                : "scoreboard__input"
            }
            type="text"
            value={this.state.roomcode}
            placeholder="input 4 digit gameid"
            onChange={this.handleInputChange}
            data-name="roomcode"
          />
        </div>
        <br></br>

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
              disabled={true}
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
              disabled={true}
              data-name="playerTwoName"
            />
          </div>
        </div>
        {this.state.roomcode.length <= 3 ? (
          <h2
            className={
              this.props.darkMode
                ? "scoreboard__subtitle scoreboard__subtitle-dark info"
                : "scoreboard__subtitle danger info"
            }
          >
            input your 4 digit gameid to continue
          </h2>
        ) : (
          <Link
            to="/board"
            onClick={this.handleNameValidation}
            className="scoreboard__btn btn"
          >
            Start new game
          </Link>
        )}

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
