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
    let allPosts = [];
    let posts = this.props.feed;
    for (let i = 0; i < posts.length; i++) {
      let likesCount = 0;
      if (posts[i].likes.length !== undefined) {
        likesCount = posts[i].likes.length;
      }
      let date = new Date(Date.parse(posts[i].date));
      let dateObject = new Date(Date.parse(date));
      let dateReadable = dateObject.toDateString();
      allPosts.push(<div className="questionBox"> <i className="fas fa-arrow-up"></i> <strong> {likesCount} </strong><i className="fas fa-arrow-down"></i> <span className='question' key={i}>{posts[i].text}<br></br>{posts[i].tags}<br></br>{posts[i].name}<hr></hr></span></div>);
    }
    return (
      <div className="feed-container">
      
        <h2>{this.props.auth.user.name} successfully Logged in!</h2>
        {allPosts}
      </div>

    )
  }
};


const mapStateToProps = state => ({ 
  auth: state.auth,
  feed: state.feed
});

export default connect(mapStateToProps, { getFeed })(Feed);