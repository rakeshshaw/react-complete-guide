import { Link } from "react-router-dom";
import history from "../../history";
import Modal from "../ui/Modal";
import { fetchStream, deleteStream } from "../../actions";
import { useEffect } from "react";
import { connect } from "react-redux";

const StreamDelete = ({ stream, fetchStream, deleteStream, match }) => {
  useEffect(() => {
    fetchStream(match.params.id);
    console.log(match.params);
  }, []);

  const actions = (
    <>
      <button
        onClick={() => deleteStream(match.params.id)}
        className="ui primary button"
      >
        Delete
      </button>
      <Link to={"/"} className="ui button">
        Cancel
      </Link>
    </>
  );

  const renderContent = () => {
    if (!stream)
      return (
        <div>
          <Modal
            title="Delete stream"
            content="Are you sure you want to delete the stream with title ... "
            actions={actions}
            onDismiss={() => history.push("/")}
          />
        </div>
      );
    else {
      return (
        <div>
          <Modal
            title="Delete stream"
            content={`Are you sure you want to delete the stream with title ${stream.title}`}
            actions={actions}
            onDismiss={() => history.push("/")}
          />
        </div>
      );
    }
  };

  return <div>{renderContent()}</div>;
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
