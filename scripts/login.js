// Variables

var uid;

var db = firebase.firestore();

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      // window.location.assign("homepage.html");
      firebase.auth().onAuthStateChanged((user) => {
      	uid = user.uid;
      	console.log(uid);
      	sessionStorage.setItem("uid", user.uid);
      	sessionStorage.setItem("displayname", user.displayName);
    	db.collection("users").doc(uid).set({
    	  exists: true,
    	}, {merge: true}).then((user) => {
    		window.location.replace("diary-selector.html");
    	})
      })
      return false;
    },
    
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'homepage.html',
  signInOptions: [
  	{
    // Leave the lines as is for the providers you want to offer your users.
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    fullLabel: "Sign up with email"
  	}
  ],
};

// Main

ui.start('#firebaseui-auth-container', uiConfig);