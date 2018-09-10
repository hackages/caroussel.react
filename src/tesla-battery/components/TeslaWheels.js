import React, {Component} from 'react';

export class TeslaWheels extends Component {
  state={
    sizes: [19, 21],
    focused: null
  }

  onBlur = () => {
    this.setState({focused: ''})
  }
  onFocus = (size) => {
    this.setState({focused: size})
  }
  render() {
    const {value} = this.props
    const {focused, sizes} = this.state
    return (
      <div className="tesla-wheels">
        <p className="tesla-wheels__title">Wheels</p>
        <div className="tesla-wheels__container cf">
          {sizes.map(size => (
            <label key={size}
                   className={`${value === size ? 'tesla-wheels__item--active ': ' '}${focused === size ? 'tesla-wheels__item--focused ' : ' '}tesla-wheels__item tesla-wheels__item--${size}`}>
              <input type="radio"
                     name="wheelsize"
                     value={size}
                     onBlur={this.onBlur}
                     onClick={() => this.props.changeWheelSize(size)}
                     onFocus={() => this.onFocus(size)}
                     defaultChecked={value === size}/>
              <p>
                {size}"
              </p>
            </label>
          ))}
        </div>
      </div>
    );
  }
}
