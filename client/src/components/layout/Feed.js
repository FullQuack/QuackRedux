import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFeed } from '../../actions/postActions';

class Feed extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getFeed();
  }

  render() {
    return (
      <div className="feed-container">
        <h2>{this.props.auth.user.name} successfully Logged in!</h2>
      </div>

    )
  }
};


const mapStateToProps = state => ({ 
  auth: state.auth,
  feed: state.feed
});

export default connect(mapStateToProps, { getFeed })(Feed);