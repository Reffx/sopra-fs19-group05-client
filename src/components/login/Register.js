import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import {withRouter} from "react-router-dom";
import {Button_1} from "../../views/design/Button";
import Toolbar from '../Toolbar/Toolbar';
import "../game/choose_mode.css"

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 550px;
  font-size: 16px;
  font-weight: 300;
  margin-top: 50px;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const Margin = styled.div`
  margin-top: 2em;
`;

const MarginHead = styled.div`
  margin-top: 10em;
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

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Message = styled.label`
  color: white;
  margin-bottom: 5px;
  text-align: center;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Register extends React.Component {
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            alertText: ""
        };
    }

    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end and its token is stored in the localStorage.
     */
    register() {
        fetch(`${getDomain()}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                creationDate: this.state.creationDate
            })
        })
            .then(response => {
                if (response.status === 409 || response.status === 500) {
                    //doublicated username
                    this.setState({alertText: "This username already exists!"})
                } else {
                    this.props.history.push(`/login`);
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


    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({[key]: value});
    }

    alertMessage() {
        return this.state.alertText
    }


    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Toolbar/>
                <MarginHead> </MarginHead>
                <BaseContainer>
                    <FormContainer>
                        <Form>
                            <Margin> </Margin>
                            <Message>{this.alertMessage()}</Message>
                            <Margin> </Margin>
                            <Label>Username</Label>
                            <InputField
                                placeholder="Raphael Koch"
                                onChange={e => {
                                    this.handleInputChange("username", e.target.value);
                                }}
                            />
                            <Label>Password</Label>
                            <InputField
                                type="password"
                                placeholder="*******"
                                onChange={e => {
                                    this.handleInputChange("password", e.target.value);
                                }}
                            />
                            <ButtonContainer>
                                <Button_1 className= "rock_login-button"
                                    disabled={!this.state.username || !this.state.password}
                                    width="50%"
                                    onClick={() => {
                                        this.register();
                                    }}
                                >
                                    Sign Up
                                </Button_1>
                            </ButtonContainer>
                            <Margin> </Margin>
                            <a href="/login" style={{color: '#FCFFF7'}}>Already an Account? Login!</a>
                            <Margin> </Margin>
                        </Form>
                    </FormContainer>
                </BaseContainer>
            </div>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Register);
