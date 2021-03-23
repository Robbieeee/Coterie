//Checks the user's name input; gives error if empty
function checkuserFullName()
{
    var Username = document.getElementById("userFullName").value;
    var flag = false;
    if(Username === "")
        flag = true;
    if(flag)
        document.getElementById("userFullNameError").style.display = "block";
    else
        document.getElementById("userFullNameError").style.display = "none";
}

//Check's the user's username input; gives error if empty
function checkUsername()
{ 
    var Username = document.getElementById("Username").value;
    var flag = false;
    if(Username === "")
        flag = true;
    if(flag)
        document.getElementById("UsernameError").style.display = "block";
    else
        document.getElementById("UsernameError").style.display = "none";
}

//Check's the user's email input, ensuring it is in the format of a valid email with "@" sign, etc. 
function checkUserEmail()
{
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag = true;
    if(userEmail.value.match(userEmailFormate))
        flag = false;
    if(flag)
        document.getElementById("userEmailError").style.display = "block";
    else
        document.getElementById("userEmailError").style.display = "none";
}

//Check's the user's password input to ensure it is valid; uppercase, lowercase and has a number
function checkUserPassword()
{
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag = true;
    if(userPassword.value.match(userPasswordFormate))
        flag = false;
    if(flag)
        document.getElementById("userPasswordError").style.display = "block";
    else
        document.getElementById("userPasswordError").style.display = "none";
}

//Check's user's sign up credentials and stores them in Firebase, then takes user to the sign in page if all credentials meet the specified criteria
function signUp()
{
    var userFullName = document.getElementById("userFullName").value;
    var Username = document.getElementById("Username").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userFullNameFormatValidate = /^([A-Za-z.\s_-])/;    
    var userEmailFormatValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormatValidate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkuserFullNameValid = userFullName.match(userFullNameFormatValidate);
    var checkUserEmailValid = userEmail.match(userEmailFormatValidate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormatValidate);

    if(checkuserFullNameValid == null)
        return checkuserFullName();
    else if(Username === "")
        return checkUsername();
    else if(checkUserEmailValid == null)
        return checkUserEmail();
    else if(checkUserPasswordValid == null)
        return checkUserPassword();
    else
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => 
        {
            var user = firebase.auth().currentUser;
            var uid;

            if (user != null) 
                uid = user.uid;
            
            var ref = firebase.database().ref('Users');
            var userData = 
            {
                userFullName: userFullName,
                Username: Username,
                userEmail: userEmail,
                userPassword: userPassword,
            }
            ref.child(uid).set(userData);
            console.log("Account Created");
            window.open("signin.html");
        }).catch((error) => 
        {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}

//Check's user's sign up credentials from Firebase and if they match with what the user entered here, user is redirected to the homepage. If not, user gets an error
function signIn()
{
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userEmailFormatValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormatValidate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserEmailValid = userEmail.match(userEmailFormatValidate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormatValidate);

    if(checkUserEmailValid == null)
        return checkUserEmail();
    else if(checkUserPasswordValid == null)
        return checkUserPassword();
    else
    {
        console.log("Signing in, please wait.");
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then((success) => 
        {
            console.log("Sign In Successful");
            firebase.auth().onAuthStateChanged(function(user) 
            {
                console.log(user.uid);
                if (user) 
                {
                    localStorage.userID = user.uid;
                    window.location = 'profile.html';
                }
            });
        }).catch((error) => 
        {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }
}

//Signs user out of homepage and redirects them to the sign in page
function signOut()
{
    firebase.auth().signOut().then(function() 
    {
        console.log("Sign Out Successful");
        window.open("signin.html", "_self");
    }).catch(function(error) 
    {
        let errorMessage = error.message;
        console.log(errorMessage);
    });
}



