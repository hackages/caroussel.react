import React, {Component} from 'react';

export class TeslaClimate extends Component {
  state={focused: false}

  onBlur = () => {
    this.setState({focused :false});
  }
  onFocus = () => {
    this.setState({focused :true});
  }
  render() {
    const {limit, value, click} = this.props
    const {focused} = this.state
    return (
      <div>
        <label className={`tesla-climate__item ${!limit ? 'tesla-heat ' : ' '}${value ? 'tesla-climate__item--active ': ' '}${focused === value ? 'tesla-climate__item--focused': ''}`}>
          <p className="heat">{limit ? 'ac' : 'heat'} {value ? 'on' : 'off'}</p>
          <i className="tesla-climate__icon"/>
          <input type="checkbox"
                 name="climate"
                 defaultChecked={value}
                 onClick={click}
                 onBlur={this.onBlur}
                 onFocus={this.onFocus}/>
        </label>
      </div>
    );
  }
}
