import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify, { Analytics, Storage } from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator, S3Album } from 'aws-amplify-react'; // or 'aws-amplify-react-native';

Amplify.configure(awsmobile);
Storage.configure({ level: 'private' });

class App extends Component {
  uploadFile = (evt) => {
    const file = evt.target.files[0];
    const name = file.name;

    Storage.put(name, file).then(() => {
      this.setState({ file: name });
    })
  }

  componentDidMount() {
    Analytics.record('Amplify_CLI');
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />        
        <p> Pick a file</p>
        <input type="file" onChange={this.uploadFile} />
        <S3Album level="public" path='' />
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, true);

