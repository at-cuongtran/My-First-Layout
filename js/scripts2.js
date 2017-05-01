function dropdownToggle(elt) {
	var dropdownContent = elt.nextElementSibling;
	dropdownContent.classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropdown-btn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].classList.contains('show')) {
        dropdowns[i].classList.remove('show');
      }
    }
  }
}

function arrowOn(elt) {
	console.log(elt.children[0]);
	elt.children[0].classList.add("arrow-show");

	//var headElement = document.getElementsByTagName('head');
//	var style = document.createElement('style');
//	style.innerHTML = '.arrow-item1:before {display: block;}';
//	headElement[0].append(style);
}

function arrowOff(elt) {
	elt.children[0].classList.remove("arrow-show");
//	var styleElement = document.getElementsByTagName('style');
//	styleElement[0].parentNode.removeChild(styleElement[0]);
}