import React, {useState, useEffect} from 'react';
import teslaService from "./tesla-battery.service";
import {TeslaCar} from "./components/TeslaCar";

const TITLE = 'Range per charge'
const MODELS = ['60', '60D', '75', '75D', '90D', 'P100D'];
export const TeslaBattery = () => {
  const [wheels, setWheels] = useState({
    sizes: [19, 21],
    value: 19,
    focused: null
  })
  const [climate, setClimate] = useState({
    value: true,
    focused: false,
  })
  const [temperature, setTemperature] = useState({
    value: 20,
    focused: false,
    min: -10,
    max: 40,
    step: 10,
  })
  const [speed, setSpeed] = useState({
    value: 55,
    focused: false,
    min: 45,
    max: 70,
    step: 5,
  })
  const [metrics, setMetrics] = useState({})

  const onBlurSpeed = () => {
    setSpeed({...speed, focused: false})
  }
  const onBlurTemperature = () => {
    setTemperature({...temperature, focused: false})
  }

  const onFocusSpeed = () => {
    setSpeed({...speed, focused: true})
  }
  const onFocusTemperature = () => {
    setTemperature({...temperature, focused: true})
  }

  const incrementSpeed = () => {

  }
  const incrementTemperature = () => {

  }

  const decrementSpeed = () => {

  }
  const decrementTemperature = () => {
    if (temperature.value > temperature.min) {
      setTemperature({...temperature, value: temperature.value - temperature.step})
    }
  }

  const changeClimate = () => {

  }
  const onBlurClimate = () => {
    setClimate({...climate, focused: false})
  }
  const onFocusClimate = () => {
    setClimate({...climate, focused: true})
  }


  const onBlurWheels = () => {
    setWheels({...wheels, focused: null})
  }
  const changeWheelSize = (size) => {
    setWheels({...wheels, value: size})
  }
  const onFocusWheels = (size) => {
    setWheels({...wheels, focused: size})
  }

  useEffect(() => {
    setMetrics(teslaService.getModelData())
  }, [])

    if(!metrics["60"]){
      return null
    }
    return (
      <form className="tesla-battery">
        <h1>{TITLE}</h1>

        {/* TeslaCarComponent */}
        <TeslaCar wheels={wheels}
                   speed="speed.value"/>
        {/* End TeslaCarComponent */}

        {/* TeslaStatsComponent */}
        <div class="tesla-stats">
          <ul>
            {/* This is working well in the first place you won't have to touch it */}
            {models.map(model => {
              const miles = metrics[model][wheels.value][
                climate.value ? 'on' : 'off'
                ].speed[speed.value][temperature.value];
              return {
                model,
                miles,
              }
            }).map(stat => <li>
              {/* the stat.model here under must be lowercased */}
              <div className={`tesla-stats-icon tesla-stats-icon--${stat.model}`} />
                <p>{stat.miles}
                  <span>MI</span>
                </p>
              </li>
            )}
          </ul>
        </div>
        {/* End TeslaStatsComponent */}

        <div class="tesla-controls cf">
          {/* TeslaCounterComponent for speed */}
          <div className="tesla-counter">
            <p className="tesla-counter__title">Speed</p>
            <div className="tesla-counter__container cf">
              <div className="tesla-counter__item" tabIndex="0"
                   blur={"onBlurSpeed"}
                   @Focus={onFocusSpeed}>
                <p className="tesla-counter__number">
                  speed.value
                  <span>mph</span>
                </p>
                <div className="tesla-counter__controls"
                     tabIndex="-1">
                  <button tabIndex="-1"
                          type="button"
                          {(click)}="incrementSpeed"
                          disabled="speed.value === speed.max"/>
                  <button tabIndex="-1"
                          type="button"
                          onclick={decrementSpeed()}
                          disabled="speed.value === speed.min"/>
                </div>
              </div>
            </div>
          </div>
          {/* End TeslaCounterComponent for speed */}
          <div className="tesla-climate cf">

            {/* TeslaCounterComponent for outside temperature */}
            <div className="tesla-counter">
              <p className="tesla-counter__title">Outside Temperature</p>
              <div className="tesla-counter__container cf">
                <div className="tesla-counter__item"
                     tabIndex="0"
                     onBlur={() => onBlurTemperature}
                     onFocus={onFocusTemperature()}>
                  <p className="tesla-counter__number">
                    {{temperature.value}}
                    <span>°</span>
                  </p>
                  <div className="tesla-counter__controls"
                       tabIndex="-1">
                    <button tabIndex="-1"
                            type="button"
                            onClick={incrementTemperature}
                            disabled={temperature.value === temperature.max}/>
                    <button tabIndex="-1"
                            type="button"
                            onClick={decrementTemperature}
                            disabled={temperature.value === temperature.min}/>
                  </div>
                </div>
              </div>
            </div>
            {/* End TeslaCounterComponent for outside temperature */}

            {/* TeslaClimateComponent */}
            <div>
              <label className={`tesla-climate__item ${!(temperature.value > 10) ? 'tesla-heat ' : ' '}${climate.value ? 'tesla-climate__item--active ': ' '}${climate.focused === climate.value ? 'tesla-climate__item--focused': ''}`}>
                <p className="heat">{temperature.value > 10 ? 'ac' : 'heat'} {climate.value ? 'on' : 'off'}</p>
                <i className="tesla-climate__icon"/>
                <input type="checkbox"
                       name="climate"
                       checked={climate.value}
                       onClick={changeClimate}
                       onBlur={onBlurClimate}
                       onFocus={onFocusClimate}/>
              </label>
            </div>
            {/* End TeslaClimateComponent */}
          </div>

          {/* TeslaWheelsComponent */}
          <div className="tesla-wheels">
            <p className="tesla-wheels__title">Wheels</p>
            <div className="tesla-wheels__container cf">
                <label
                  *ngFor="size of wheels.sizes"
                    key={size}
                    className={`${wheels.value === size ? 'tesla-wheels__item--active ': ' '}${wheels.focused === size ? 'tesla-wheels__item--focused ' : ' '}tesla-wheels__item tesla-wheels__item--${size}`}>
                  <input type="radio"
                         name="wheelsize"
                         value={size}
                         onBlur={onBlurWheels}
                         onClick={() => changeWheelSize(size)}
                         onFocus={() => onFocusWheels(size)}
                         defaultChecked={wheels.value === size}/>
                  <p>
                    {size}"
                  </p>
                </label>
            </div>
          </div>
          {/* End TeslaWheelsComponent */}

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

