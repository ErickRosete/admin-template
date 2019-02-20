import React, { Component } from 'react'

export class ResetPasswordPage extends Component {
  render() {
    return (
      <div>
        reset password
        {this.props.match.params.id}
      </div>
    )
  }
}

export default ResetPasswordPage
