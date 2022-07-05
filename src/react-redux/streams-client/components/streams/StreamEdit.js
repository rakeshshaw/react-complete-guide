import _ from "lodash";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = ({ stream, fetchStream, editStream, match }) => {
  useEffect(() => {
    fetchStream(match.params.id);
    console.log(match.params);
  }, []);

  const onSubmit = (formValues) => {
    console.log(formValues);
    editStream(match.params.id, formValues);
  };

  const renderContent = () => {
    if (!stream) return <div>Loading...</div>;
    else {
      return (
        <div>
          <h3>Edit a stream</h3>
          <StreamForm
            onSubmit={onSubmit}
            initialValues={_.pick(stream, "title", "description")}
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
export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
