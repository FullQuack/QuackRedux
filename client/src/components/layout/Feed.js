import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feed extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="feed-container">
        <h2>{this.props.auth.user.name} successfully Logged in!</h2>
      </div>

    )
  }
}

const mapStateToProps = state => ({ 
  auth: state.auth,
});

export default connect(mapStateToProps)(Feed);