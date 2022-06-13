import { useEffect } from "react";

const GoogleAuth = () => {

    // const [isSignedIn, ]

    useEffect(()=> {
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: '55808694388-s8ns7jgm8ohce5laitqvjir6jbn6tg5s.apps.googleusercontent.com',
                scope: 'email',
                plugin_name: "streamy"
            }).then(()=>{
                auth = window.gapi.auth2.getAuthInstance();
                setState({ isSignedIn: this.auth.isSignedIn.get()});
            });
        });
    }, []);

    return ( 
        <div>

        </div>
     );
}
 
export default GoogleAuth;