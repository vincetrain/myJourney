var db = firebase.firestore();

var uid = sessionStorage.getItem('uid');

var journeyid = sessionStorage.getItem('journey-id');

var docRef = db.collection("users").doc(uid).collection("journeys").doc(journeyid);

var journeyName = document.getElementById("journey-title");

var diary = document.getElementById("diary-diary");

var save = document.getElementById("savebutton");
var del = document.getElementById("delete");

del.onclick = function() {
		docRef.delete().then(() => {
	    	console.log("Document successfully deleted!");
	    	window.location.replace("diary-selector.html");
		}).catch((error) => {
	    	console.error("Error removing document: ", error);
});
}

save.onclick = function() {
	save.innerHTML = "saving";
	
	diary.setAttribute("disabled", true);
	journeyName.setAttribute("disabled", true);
	del.setAttribute("disabled", true);
	save.setAttribute("disabled", true);
	document.getElementById("goback").setAttribute("disabled", true);
	
	docRef.set({
		data: diary.value,
    	name: journeyName.value
    }, {merge: true}).then(() => {
    	
    		diary.removeAttribute("disabled");
			journeyName.removeAttribute("disabled");
			del.removeAttribute("disabled");
			save.removeAttribute("disabled");
			document.getElementById("goback").removeAttribute("disabled");
			
	    	save.innerHTML = "saved";
	    	setTimeout(function () {
	    		save.innerHTML = "save";
	    	}, 3000);
    	})
};

function stateChange(newState) {
    
}

function defJourney() {
	docRef.get().then((doc) => {
    if (doc.exists) {
        document.getElementById("date").textContent = doc.data().cdate;	// sets date

		journeyName.setAttribute("value", doc.data().name);
		journeyName.setAttribute("placeholder", doc.data().name);
		
		diary.innerHTML = doc.data().data
        console.log(doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such journey!");
    }
	}).catch((error) => {
	    console.log("Error getting journey:", error);
	});
}

defJourney();