var Service = {
  origin: "http://localhost:3000/"
}
//helper functions for manipulating DOM
// Removes the contents of the given DOM element (equivalent to elem.innerHTML = '' but faster)
function emptyDOM (elem){
	while (elem.firstChild) elem.removeChild(elem.firstChild);
}

// Creates a DOM element from the given HTML string
//e.g var contentDiv = createDOM(`<div class="content"> </div>`); document.getElementById('contentHolderDiv').appendChild(contentDiv);
function createDOM (htmlString){
	let template = document.createElement('template');
	template.innerHTML = htmlString.trim();
	return template.content.firstChild;
}