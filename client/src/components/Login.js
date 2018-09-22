import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    testNavigation = () => {
        this.props.history.push("/login");
    }

    render() {
        return (
            <div>
                <button onClick={this.testNavigation}>GO TO LOGIN</button>
                <h1>This is the login page</h1>
            </div>
        );
    }
}