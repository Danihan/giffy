$(document).ready(function(){

	var trees = [	"Pin Oak",
					"American Chestnut",
					"White Pine",
					"Sequoia",
					"Christmas Tree",
					"Maple",
					"Scrub Oak"
	];

	function createButtons() {
		for (var i = 0; i < trees.length; i++) {
			var newButtons = $('<button type="button" value="' + trees[i] + '">' + trees[i] + "</button>").addClass("allButtons");
			newButtons.attr({"data-show": trees[i] });
			$("#buttonsDiv").append(newButtons);
		}
	}

	createButtons();

	$("#submitButton").on("click", function(event) {
		event.preventDefault();
		var newUserButton = document.forms["inputForm"]["userInput"].value;
		trees.push(newUserButton);
		$("#buttonsDiv").empty();
		$("#a").empty();
		createButtons();
	});

	$(document).on("click", ".allButtons", function(){
		var bval = $(this).data("show");
		var benc = encodeURI(bval);
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + benc + "&limit=10&api_key=Tx5lKBIKSMM4zwDAmMGdivlt9scK2JGz";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			var results = response.data;
			for (var i = 0; i < results.length; i++) {
			  var treeDiv = $("<div>");
			  var p = $("<p>").text("Rating: " + results[i].rating);
			  var n = $("<p>").text("Name: " + results[i].slug);
			  var treeImg = $("<img>");
			  treeImg.attr("src", results[i].images.fixed_height.url);
			  treeDiv.append(p);
			  treeDiv.append(n);
			  treeDiv.append(treeImg);
			  $("#a").prepend(treeDiv);
			}
			$("img").addClass("giffy");
		});
	});

	$("body").on("click", ".giffy", function() {
		var src = $(this).attr("src");
		if($(this).hasClass("play")){
			$(this).attr("src", src.replace(/\.gif/i, "_s.gif"));
			$(this).removeClass("play");
		} else {
			$(this).addClass("play");
			$(this).attr("src", src.replace(/\_s.gif/i, ".gif"));
		}
	});

});