import React, {Component} from 'react';

export class TeslaCounter extends Component {
  state={focused: false}

  increment = ()  => {
    const {value, max, step, changeVal} = this.props
    if (value < max) {
      changeVal(value + step);
    }
  }

  decrement = () => {
    const {value, min, step, changeVal} = this.props
    if (value > min) {
      changeVal(value - step);
    }
  }

  onFocus = () => {
    this.setState({focused: false})
  }
  onBlur = () => {
    this.setState({focused: true})
  }

  render() {
    const {min, max, title, unit, value} = this.props
    return (
      <div className="tesla-counter">
        <p className="tesla-counter__title">{title}</p>
        <div className="tesla-counter__container cf">
          <div className="tesla-counter__item" tabIndex="0"
               onBlur={this.onBlur}
               onFocus={this.onFocus}>
            <p className="tesla-counter__number">
              {value}
              <span>{unit}</span>
            </p>
            <div className="tesla-counter__controls"
                 tabIndex="-1">
              <button tabIndex="-1"
                      type="button"
                      onClick={this.increment}
                      disabled={value === max}/>
              <button tabIndex="-1"
                      type="button"
                      onClick={this.decrement}
                      disabled={value === min}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
