import React, { Component, Suspense } from 'react';
import './App.css';
import ChangeLanguage from './change-language';
import logo from './logo.svg';

import { Trans, withTranslation, useTranslation } from 'react-i18next';

// use hoc for class based components
class LegacyWelcomeClass extends Component {
  render() {
    const { t, i18n } = this.props;
    return <h2>{t('title')}</h2>;
  }
}
const Welcome = withTranslation('common')(LegacyWelcomeClass);

// Component using the Trans component
function MyComponent() {
  return (
    <Trans i18nKey="description.part1">
      To get started, edit <code>src/App.js</code> and save to reload.
    </Trans>
  );
}

// page uses the hook
function Page() {
  const { t, i18n } = useTranslation('common');

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome />
        <button onClick={() => i18n.changeLanguage('de')}>de</button>
        <button onClick={() => i18n.changeLanguage('en')}>en</button>
      </div>
      <div className="App-intro">
        <MyComponent />
      </div>
      <div>{t('description.part2')}</div>
    </div>
  );
}

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
    <div>loading...</div>
  </div>
);
class App extends React.Component {

  sock = null;
  
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let wsuri = "ws://192.168.80.54:1234";
    this.sock = new WebSocket(wsuri);

    this.sock.onopen = function() {
      console.log("connected to " + wsuri);
    }

    this.sock.onclose = function(e) {
      console.log("connection closed (" + e.code + ")");
    }

    this.sock.onmessage = function(e) {
      console.log("message received: " + e.data);
    }
  }

  send = () => {
    var msg = document.getElementById('message').value;
    this.sock.send(msg);
  };

  render() {
    return (
      <Suspense fallback={<Loader />}>
        <form>
          <p>Message: <input id="message" type="text" defaultValue="Hello, world!"/></p>
        </form>
        <button onClick={this.send}>Send Message</button>
        <Page />
      </Suspense>
    );
  }
  
}

export default withTranslation('common')(App);