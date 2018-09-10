import React, {Component} from 'react';

export class TeslaStats extends Component {
  render() {
    return (
      <div className="tesla-stats">
        <ul>
          {this.props.stats.map(stat => <li key={stat.model}>
              <div className={`tesla-stats-icon tesla-stats-icon--${stat.model.toLowerCase()}`}/>
              <p>{stat.miles}
                <span>MI</span>
              </p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
