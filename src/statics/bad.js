import React from 'react';

const withRenderCount = (name, Comp) => {
  return class WithRenderComponent extends React.Component {
    constructor(props) {
      super(props);
      this.renderCount = 0;
    }

    render() {
      console.log(`${name}[${this.props.index}]: rendered ${++this.renderCount} times`);
      return <Comp {...this.props}/>;
    }
  }
};

class FormComponentComp extends React.Component {
  constructor(props) {
    super(props);
    const cardValues = Array.from({length: 100}).reduce((acc, curr, index) => {
      acc[index] = '';
      return acc;
    }, {});
    this.state = {cardValues, cardsWithValuesCount: 0};
  }

  handleChange({index, text}) {
    const cardValues = Object.assign({}, this.state.cardValues, {[index]: text});
    const cardsWithValuesCount = Object.keys(cardValues).filter(key => cardValues[key]).length;
    this.setState({cardValues, cardsWithValuesCount});
  }

  render() {
    const {cardValues} = this.state;
    const cards = Object.keys(cardValues).map((key, index) => {
      return (
        <Card
          key={index}
          index={index}
          value={cardValues[key]}
          handleChange={({index, text}) => this.handleChange({index, text})}
        />);
    });
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1>Cards With Values: {this.state.cardsWithValuesCount}</h1>
        <form className={'form'}>
          {cards}
        </form>
      </div>
    );
  }

}

class CardHeaderComp extends React.Component {
  render() {
    const {title} = this.props;
    return (
      <h1>
        {title}
      </h1>
    );
  }
}

class CardFooterComp extends React.Component {
  render() {
    const {footNote} = this.props;
    return (
      <h4>
        {footNote}
      </h4>
    );
  }
}

class CardContentComp extends React.Component {
  render() {
    const {index, value, handleChange} = this.props;
    return (
      <InputComponent key={index} index={index} value={value} handleChange={handleChange}/>
    );
  }
}

class CardComp extends React.Component {
  render() {
    const {index, value, handleChange} = this.props;
    return (
      <div className={'card'}>
        <CardHeader title={`Card ${index}`}/>
        <CardContent index={index} value={value} handleChange={handleChange}/>
        <CardFooter footNote={`foot note of card ${index}`}/>
      </div>
    );
  }
}

class GrandChildComp extends React.Component {
  render() {
    const {value, index} = this.props;
    const text = value ? 'has value' : '';
    return (
      <div>
        {text}
      </div>
    );
  }
}

class InputComponentComp extends React.Component {
  doSomeNaiveCalcOnProps(value) {
    return value.split('').map(char => char).join('');
  }

  render() {
    const {index, value, handleChange} = this.props;
    const calculatedValue = this.doSomeNaiveCalcOnProps(value);
    return (
      <div>
        <input value={calculatedValue} onChange={(event) => handleChange({text: event.target.value, index})}/>
        <GrandChild value={calculatedValue} index={index}/>
      </div>
    );
  }
}

const Card = withRenderCount('Card', CardComp);
const CardHeader = withRenderCount('CardHeader', CardHeaderComp);
const CardFooter = withRenderCount('CardFooter', CardFooterComp);
const CardContent = withRenderCount('CardContent', CardContentComp);
const GrandChild = withRenderCount('GrandChild', GrandChildComp);
const InputComponent = withRenderCount('InputComponent', InputComponentComp);
export default withRenderCount('FormComponent', FormComponentComp);

