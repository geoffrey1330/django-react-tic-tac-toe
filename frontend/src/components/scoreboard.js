import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
import shortid from "shortid";

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
      .get("https://jedah.herokuapp.com/api/historys")
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
    console.log("me");
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
  ////////////////////////////////////
  // Open the modal
  // Create a room channel
  onPressCreate = (e) => {
    // Create a random name for the channel
    const roomId = shortid.generate().substring(0, 5);

    // Open the modal
    Swal.fire({
      position: "top",
      allowOutsideClick: false,
      title: "Share this room ID with your friend",
      text: roomId,
      width: 275,
      padding: "0.7em",
      // Custom CSS
      customClass: {
        heightAuto: false,
        title: "title-class",
        popup: "popup-class",
        confirmButton: "button-class",
      },
    });

    this.setState({
      roomcode: roomId,
    });
    this.props.nameChangeHandler("roomcode", roomId);
  };

  // The 'Join' button was pressed
  onPressJoin = (e) => {
    Swal.fire({
      position: "top",
      input: "text",
      allowOutsideClick: false,
      inputPlaceholder: "Enter the room id",
      showCancelButton: true,
      confirmButtonColor: "rgb(208,33,41)",
      confirmButtonText: "OK",
      width: 275,
      padding: "0.7em",
      customClass: {
        heightAuto: false,
        popup: "popup-class",
        confirmButton: "join-button-class ",
        cancelButton: "join-button-class",
      },
    }).then((result) => {
      // Check if the user typed a value in the input field
      if (result.value) {
        console.log(result.value);
        this.setState({
          roomcode: result.value,
        });
        this.props.nameChangeHandler("roomcode", result.value);
      }
    });
  };
  ///////////////////////////////////
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
            disabled={this.state.roomcode.length > 3 ? true : false}
            hidden={true}
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
          <div className="button-container">
            <button
              className="create-button scoreboard__btn btn "
              onClick={(e) => this.onPressCreate()}
            >
              {" "}
              Create
            </button>
            <button
              className=" scoreboard__btn btn"
              onClick={(e) => this.onPressJoin()}
            >
              {" "}
              Join
            </button>
          </div>
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
