import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  sock = null;
  
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let wsuri = "ws://192.168.1.3:1234";
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
      <div className="App">
        <h1>WebSocket Echo Test</h1>
        <form>
        <p>Message: <input id="message" type="text" value="Hello, world!" /></p>
        </form>
        <button onClick={this.send}>Send Message</button>
      </div>
    );
  }
  
}

export default App;
