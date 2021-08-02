console.log("Client side Javascript is loaded");
////////FETCH API
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

///querySelector is pag kuha ng tinaype ng user sa textBox
////////SA CLICK BUTTON NA TO PALAGI SA FORM ANG SELECTOR
const weatherForm = document.querySelector("form");
const search = document.querySelector("input"); ///input yung nasa index na textbox
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
////hastag sa ID
//messageOne.textContent = "From JavaScript";
weatherForm.addEventListener("submit", (e) => {
  ///smal submit
  ////e= event
  const location = search.value; //laman ng textbox///// +location nasa fetch
  e.preventDefault();
  messageOne.textContent = "Loading Please wait";
  messageTwo.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          //console.log(data.error);
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
