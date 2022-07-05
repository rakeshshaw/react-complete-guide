import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

const StreamList = ({ streams, currentUser, isSignedIn, fetchStreams }) => {
  useEffect(() => {
    fetchStreams();
  }, []);

  const renderAdminButtons = (stream) => {
    if (stream.userId === currentUser) {
      return (
        <div className="right floated content">
          {/* <button className="ui button primary">Edit</button> */}
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
          {/* <button className="ui button negative">Delete</button> */}
        </div>
      );
    }
  };

  const renderCreateButton = () => {
    if(isSignedIn) {
        return (
            <div style={{textAlign: 'right'}}>
                <Link to="/streams/new" className="ui button primary" >
                    Create Stream
                </Link>
            </div>
        )
    }
  }

  const renderList = streams.map((stream) => {
    return (
      <div className="item" key={stream.id}>
        {renderAdminButtons(stream)}
        <i className="large middle aligned icon camera" />
        <div className="content">
          <Link to={`/streams/show/${stream.id}`} >
          {stream.title}
          </Link>
          
          <div className="description">{stream.description}</div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList}</div>
      {renderCreateButton()}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.streams);
  return {
    streams: Object.values(state.streams),
    currentUser: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
