import React from 'react';
import ReactDOM from 'react-dom';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const activeStyle = {
  backgroundColor: 'orange',
  boxShadow: '0 3px orange',
  height: 77,
  marginTop: 13
};

const inactiveStyle = {
  backgroundColor: 'grey',
  marginTop: 10,
  boxShadow: '3px 3px 5px black'
};

class KeyPad extends React.Component {
  constructor(props) {
    super(props);
    this.State = {
      keyPadStyle: activeStyle
    };
    // this.isPoweron = this.isPoweron.bind(this);
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  playSound(e) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.play();

    this.props.updateDisplay(this.props.clipId);
  }

  render() {
    return (
      <div onClick={this.playSound}>
        <audio
          className="clip"
          id={this.props.keyTrigger}
          src={this.props.clip}
        />
        <button
          className="btn btn-primary btn-lg m-1"
          style={{ width: '90px' }}
        >
          {this.props.keyTrigger}
        </button>
      </div>
    );
  }
}

class Pad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let padBank;

    this.props.power
      ? (padBank = this.props.currentBank.map(e => {
          return (
            <KeyPad
              clipId={e.id}
              clip={e.url}
              keyTrigger={e.keyTrigger}
              keyCode={e.keyCode}
              updateDisplay={this.props.updateDisplay}
            />
          );
        }))
      : (padBank = this.props.currentBank.map(e => {
          return (
            <KeyPad
              clip="#"
              keyCode={e.keyCode}
              keyTrigger={e.keyTrigger}
              updateDisplay={this.props.updateDisplay}
            />
          );
        }));

    return (
      <div className="mt-3 d-flex flex-wrap" style={{ width: '300px' }}>
        {padBank}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPoweron: true,
      currentBank: bankOne,
      displayText: 'Heather'
    };
    this.changeBank = this.changeBank.bind(this);
    this.changePower = this.changePower.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  changeBank() {
    if (this.state.currentBank === bankOne) {
      this.setState(() => {
        return { currentBank: bankTwo, displayText: 'Smooth-piano' };
      });
    } else {
      this.setState(() => {
        return { currentBank: bankOne, displayText: 'Heather' };
      });
    }
  }

  changePower() {
    if (this.state.isPoweron) {
      this.setState(() => {
        return {
          isPoweron: false,
          displayText: ' '
        };
      });
    } else {
      this.setState(() => {
        return {
          isPoweron: true,
          displayText: 'Heater'
        };
      });
    }
  }

  updateDisplay(name) {
    this.setState(() => {
      return {
        displayText: name
      };
    });
  }

  render() {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div>
          <div
            className="border border-secondry pl-4 py-2 my-2"
            style={{ height: '57px', width: '300px' }}
          >
            <h2 className="text-muted">{this.state.displayText}</h2>
          </div>

          <div>
            <button
              className="btn btn-warning btn-lg"
              onClick={this.changeBank}
            >
              ChangeBank
            </button>
            <button
              className="btn btn-danger btn-lg ml-1"
              onClick={this.changePower}
            >
              {this.state.isPoweron ? 'off' : 'on'}
            </button>
          </div>

          <Pad
            currentBank={this.state.currentBank}
            power={this.state.isPoweron}
            updateDisplay={this.updateDisplay}
          />
        </div>
      </div>
    );
  }
}

export default App;
