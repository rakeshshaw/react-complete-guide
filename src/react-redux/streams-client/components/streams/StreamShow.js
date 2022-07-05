import _ from "lodash";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = ({ stream, fetchStream, match }) => {
  useEffect(() => {
    fetchStream(match.params.id);
    console.log(match.params);
  }, []);

  const renderContent = () => {
    if (!stream) return <div>Loading...</div>;
    else {
      const { title, description } = stream;
      return (
        <div>
            <h1>Stream Show</h1>
          <h3>{title}</h3>
          <h3>{description}</h3>
        </div>
      );
    }
  };

  return <div>{renderContent()}</div>;
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
