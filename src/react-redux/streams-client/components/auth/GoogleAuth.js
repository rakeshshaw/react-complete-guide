import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../actions";

const GoogleAuth = ({isSignedIn, signIn, signOut}) => {
  // post redux implementation component level state not required rather that is passed as props from redux store
//   const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "55808694388-s8ns7jgm8ohce5laitqvjir6jbn6tg5s.apps.googleusercontent.com",
          scope: "email",
          plugin_name: "streamy",
        })
        .then(() => {
          //   const auth = window.gapi.auth2.getAuthInstance();
          //   setIsSignedIn(auth.isSignedIn.get());
          //   auth.isSignedIn.listen(onAuthChange);

          // post redux implementation component level state not required
          const auth = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, [isSignedIn]);

  //   const onAuthChange = () => {
  //     setIsSignedIn( window.gapi.auth2.getAuthInstance().isSignedIn.get());
  //   }

  // After redux implementation component level state not required so commented out the above code
  const onAuthChange = (isSignedIn) => {
    // console.log(auth);
    /**
     * This part might be confusing as we are calling signIn after reciving true. basically we are checking if the 
     * iSSignedIn value is true then call the signIn action creator to set the value true across the application redux state
     * As we are not using redux to signIn, signOut.. we are signing In and signing out from this component itself but through 
     * redux we are setting IsSigneIn value across application by calling these two action creator signIn, signOut
     */
    if (isSignedIn) {
      signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getId());
    } else {
      signOut();
    }
  };

  const onSignInClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const onSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <div>
          <button className="ui red google button" onClick={onSignOutClick}>
            <i className="google icon" />
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className="ui red google button" onClick={onSignInClick}>
            <i className="google icon" />
            Sign In with Google
          </button>
        </div>
      );
    }
  };

//   return <div>{renderAuthButton()}</div>;
const signInText = "Sign In with Google";
const signOutText = "Sign Out";

return (
    <div>{renderAuthButton()}</div>
    // <div>
    //       <button className="ui red google button" onClick={!isSignedIn? onSignInClick: onSignOutClick}>
    //         <i className="google icon" />
    //         {!isSignedIn && signInText}
    //         {isSignedIn && signOutText}
    //       </button>
    // </div>
)

};

const mapStateToProps = (state) => {
    console.log(state.auth);
  return { isSignedIn: state.auth.isSignedIn};
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
