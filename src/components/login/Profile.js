import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import {withRouter} from "react-router-dom";
import {Button_1} from "../../views/design/Button";
import "../game/choose_mode.css"


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Container = styled(BaseContainer)`
  color: white;
  padding-top: 150px;
  text-align: center;
  height: 700px;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 600px;
  width: 100%;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Profile extends React.Component {
    constructor() {
        super();
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleBirthChange = this.handleBirthChange.bind(this);
        this.state = {
            username: null,
            password: "*******",
            onlineStatus: null,
            creationDate: null,
            birthDate: null,
            token: null,
            editMode: false,
            editButtonText: "Edit Profile",
            oldUsername: null,
            oldBirthDate: null,
            editModeText: "User-Information"
        };
    }

    componentDidMount() {
        fetch(`${getDomain()}/users/${window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.status !== 404) {
                    this.setState({
                        username: response.username,
                        onlineStatus: response.status,
                        creationDate: response.creationDate,
                        birthDate: response.birthday,
                        token: response.token,
                        oldUsername: response.username,
                        oldBirthDate: response.birthday
                    });
                }
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the login: ${err.message}`);
                }
            });
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value})
    }

    handleBirthChange(event) {
        this.setState({birthDate: event.target.value})
    }

    saveChanges() {
        fetch(`${getDomain()}/users/${window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)}`, { //letzter "/" suchen und dann + 1 im index
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                birthday: this.state.birthDate,
                token: this.state.token
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === 409 || response.status === 500) {
                    //if Database could not update, display the old credentials
                    this.setState({
                        username: this.state.oldUsername,
                        birthDate: this.state.oldBirthDate
                    })
                    alert("Could not update Usersettings, Username already taken.")
                }
            })
            .catch(err => {
                alert(`Something went wrong during the Update of credentials: ${err.message}`);
            })
    }

    getText() {
        if (this.state.editMode) {
            return (
                <div>
                    <form>
                        <label> Username: &nbsp; </label>
                        <InputField type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
                    </form>
                    <p>Password: ********</p>
                    <p>Online Status: {this.state.onlineStatus}</p>
                    <form>
                        <label> Birthday: &nbsp; </label>
                        <InputField type="date" value={this.state.birthDate} onChange={this.handleBirthChange}/>

                    </form>
                    <p>Creation Date: {this.state.creationDate}</p>
                </div>
            )
        }
        return (
            <div>
                <p>Username: {this.state.username}</p>
                <p>Password: *******</p>
                <p>Status: {this.state.onlineStatus}</p>
                <p>Birthday: {this.state.birthDate}</p>
                <p>Creation Date: {this.state.creationDate}</p>
            </div>
        )
    }


    render() {
        const textElement = this.getText();
        if (sessionStorage.getItem("token") === null) {
            return (<Container><h1>You must be logged in to view this page!</h1></Container>)
        } else {
            if (this.state.username === null) {
                return (<Container><h1>Userpage does not exist!</h1></Container>)
            }
            return (
                <BaseContainer>
                    <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap" rel="stylesheet">
                    </link>
                    <Container>
                        <Form>
                            <h1>{this.state.editModeText}</h1>
                            <PlayerContainer>
                                {textElement}
                                <div>
                                    <ButtonContainer>
                                        <Button_1 className= "rock_login-button"
                                            disabled={!(sessionStorage.getItem("token") === this.state.token) || !this.state.username}
                                            width="100%"
                                            onClick={() => {
                                                if (this.state.editMode) {
                                                    //save changes to database
                                                    this.saveChanges();
                                                }
                                                this.setState({
                                                    editMode: !this.state.editMode,
                                                    editButtonText: (!this.state.editMode) ? "Save" : "Edit Profile",
                                                    editModeText: (!this.state.editMode) ? "Edit User Profile" : "User-Information"
                                                })
                                            }}
                                        >
                                            {this.state.editButtonText}
                                        </Button_1>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <Button_1 className= "rock_login-button"
                                            onClick={() => {
                                                this.props.history.push("/dashboard");
                                            }}
                                        >
                                            Back
                                        </Button_1>
                                    </ButtonContainer>
                                </div>
                            </PlayerContainer>
                        </Form>
                    </Container>
                </BaseContainer>
            );
        }
    }
}

export default withRouter(Profile);