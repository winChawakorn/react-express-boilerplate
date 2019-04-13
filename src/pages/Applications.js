import React, { PureComponent } from 'react'
import axios from 'axios'

export default class Applications extends PureComponent {
  componentDidMount() {
    axios.get('/events')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        Events
      </div>
    )
  }
}
