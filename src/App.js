import React, { Component } from 'react';
import Button from './components/Button';
import ButtonBox from './components/ButtonBox';
import Screen from './components/Screen';
import Wrapper from './components/Wrapper';
import Hotkeys from 'react-hot-keys';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';

const btnValues = [
    ['C', '+-', '%', '/'],
    [7, 8, 9, '*'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', <FontAwesomeIcon icon={faBackspace} />, '='],
];
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sign: '',
            num: 0,
            result: 0,
            keydownClass: '',
            metaInfo: '',
        };
    }
    onKeyUp(keyName, e, handle) {
        this.setState({ keydownClass: '' });
    }
    onKeyDown(keyName, e) {
        if (
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(keyName)
        ) {
            this.numClickHandler(keyName);
            this.setState({ keydownClass: Number(keyName) });
        }
        if (keyName === 'escape' || keyName === 'c') {
            this.resetClickHandler();
            this.setState({ keydownClass: 'C' });
        }
        if (keyName === 'enter' || keyName === 'space') {
            e.preventDefault();
            this.equalsClickHandler();
            this.setState({ keydownClass: '=' });
        }
        if (['shift+=', '-', 'shift+8', '/'].includes(keyName)) {
            this.signClickHandler(e);
        }
        if (keyName === '.') {
            this.decimialClickHandler();
            this.setState({ keydownClass: '.' });
        }
        if (keyName === 'backspace') {
            this.backspaceHandler();
            this.setState({ keydownClass: 'object' });
        }
        if (keyName === 'shift+5') {
            this.percentClickHandler();
            this.setState({ keydownClass: '%' });
        }
    }
    numClickHandler = (e) => {
        const value = typeof e === 'string' ? e : e.target.innerHTML;
        let newNum =
            this.state.num === 0 && value === '0'
                ? '0'
                : this.state.num % 1 === 0
                ? Number(this.state.num + value)
                : this.state.num + value;

        this.state.num.toString().length < 16 &&
            this.setState({
                num: newNum,
                result: !this.state.sign ? 0 : this.state.result,
                metaInfo: this.state.sign ? this.state.metaInfo : '',
            });
    };
    resetClickHandler = () => {
        this.setState({ num: 0, sign: '', result: 0, metaInfo: '' });
    };
    invertClickHandler = () => {
        this.setState({ num: -this.state.num });
    };
    percentClickHandler = () => {
        this.setState({ num: this.state.num * 0.01 });
    };
    equalsClickHandler = () => {
        let total = 0;
        let result = Number(this.state.result);
        let number = Number(this.state.num);
        let sign = this.state.sign;

        if (sign === '+') {
            total = result + number;
        }
        if (sign === '-') {
            total = result - number;
        }
        if (sign === '*') {
            total = result * number;
        }
        if (sign === '/') {
            total = result / number;
        }

        this.setState({
            num: 0,
            result: total,
            sign: '',
            metaInfo:
                this.state.num === 0
                    ? ''
                    : `${this.state.metaInfo} ${number} =`,
        });
    };
    signClickHandler = (e) => {
        e.preventDefault();

        this.setState({
            sign:
                e.target.innerHTML === 'X'
                    ? '*'
                    : e.key
                    ? e.key
                    : e.target.innerHTML,
            result: this.state.result ? this.state.result : this.state.num,
            num: 0,
        });
    };
    decimialClickHandler = () => {
        !this.state.num.toString().includes('.') &&
            this.setState({ num: this.state.num + '.' });
    };
    backspaceHandler = () => {
        let tempNumber = this.state.num;
        this.setState({ num: Math.floor(tempNumber / 10) });
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.state.sign !== prevState.sign && this.state.sign) {
            this.setState({
                metaInfo: `${this.state.result} ${this.state.sign}`,
            });
        }
    }
    componentDidMount() {
        document.title = 'React Calculator';
    }
    render() {
        return (
            <Wrapper>
                <Hotkeys
                    keyName="1, 2, 3, 4, 5, 6, 7, 8, 9, 0, c, ., shift+=, -, shift+8, /, shift+5, backspace, escape, enter, space"
                    onKeyDown={this.onKeyDown.bind(this)}
                    onKeyUp={this.onKeyUp.bind(this)}
                    allowRepeat={true}
                ></Hotkeys>
                <Screen
                    value={this.state.num ? this.state.num : this.state.result}
                    metaInfo={this.state.metaInfo}
                />

                <ButtonBox>
                    {btnValues.flat().map((btn, i) => {
                        return (
                            <Button
                                key={i}
                                className={`
                                    ${
                                        this.state.sign === btn
                                            ? 'active'
                                            : this.state.keydownClass === btn ||
                                              this.state.keydownClass ===
                                                  typeof btn
                                            ? 'isPressed'
                                            : ''
                                    }
                                    ${isNaN(btn) && 'light-text'}
                                    
                                `}
                                value={btn === '*' ? 'X' : btn}
                                onClick={
                                    btn === 'C'
                                        ? () => this.resetClickHandler()
                                        : btn === '+-'
                                        ? () => this.invertClickHandler()
                                        : btn === '%'
                                        ? () => this.percentClickHandler()
                                        : btn === '='
                                        ? () => this.equalsClickHandler()
                                        : btn === '/' ||
                                          btn === '*' ||
                                          btn === '-' ||
                                          btn === '+'
                                        ? (e) => this.signClickHandler(e)
                                        : btn === '.'
                                        ? () => this.decimialClickHandler()
                                        : typeof btn == 'object'
                                        ? () => this.backspaceHandler()
                                        : (e) => this.numClickHandler(e)
                                }
                            />
                        );
                    })}
                </ButtonBox>
            </Wrapper>
        );
    }
}

export default App;
