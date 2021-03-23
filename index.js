//Name of the section in the database is set to "posts"
var posts = firebase.database().ref("posts");


//Put data into database
function submitClick() {

  // Get input values from each of the form elements
  var userMessage = $("#postmessage").val();
 
  // Push a new recommendation to the database using those values
  posts.push({
    "userMessage": userMessage
  });
};



