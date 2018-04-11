var favMovies = new Firebase('https://moviefire-eeb22.firebaseio.com/');

// adds the test/survey title to the top of the page, then saves to firebase (calls function saveToList(event))
function addTitle() {
	var titleName = document.getElementById("titleName").value.trim();
	document.getElementById("tsTitle").innerHTML = titleName;
	var data = titleName;
	return saveToList(event, data);
	};

// adds the name of the question to the page, then saves to firebase	
function addQuestionName() {
	var questionName = document.getElementById("questionName").value.trim();
	document.getElementById("qName").innerHTML = questionName;
	var data = questionName;
	return saveToList(event, data);
};

function addMultipleChoice() {
	alert('Will add code to append appropriate elements to create a new multiple choice question.  i.e. add label with question name and ordered list with answer choices.');

};

function addTrueFalse() {
	alert('Will add code to append appropriate elements to create a new true/false question.  i.e. add label with question name and true/false answer choices.');

};

function addShortAnswer() {
	alert('Will add code to append appropriate elements to create a new short answer question.  i.e. add textarea and label with question name.');
};

function addEssayAnswer() {
	alert('Will add code to append appropriate elements to create a new essay answer question.  i.e. add textarea and label with question name.');
}

function addMatching() {
	alert('Will add code to append appropriate elements to create a new matching question.  i.e. add label with question name and maybe dropdowns for matching.');

}

function addRanking() {
	alert('Will add code to append appropriate elements to create a new ranking question.  i.e. add label with question name and maybe dropdowns for ranking.');

}
	
// saves data to firebase
function saveToList(event, data) {
      // as the user clicks the button, we will attempt to save the data
        var dataToSave = data;
        if (dataToSave.length > 0) {
            saveToFB(dataToSave);
        }
		// clears questionName value
        document.getElementById('questionName').value = '';
		document.getElementById('titleName').value = '';
        return false;
    
};

// pushes data to firebase
function saveToFB(dataToSave) {
    // this will save data to Firebase
    favMovies.push({
        name: dataToSave
    });
};
 
function refreshUI(list) {
    var lis = '';
    for (var i = 0; i < list.length; i++) {
        lis += '<li data-key="' + list[i].key + '">' + list[i].name + ' [' + genLinks(list[i].key, list[i].name) + ']</li>';
    };
    document.getElementById('favMovies').innerHTML = lis;
};
 
function genLinks(key, mvName) {
    var links = '';
    links += '<a href="javascript:edit(\'' + key + '\',\'' + mvName + '\')">Edit</a> | ';
    links += '<a href="javascript:del(\'' + key + '\',\'' + mvName + '\')">Delete</a>';
    return links;
};
 
function edit(key, mvName) {
    var data = prompt("Update the movie name", mvName); // to keep things simple and old skool :D
    if (data && data.length > 0) {
        // build the FB endpoint to the item in movies collection
        var updateMovieRef = buildEndPoint(key);
        updateMovieRef.update({
            name: data
        });
    }
}
 
function del(key, mvName) {
    var response = confirm("Are certain about removing \"" + mvName + "\" from the list?");
    if (response == true) {
        // build the FB endpoint to the item in movies collection
        var deleteMovieRef = buildEndPoint(key);
        deleteMovieRef.remove();
    }
}
 
function buildEndPoint (key) {
	return new Firebase('https://moviefire-eeb22.firebaseio.com/' + key);
}
 
// this will get fired on inital load as well as when ever there is a change in the data
favMovies.on("value", function(snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            name = data[key].name ? data[key].name : '';
            if (name.trim().length > 0) {
                list.push({
                    name: name,
                    key: key
                })
            }
        }
    }
    // refresh the UI
    refreshUI(list);
});

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}