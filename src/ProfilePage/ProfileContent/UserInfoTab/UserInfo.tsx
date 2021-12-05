import React, { Component } from 'react';
import './UserInfo.css';


class UserInfo extends Component {

  constructor(props: any) { 
    super(props)

    this.state = { 
      username: '',
      education: '',
      phoneNumber: '',
      email: '',
      address: ''
    }
  }

  handleOccupationChange = (event: any) => { 
    this.setState({ 
      username: event.target.value
    })
  }

  handleEducationChange = (event: any) => { 
    this.setState({ 
      education: event.target.value
    })
  }

  handlePhoneNumChange = (event: any) => { 
    this.setState({
      phoneNumber: event.target.value
    })
  }

  handleEmailChange = (event: any) => { 
    this.setState({ 
      email: event.target.value
    })
  }

  handleAddressChange = (event: any) => { 
    this.setState({
      address: event.target.value
    })
  }



  render() {
    return (
      <form>
        <div>
          <label>Occupation</label>
          <input type ="text" 
          // value = { this.state.username} 
          onChange={this.handleOccupationChange} 
          />

          <label>Highest Education Attainment</label>
          <input type = "text"
          // value = { this.state.education}
          onChange = {this.handleEducationChange}
          />

          <label>Phone</label>
          <input type = "number"
          // value = { this.state.phoneNumber}
          onChange = { this.handlePhoneNumChange}
          />

          <label>Email</label>
          <input type = "email"
          // value = { this.state.email}
          onChange = { this.handleEmailChange}
          />

          <label>Address</label>
          <input type = "text"
          // value = { this.state.address} 
          onChange = { this.handleAddressChange}
          />
        </div>

      </form>

    )
  }
}


export default UserInfo;
