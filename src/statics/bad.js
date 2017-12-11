import React from 'react';

export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    const inputs = Array.from({length: 180}).reduce((acc, curr, index) => {
      acc[index] = '';
      return acc;
    }, {});
    this.state = {inputs};
  }

  handleChange({index, text}) {
    const inputs = Object.assign({}, this.state.inputs, {[index]: text})
    this.setState({inputs});
  }

  render() {
    const {inputs} = this.state;
    const inputsComps = Object.keys(inputs).map((key, index) => {
      return <InputComponent key={index} index={index} value={inputs[key]} handleChange={this.handleChange.bind(this)}/>
    });
    return (
      <form>
        {inputsComps}
      </form>
    );
  }

}

class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.renderCount = 0;
  }

  doSomeNaiveCalcOnProps(value) {
    const randomLetter = ('abcdefghijklmnopqrstuvwxyz').split('')[(Math.floor(Math.random() * 26 ))];
    return value.split('').filter(char => char !== randomLetter).join('');
  }

  render() {
    const {index, value} = this.props;
    console.log(`input[${index}]: rendered ${++this.renderCount} times`);
    const calculatedValue = this.doSomeNaiveCalcOnProps(value);
    return (
      <input value={calculatedValue} onChange={(event) => this.props.handleChange({text: event.target.value, index})}/>
    );
  }
}
