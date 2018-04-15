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
	var div_mc = document.createElement("div");
	div_mc.style.width = "100px";
	div_mc.style.height = "100px";
	div_mc.style.padding = "15px";
	div_mc.style.margin = "15px";
	div_mc.style.background = "red";
	div_mc.style.color = "white";
	div_mc.innerHTML = "Multiple Choice Question";
	document.body.appendChild(div_mc);
	div_mc.id = "mult_div";
	//var mcb = document.createElement("button");
	//div_mc.appendChild(mcb);
};

function addTrueFalse() {
	alert('Will add code to append appropriate elements to create a new true/false question.  i.e. add label with question name and true/false answer choices.');
	var div_tf = document.createElement("div");
	div_tf.style.width = "100px";
	div_tf.style.height = "100px";
	div_tf.style.padding = "15px";
	div_tf.style.margin = "15px";
	div_tf.style.background = "green";
	div_tf.style.color = "white";
	div_tf.innerHTML = "True/False Question";
	document.body.appendChild(div_tf);
	div_tf.id = "tf_div";
};

function addShortAnswer() {
	alert('Will add code to append appropriate elements to create a new short answer question.  i.e. add textarea and label with question name.');
	var div_sa = document.createElement("div");
	div_sa.style.width = "100px";
	div_sa.style.height = "100px";
	div_sa.style.padding = "15px";
	div_sa.style.margin = "15px";
	div_sa.style.background = "blue";
	div_sa.style.color = "white";
	div_sa.innerHTML = "Short Answer Question";
	document.body.appendChild(div_sa);
	div_sa.id = "srt_ans_div";
};

function addEssayAnswer() {
	alert('Will add code to append appropriate elements to create a new essay answer question.  i.e. add textarea and label with question name.');
	var div_ea = document.createElement("div");
	div_ea.style.width = "100px";
	div_ea.style.height = "100px";
	div_ea.style.padding = "15px";
	div_ea.style.margin = "15px";
	div_ea.style.background = "pink";
	div_ea.style.color = "white";
	div_ea.innerHTML = "Essay Answer Question";
	document.body.appendChild(div_ea);
	div_ea.id = "ess_ans_div";
};

function addMatching() {
	alert('Will add code to append appropriate elements to create a new matching question.  i.e. add label with question name and maybe dropdowns for matching.');
	var div_mt = document.createElement("div");
	div_mt.style.width = "100px";
	div_mt.style.height = "100px";
	div_mt.style.padding = "15px";
	div_mt.style.margin = "15px";
	div_mt.style.background = "orange";
	div_mt.style.color = "white";
	div_mt.innerHTML = "Matching Question";
	document.body.appendChild(div_mt);
	div_mt.id = "match_div";
};

function addRanking() {
	alert('Will add code to append appropriate elements to create a new ranking question.  i.e. add label with question name and maybe dropdowns for ranking.');
	var div_rk = document.createElement("div");
	div_rk.style.width = "100px";
	div_rk.style.height = "100px";
	div_rk.style.padding = "15px";
	div_rk.style.margin = "15px";
	div_rk.style.background = "purple";
	div_rk.style.color = "white";
	div_rk.innerHTML = "Ranking Question";
	document.body.appendChild(div_rk);
	div_rk.id = "rank_div";
};
	
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