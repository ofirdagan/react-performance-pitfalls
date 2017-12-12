import React from 'react';

export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    const inputs = Array.from({length: 180}).reduce((acc, curr, index) => {
      acc[index] = '';
      return acc;
    }, {});
    this.handleChange = this.handleChange.bind(this);
    this.state = {inputs};
  }

  handleChange({index, text}) {
    const inputs = Object.assign({}, this.state.inputs, {[index]: text});
    this.setState({inputs});
  }

  render() {
    const {inputs} = this.state;
    const inputsComps = Object.keys(inputs).map((key, index) => {
      return <InputComponent key={index} index={index} value={inputs[key]} handleChange={this.handleChange}/>
    });
    return (
      <form>
        {inputsComps}
      </form>
    );
  }

}

const withRenderCount = (name, Comp) => {
  return class WithRenderComponent extends React.Component {
    constructor(props) {
      super(props);
      this.renderCount = 0;
    }

    render() {
      return <Comp {...this.props}/>;
    }
  }
};

class CardHeader extends React.Component {
  render() {
    const {title} = this.props;
    return (
      <h1>
        {title}
      </h1>
    );
  }
}

class CardFooter extends React.Component {
  render() {
    const {footNote} = this.props;
    return (
      <h4>
        {footNote}
      </h4>
    );
  }
}

class CardContent extends React.Component {
  render() {
    const {footNote} = this.props;
    return (
      <InputComponent/>
    );
  }
}

class Card extends React.Component {
  render() {
    const {}
    return (
      <div>
        <CardHeader title={title}/>
        <CardContent/>
        <CardFooter footNote={}/>
      </div>
    );
  }
}

class GrandChild extends React.Component {
  constructor(props) {
    super(props);
    this.renderCount = 0;
  }
  render() {
    const {value, index} = this.props;
    console.log(`grand child[${index}]: rendered ${++this.renderCount} times`);
    const text = value ? 'has value' : '';
    return (
      <div>
        {text}
      </div>
    );
  }
};

class InputComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderCount = 0;
  }

  doSomeNaiveCalcOnProps(value) {
    const randomLetter = ('abcdefghijklmnopqrstuvwxyz').split('')[(Math.floor(Math.random() * 26 ))];
    return value.split('').map(char => char === randomLetter ? `a` : char).join('');
  }

  render() {
    const {index, value, handleChange} = this.props;
    console.log(`input[${index}]: rendered ${++this.renderCount} times`);
    const calculatedValue = this.doSomeNaiveCalcOnProps(value);
    return (
      <div>
        <input value={calculatedValue} onChange={(event) => this.props.handleChange({text: event.target.value, index})}/>
        <GrandChild value={calculatedValue} index={index}/>
      </div>
    );
  }
}
