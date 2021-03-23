//politcian for the page,
var politicianID = undefined;
//keep all the fetchs in service for organization
var Service = {
  origin: "http://localhost:3000/pol",
  getPolData: function(){
    return fetch(this.origin + '/' + politicianID + '/' + 'info').then(
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



var main = function(){
}

//run main function after page loads
window.addEventListener('load', main);