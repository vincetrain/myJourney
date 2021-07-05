const journeyList = document.getElementById('journey-list');

var db = firebase.firestore();

var uid = sessionStorage.getItem('uid');
var displayname = sessionStorage.getItem('displayname');

var date = new Date();
var dd = String(date.getDate());
var mm = String(date.getMonth()+1);
var yy = String(date.getFullYear());
var time = String(date.getTime());

var realDate = mm+"/"+dd+"/"+yy;

var logout = document.getElementById("logout");

logout.onclick = function() {
	var uid = sessionStorage.setItem('uid', "");
	var displayname = sessionStorage.setItem('displayname', "");
	window.location.replace("index.html");
}

document.getElementById("create-new").onclick = function() {
	createNewJourney("New Journey", realDate, time);
}

function openDiary(clicked_object) {
	sessionStorage.setItem('journey-id', clicked_object.getAttribute('data-id'))
	window.location.replace("diary.html");
}

function renderJourney(doc) {
	let li = document.createElement("button");
	let name = document.createElement("h2");
	let _cdate = document.createElement("p");

	let divider = document.createElement("div");
	
	li.setAttribute("data-id", doc.id);
	li.setAttribute("onclick", "openDiary(this)")
	name.textContent = doc.data().name;
	_cdate.textContent = "Created on: " + doc.data().cdate;
	
	li.appendChild(name);
	li.appendChild(_cdate);
	
	journeyList.appendChild(li);
	journeyList.appendChild(divider);
}

function fetchJourneys() {
	console.log("this works");
	db.collection("users").doc(uid).collection("journeys").orderBy("ctime", "desc").get().then((querySnapshot) => {
	    querySnapshot.forEach((doc) => {
	        // doc.data() is never undefined for query doc snapshots
	        renderJourney(doc);
	    });
	});
	// renderNewButton();
}

function createNewJourney(journeyName, date, time) {
	db.collection("users").doc(uid).collection("journeys").add({
		name: journeyName,
		cdate: date,
		data: "",
		ctime: time
	}, {merge: true}).then((user) => {
			window.location.reload();
		})
}

document.getElementById("display-name").textContent = 'Welcome, ' + displayname;

fetchJourneys();