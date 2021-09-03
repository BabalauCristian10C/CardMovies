window.addEventListener("DOMContentLoaded",()=>{
   'use strict';
   //get info from json file
   const getReq = () => {
      const req = new XMLHttpRequest();

      req.addEventListener("readystatechange",() => {
         if (req.readyState === 4 && req.status === 200 && req.getResponseHeader("content-type") === "application/json"){  
            this.data = JSON.parse(req.responseText);     
         }
      })

      req.open("GET", "./dbHeroes/dbHeroes.json");
      req.setRequestHeader("Content-Type", "application/json");
      req.send();
   }
   getReq();
   const getImg = () =>{
      const req = new XMLHttpRequest();
      req.addEventListener("readystatechange",() => {
         if (req.readyState === 4 && req.status === 200){  
            this.imgLink = req.responseURL; 
         } 
      })
      req.open("GET", "./dbHeroes/dbImage");
      req.setRequestHeader("Content-Type", "arraybuffer");
      req.send();
   }
   getImg();
   const preloader = document.querySelector(".preloaderPage")
   document.body.style.cssText = "overflow-y:hidden !important;"
   function hide(delay = 100){
         const hiding = setTimeout(()=>{
            preloader.style.cssText = 'display:none; opacity:0';
            clearTimeout(hiding);
            document.body.style.cssText = "overflow-y:visible;"
         }, delay);
      }

   function display() {
      document.body.style.cssText = "overflow-y:hidden !important;"
      preloader.style.cssText = 'display:flex !important';
   }

   display();
   hide(3000);

   //rotate the cart from front to back
   const rotateAnim = () => {
      const cards = document.querySelectorAll(".card");
      const rotateinF = (target) =>{
         const cardB = target.querySelector(".card-back"),
               cardF = target.querySelector(".card-front");
         target.classList.remove("rotatein");
         target.classList.add("rotateout");
         setTimeout(()=>{
            cardB.classList.add("undisplayed-content");
            cardB.classList.remove("displayed-content");
            cardF.classList.remove("undisplayed-content");
            cardF.classList.add("displayed-content");
         },250)   
      }
      const rotateoutF = (target) => {
         const cardB = target.querySelector(".card-back"),
               cardF = target.querySelector(".card-front");
         target.classList.remove("rotateout");
         target.classList.add("rotatein");
         setTimeout(()=>{
            cardF.classList.add("undisplayed-content");
            cardF.classList.remove("displayed-content");
            cardB.classList.remove("undisplayed-content");
            cardB.classList.add("displayed-content");
         },250)
      }
      window.addEventListener('click', (event) => {
         let target = event.target;
         if (target.closest(".card")){
            while(!target.matches(".card")){
               target = target.offsetParent;
            }
            if(target.classList.contains("rotatein")){
               rotateinF(target);
            } else if(target.classList.contains("rotateout")){
               rotateoutF(target);
            }
         }
      })
   }
   rotateAnim();
   
   //create cards with classes
   class card {
      constructor(name,status,species,gender,bD,dD,movies,photo,realName, actors,citizenship){
         this.name = name;
         this.status = status;
         this.species = species;
         this.birthDay = bD;
         this.gender = gender;
         this.deathDay = dD;
         this.movies = movies;
         this.photo = photo.replace(/dbimage\/([\w\d%+.\s=-]*)\/?/i, (match, val1) => {return val1});;
         this.realName = realName;
         this.actors = actors;
         this.citizenship = citizenship;
         this.htmlcode;
      }

      testlog(){
         return this.photo
      }

      createInside(workingPlatf, th){
         const cardName = document.createElement('div'),
            cardPicture = document.createElement('div');
         cardName.classList.add("card-name");
         cardPicture.classList.add("card-image");
         cardName.innerHTML = `<h1>${th.name}</h1>`;
         cardPicture.innerHTML = `<img src="${imgLink}${th.photo}" alt="" srcset="">`
         workingPlatf.appendChild(cardName);
         workingPlatf.appendChild(cardPicture);
      }
      createBack(workingPlatf,th){
         const sName = document.createElement('span'),
               sActors = document.createElement('span'),
               sCitizenship = document.createElement('span'),
               sGender = document.createElement('span'),
               sMovies = document.createElement('span'),
               sRealName = document.createElement('span'),
               sStatus = document.createElement('span'),
               sSpecies = document.createElement('span'),
               sBirthDay = document.createElement('span'),
               sDeathDay = document.createElement('span');
         let moviess = '';
         if (th.movies !== "unknown"){
            th.movies.forEach((i)=>{
               moviess+= i + " | ";
            })   
         } else {
            moviess = 'No current Data';
         }
         sName.insertAdjacentHTML("afterbegin", `<span class="species"><span class = "spanTitle"> <h4>Name :</h4> <span>${th.name}</span>`);
         sActors.insertAdjacentHTML("afterbegin", `<span class="species"><span class = "spanTitle"> <h4>Actor :</h4> <span>${th.actors}</span>`);
         sCitizenship.insertAdjacentHTML("afterbegin", `<span class="species"><span class = "spanTitle"> <h4>Citizenship :</h4> <span>${th.citizenship}</span>`);
         sGender.insertAdjacentHTML("afterbegin", `<span class="species"><span class = "spanTitle"> <h4>Gender :</h4> <span>${th.gender}</span>`);
         sMovies.insertAdjacentHTML("afterbegin", `<span class="movieListing"><span class = "spanTitle"> <h4>Movies :</h4> <span>${moviess}</span>`);
         sRealName.insertAdjacentHTML("afterbegin", `<span class="species"><span class = "spanTitle"> <h4>Real Name :</h4> <span>${th.realName}</span>`);
         sStatus.insertAdjacentHTML("afterbegin", `<span class="species"><span class = "spanTitle"> <h4>Status :</h4> <span>${th.status}</span>`);
         sSpecies.insertAdjacentHTML("afterbegin", `<span class="species"><span class = "spanTitle"> <h4>Species :</h4> <span>${th.species}</span>`);
         sBirthDay.insertAdjacentHTML("afterbegin", `<span class="species"><span class = "spanTitle"> <h4>Born Day :</h4> <span>${th.birthDay}</span>`);
         sDeathDay.insertAdjacentHTML("afterbegin", `<span class="species"><span class = "spanTitle"> <h4>Death Day :</h4> <span>${th.deathDay}</span>`);
         workingPlatf.append(sName);
         workingPlatf.append(sRealName);
         workingPlatf.append(sActors);
         workingPlatf.append(sCitizenship);
         workingPlatf.append(sBirthDay);
         workingPlatf.append(sDeathDay);
         workingPlatf.append(sSpecies);
         workingPlatf.append(sMovies);
         workingPlatf.append(sStatus);
         workingPlatf.append(sGender);


      } 
      createDiv(callback){
         const cover = document.createElement('div'), //col
            child1 = document.createElement('div'), //card
            child2dot1 = document.createElement('div'), //front card
            child2dot2 = document.createElement('div'); //back card

         cover.className = "col-lg-3 col-md-6 col-sm-6";
         child1.className = "card rotateout";
         child2dot1.className = "card-front displayed-content";
         child2dot2.className = "card-back undisplayed-content";
         child1.id = this.name.toLowerCase().replace(/\s/,"");
         child1.appendChild(child2dot1);
         child1.appendChild(child2dot2);
         cover.appendChild(child1);

         callback(child2dot1, this);
         this.createBack(child2dot2,this);
         this.htmlcode = cover;
      }

      createItSelf(){
         this.createDiv(this.createInside)
      }
   }
   
   let movieList = new Set(),
      cardList = new Array();
   const createCard = (objact=data) => {
          objact.forEach((val,key) => {
             const {dD = "unknown", bD= "unknown",movies = "unknown",name = "unknown",actors = "unknown",realName = "unknown", photo = "unknown", species = "unknown",gender = "unknown", status = "unknown",citizenship = "unknown"} = val;
             if(movies!=="unknown"){
               movies.forEach((i)=>{
                  movieList.add(i)
               })
             }

             const cardN = new card(name,status,species,gender,bD,dD,movies,photo,realName, actors,citizenship);
             cardN.createItSelf();

             cardList.push(cardN);
          })
       }

   setTimeout(createCard, 2000)
   //display card function

   const displayCard = (filter="default") =>{
      const place = document.getElementsByClassName("row")[1];
      if(filter === "default"){
         cardList.forEach((i)=>{
            place.append(i.htmlcode)
         })
      } else if (filter !== "None"){
         place.innerHTML= ""
         cardList.forEach((i)=>{
            if(i.movies!=="unknown"){
               i.movies.forEach((movie)=>{
                  if(movie === filter){
                     place.append(i.htmlcode)
                  }
               })
            }

         })
      }
   }

   setTimeout(displayCard, 2500)

   //filter function 

   const filtering = () =>{
      const selectingModule = document.querySelector("#movie");
      movieList.forEach((item)=>{
         const el = document.createElement('option');
         el.textContent = item;
         el.value = item;
         selectingModule.append(el);
      })

      selectingModule.addEventListener('change', (e)=>{
         const target = e.target.value;
         display();
         hide(1000);
         console.log(target)
         displayCard(target);
      })
   };
   setTimeout(filtering, 3000)
})
