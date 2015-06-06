/**
 * Created by vimukthiw on 12/21/14.
 */
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://testhj.firebaseio.com/");

send();
abc();

function send(){
    myFirebaseRef.set({name: '1', text: 'vimukthi'});
}

function abc() {
    console.log('vimukthi');
}
//done