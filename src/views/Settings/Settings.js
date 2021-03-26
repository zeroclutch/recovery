import Header from '../../components/Header/Header';
import { useState, useEffect } from 'react'

function Settings(props) {
  const [sex, setSex] = useState('Male')
  const [unit, setUnit] = useState('')
  const [weight, setWeight] = useState(0)

  function handleSexChange(e) { setSex(e.target.value); }
  function handleUnitChange(e) { setUnit(e.target.value); }
  function handleWeightChange(e) { setWeight(e.target.value); }



  function handleChange(e, setter) {
    setter(e.target.value)
  }

  function handleUserSettingsUpdate(e) {
    console.log({ unit, weight, sex })
    props.handleUserSettingsUpdate({ unit, weight, sex })
  }

  useEffect(() => {
    setUnit('kg')
    setWeight(props.userSettings.weight)
    setSex(props.userSettings.sex)
  }, [])
  
  return (
    <div class="settings-page">
      <Header left=" " right="Done" rightLink="/home" title="Settings"></Header>
      {/*https://bulma.io/documentation/form/general/ */}
      <div class="analysis-card m-4 is-cleared-both">
        <div class="analysis-card-header px-5 py-4">

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Weight</label>
            </div>
            <div class="field-body">
              <div class="field has-addons">
                <div class="control">
                  <input class="input" type="number" placeholder="Enter your weight" onChange={handleWeightChange} value={weight}/>
                </div>
                <div class="control">
                  <span class="select">
                    <select onChange={handleUnitChange} value={unit}>
                      <option>lbs</option>
                      <option>kg</option>
                    </select>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Sex</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <div class="select" onChange={handleSexChange}>
                    <select value={sex}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="field has-text-right">
            <button class="button is-primary" onClick={handleUserSettingsUpdate}>Save</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;