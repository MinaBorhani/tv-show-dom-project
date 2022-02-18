//get API
const url = "https://api.tvmaze.com/shows/82/episodes";


const mainRoot = document.querySelector("#main_root")
const select =document.querySelector(".selector");


/////////////////////////////////////////
//Show Episode
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    showImage(data);
    console.log(data);
  })

const showImage = (data) => {
  const section =document.createElement("section");
  section.classList.add("sec2");
  for (let element of data) {

    const div1 =document.createElement("div");
    div1.classList.add("card");
    const span = document.createElement("span");
    const img = document.createElement("img");
    img.src = element.image.medium;

    const div =document.createElement("div");
    div.classList.add("card-body");
    const h5= document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = element.name;
    const p = document.createElement("p");
    p.classList.add("card-text");
    p.innerHTML = element.summary;

    const h6 = document.createElement("h6");
    if(element.number<10){
    h6.textContent = `S0${element.season}E0${element.number}`;
    }else{
        h6.textContent = `S0${element.season}E${element.number}`;
    }

    mainRoot.append(section);
    section.append(div1);
    div1.append(span);
    span.append(img , div);
    div.append(h5 , h6 , p);

//create Drop Down =>  S0seasonE0number for <10 and S0seasonEnumber for > 10
    if(element.number<10){
      let selc = `<option value="${element.name}">${element.name}-S0${element.season}E0${element.number}</option>`
        select.innerHTML += selc
    }else{
      let selc = `<option value="${element.name}">${element.name}-S0${element.season}E${element.number}</option>`
        select.innerHTML += selc
    }
  }
};





// get value in input and use in search 
const serch =document.getElementById('search')
const word = serch.addEventListener("keydown" , function() {
  let input = this.value.toLowerCase();
  searchEpisode(input);
})

// get value in Drop Down and use in search
const drop =document.getElementById('DrapDown');
const drapInput = drop.addEventListener("change" , function(e) {
  let value = drop.value.toLowerCase();
// console.log(drop.value);
  if (value === 'allShow') {
    showEpisodes();
  } else {
    searchEpisode(value);
  }
})

//search 
function searchEpisode(word) {
  let elements = document.querySelectorAll('.card h5 ');

  for (i = 0; i < elements.length; i++) {
      if (!elements[i].textContent.toLowerCase().includes(word)) {
          elements[i].parentElement.parentElement.parentElement.style.display = "none";
      } else {
          elements[i].parentElement.parentElement.parentElement.style.display = "flex";
      }
  }
}
//Drop Down
function showEpisodes() {
  let elements = document.querySelectorAll('.card h5');

  for (i = 0; i < elements.length; i++) {
      elements[i].parentElement.parentElement.parentElement.style.display = "flex";
  }
}