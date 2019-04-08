$(document).ready(function(){
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyANW-KcYQVIzBcjBsq3_KEuNON5ZxZ3hLM",
    authDomain: "train-schedules-19a33.firebaseapp.com",
    databaseURL: "https://train-schedules-19a33.firebaseio.com",
    projectId: "train-schedules-19a33",
    storageBucket: "train-schedules-19a33.appspot.com",
    messagingSenderId: "857550039002"
  };
  firebase.initializeApp(config);
    // A variable to reference the database.
    var database = firebase.database();
    // Variables for the onClick event
    var name;
    var destination;
    var firstTrainTime;
    var frequency = 0;
    $("#add-train").on("click", function() {
        event.preventDefault();
        // Storing and retreiving new train data
        name = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrainTime = $("#first-train").val().trim();
        frequency = $("#frequency-input").val().trim();
        // Pushing to database
        database.ref().push({
            name: name,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
    });
    
    
    
    
    
    database.ref().on("child_added", function(childSnapshot) {
        var nextArr;
        var minAway;
        // Chang year so first train comes before now
        var firstTrainNew = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
        // Difference between the current and firstTrainTime
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % childSnapshot.val().frequency;
        // Minutes until next train
        var minAway = childSnapshot.val().frequency - remainder;
        // Next train time
        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");
        $(".new-train").append("<tr><td>" + childSnapshot.val().name +
                "</td><td>" + childSnapshot.val().destination +
                "</td><td>" + childSnapshot.val().frequency +
               "</td><td>" + nextTrain + 
               "</td><td>" + minAway + "</td></tr>");
     
  
            // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
    });
    //database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // Change the HTML to reflect
        //$("#name-display").html(snapshot.val().name);
        //$("#email-display").html(snapshot.val().email);
        //$("#age-display").html(snapshot.val().age);
        //$("#comment-display").html(snapshot.val().comment);
    //});



   // setInterval (function (){
        //$("#moment").empty();
        //$("#moment").append(moment().format('MMMM Do YYYY, h:mm:ss a'))
        //$("#moment").empty();
   // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
    //},1000)
    //$("#moment").append(moment().format('MMMM Do YYYY, h:mm:ss a'))
     
});


