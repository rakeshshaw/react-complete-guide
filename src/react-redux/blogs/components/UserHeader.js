// import { useEffect } from "react";
import { connect } from "react-redux";
// import { fetchUser } from "../actions";

const UserHeader = ({ user }) => {

    // useEffect(()=> {
    //     fetchUser(userId);
    // }, []);

  return (
    <div className="header">
        {user && user.name}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
    return { user: state.users.find(user => user.id === ownProps.userId) };
};

// export default connect(mapStateToProps, { fetchUser })(UserHeader);
export default connect(mapStateToProps)(UserHeader);
