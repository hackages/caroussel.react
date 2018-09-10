import React, {Component} from 'react';
import teslaService from "./tesla-battery.service";
import {TeslaCar} from "./components/TeslaCar";
import {TeslaClimate} from "./components/TeslaClimate";
import {TeslaStats} from "./components/TeslaStats";
import {TeslaWheels} from "./components/TeslaWheels";
import {TeslaCounter} from "./components/TeslaCounter";

export class TeslaBattery extends Component {
  state = {
    title: 'Ranger Per Charge',
    models: ['60', '60D', '75', '75D', '90D', 'P100D'],
    wheels: 19,
    climate:true,
    temperature: 20,
    speed: 55,
    metrics: {}
  }

  changeClimate = () => {
    this.setState({climate: !this.state.climate})
  }


  changeWheelSize = (size) => {
    this.setState({wheels : size})
  }



  componentDidMount(){
    this.setState({metrics: teslaService.getModelData()})
  }

  render() {
    const {title, wheels, speed, models, metrics, climate, temperature} = this.state
    if(!metrics["60"]){
      return null
    }
    return (
      <form className="tesla-battery">
        <h1>{title}</h1>

        <TeslaCar wheels={wheels}
                   speed={speed}/>

       <TeslaStats stats={models.map(model => {
         const miles = metrics[model][wheels][
           climate ? 'on' : 'off'
           ].speed[speed][temperature];
         return {
           model,
           miles,
         }
       })}/>

        <div className="tesla-controls cf">
          <TeslaCounter
            title="Speed"
            unit="mph"
            step={5}
            min={45}
            max={70}
            changeVal={(value) => this.setState({speed: value})}
            value={this.state.speed}
          />
          <div className="tesla-climate cf">

            <TeslaCounter
              title="Outside Temperature"
              unit="°"
              step={10}
              min={-10}
              max={40}
              changeVal={(value) => this.setState({temperature: value})}
              value={this.state.temperature}
            />

           <TeslaClimate limit={temperature > 10} value={climate} click={this.changeClimate}/>
          </div>

         <TeslaWheels value={wheels} changeWheelSize={this.changeWheelSize}/>

        </div>
        <div className="tesla-battery__notice">
          <p>
            The actual amount of range that you experience will vary based on your particular use conditions. See how
            particular use conditions may affect your range in our simulation model.
          </p>
          <p>
            Vehicle range may vary depending on the vehicle configuration, battery age and condition, driving style and
            operating, environmental and climate conditions.
          </p>
        </div>
      </form>
    )
  }
}

