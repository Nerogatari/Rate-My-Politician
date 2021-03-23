//politcian for the page,
var politicianID = undefined;
//keep all the fetchs in service for organization
var Service = {
  origin: "http://localhost:3000/pol",
  //returns an array of the politician data for politician with politicianID: polID
  getPolData: function(polID){
    return fetch(this.origin + '/' + polID + '/' + 'info').then(
      (response) => {
        if(response.status === 200)
          return Promise.resolve(response.json());
        else{
          return response.text().then((text) => {throw new Error(text);});
        }
      }
    ).catch(
      (err) => {
        console.log(err);
        return Promise.reject(err);
      }
    );
  }
};

/*
Change the display info of the politician page
*/
function displayPolInfo(polID){
  Service.getPolData(polID).then((result) => {
    let polParty = result[1];
    let polFName = result[2];
    let polLName = result[3];
    let polRating = result[4];
    document.getElementById('polName').innerHTML = polFName + ` ` + polLName;
    document.getElementById('polParty').innerHTML = polParty;
    document.getElementById('polRating').innerHTML = polRating;
  }).catch((err)=>{
    document.getElementById('polName').innerHTML = `Can't get politician with ID: ` + politicianID;
    console.log(err);
  });
}

var main = function(){
  //get politicianID from the url
  let loc = window.location.pathname;
  let urlArr = loc.split(/\//)
  politicianID = urlArr[2];

  //update display
  displayPolInfo(politicianID);
}

//run main function after page loads
window.addEventListener('load', main);