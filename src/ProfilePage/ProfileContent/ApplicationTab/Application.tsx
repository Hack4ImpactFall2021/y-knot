import React, { Component } from 'react';
import {MDCCheckbox} from '@material/checkbox';
import {MDCRadio} from '@material/radio';


class Application extends Component {

  constructor(props: any) { 
    super(props)

    this.state = { 
      areas: '',
      characteristics: '',
      multiple_mentees: '',
      days_available: '',
      hours_available: '',
      age_preference: [],
      health_limitations: false,
      background_check: false,
    }
  }

  handleAreasChange = (event: any) => { 
    this.setState({ 
      areas: event.target.value
    })
  }

  handleCharacteristicsChange = (event: any) => { 
    this.setState({ 
      characteristics: event.target.value
    })
  }

  handleMultipleMenteesChange = (event: any) => { 
    this.setState({
      multiple_mentees: event.target.value
    })
  }

  handleDaysChange = (event: any) => { 
    this.setState({ 
      days_available: event.target.value
    })
  }

  handleHoursChange = (event: any) => { 
    this.setState({
      hours_available: event.target.value
    })
  }

  handleAgeChange = (event: any) => { 
    this.setState({
      age_limitations: event.target.value
    })
  }

  handleHealthChange = (event: any) => { 
    this.setState({
      health_limitations: event.target.value
    })
  }

  handleBackgroundChange = (event: any) => { 
    this.setState({
      background_check: event.target.value
    })
  }


  render() {
    return (
      <form>
        <div>
          <label>1. Based from your choices above, please describe the areas which you can be helpful of in providing mentoring.</label>
          <input type ="text" 
          // value = { this.state.username} 
          onChange={this.handleAreasChange} 
          />

          <br />

          <label>2. Is there any characteristic in a mentee that you may be uncomfortable handling? Please specify.</label>
          <input type = "text"
          // value = { this.state.education}
          onChange = {this.handleCharacteristicsChange}
          />

          <br />

          <label>3. Can you be a mentor for more than one person at the same time? </label>
          <input type = "text"
          // value = { this.state.phoneNumber}
          onChange = { this.handleMultipleMenteesChange}
          />

          <br />

          <label> Days Available </label>
          <div>
            <input type="checkbox" value="Monday"/> Monday
            <input type="checkbox" value="Tuesday"/> Tuesday
            <input type="checkbox" value="Wednesday"/> Wednesday
            <input type="checkbox" value="Thursday"/> Thursday
            <input type="checkbox" value="Friday"/> Friday
            <input type="checkbox" value="Saturday"/> Saturday
            <input type="checkbox" value="Sunday"/> Sunday
          </div>

          <br />

          <label> Number of Hours Available per Week </label>
          <div>
            <input type="radio" value="0-1"/> 0-1
            <input type="radio" value="1-2"/> 1-2
            <input type="radio" value="2-3"/> 2-3
            <input type="radio" value="3-4"/> 3-4
            <input type="radio" value="4-5"/> 4-5
            <input type="radio" value="5 or more"/> 5 or more
          </div>

          <br />

          <label> Age Preference </label>
          <div>
            <input type="square" value="Elementary"/> Elementary
            <input type="square" value="Middle School"/> Middle School
            <input type="square" value="High School"/> High School
            <input type="square" value="Other"/> Other
          </div>

          <br />

          <label> Do you have any health limitations? </label>
          <div>
            <input type="radio" value="Yes"/> Yes
            <input type="radio" value="No"/> No
          </div>

          <br />

          <p> Will you agree to have Y-KNOT Inc. check your background through federal and state agencies for criminal records and child abuse and neglect proceedings? </p>
          <div>
            <input type="radio" value="Yes"/> Yes
            <input type="radio" value="No"/> No
          </div>
        </div>

      </form>

    )
  }
}


export default Application;