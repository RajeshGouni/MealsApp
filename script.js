//select DOM
const searchInput=document.querySelector('.search-input');
const mealList = document.querySelector('.search-list');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const mealDetailsContent = document.querySelector('.meal-details-content');
const mealDetails=document.querySelector('.meal-details');
const searchList=document.querySelector('.search-list');
const myFavoriteMeals = document.querySelector('.favourite-btn'); 

let favouriteArray=[];

// Check if favoriteArray exists in localStorage, otherwise initialize it
if (!localStorage.getItem("favouriteArray")) {
    localStorage.setItem("favouriteArray", JSON.stringify(favouriteArray));
  } else {
    favouriteArray = JSON.parse(localStorage.getItem("favouriteArray"));
  }
  
//Adding EventListeners
recipeCloseBtn.addEventListener('click', () => {
    searchList.classList.remove('hide-list');
    mealDetails.classList.add('hide-list');
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
myFavoriteMeals.addEventListener('click', displayFavoriteMeals); // Favorite meals button click event


// it fetches meals from api and return it
async function fetchList(searchTerm){
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    const res = await fetch(`${url}`);
    const data = await res.json();
    displayList(data.meals);
    
}

function mealSuggestions(){
    let searchTerm=(searchInput.value).trim() ;
    if(searchTerm.length>0){
        mealList.classList.remove('hide-list');
        fetchList(searchTerm);
    } else{

        mealList.classList.add('hide-list');

    }
}
// dynamically displays the searched meals
function displayList(meal){
    mealList.innerHTML= "";

    for(let idx = 0 ; idx < meal.length ; idx++){

        let searchItem = document.createElement('div');
        searchItem.dataset.id = meal[idx].idMeal;
        searchItem.classList.add('search-result');
            poster = meal[idx].strMealThumb
            
        searchItem.innerHTML = 
                   `
                    <img  src="${poster}" alt="">
                    <h1 class="title">${meal[idx].strMeal}</h1>
                    <button  class = "recipe-btn"   onclick="showMealDetails(${meal[idx].idMeal})"  >Get  Recipe</button> 
                    <button class="favourite" onclick="addRemoveToFavList(${meal[idx].idMeal})"><i class="fa-solid fa-heart fa-2xl" ></i></button>
                
                    `
        mealList.appendChild(searchItem);
        
    }
   
    
}

//it  shows full meal details in main
 async function showMealDetails(id){
    console.log(id);

    searchList.classList.add('hide-list');
    mealDetails.classList.remove('hide-list');
            const result = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const details = await result.json();
            console.log(details);
            
            let meals=details.meals[0];
            
            let html = `
            <h2 class = "recipe-title">${meals.strMeal}</h2>
            <p class = "recipe-category">${meals.strCategory}</p>
            <div class="recipe-description">
                  <div class = "recipe-instruct">
                <h3>Instructions:</h3>
                <p>${meals.strInstructions}</p>
                  </div>
                  <div class = "recipe-meal-img">
                <img src = "${meals.strMealThumb}" alt = "">
                  </div>
              </div>
                  <div class = "recipe-link">
                <a href = "${meals.strYoutube}" target = "_blank">Watch Video</a>
                 </div>
        
        `;
        mealDetailsContent.innerHTML = html;
        mealDetailsContent.parentElement.classList.add('showRecipe');
}

//adding and removal from the favoiteArray
  function addRemoveToFavList(id) {
    let arr=JSON.parse(localStorage.getItem("favouriteArray"));
    let contain=false;
    for (let index = 0; index < arr.length; index++) {
        if (id==arr[index]) {
            contain=true;
        }
    }
    if (contain) {
        let number = arr.indexOf(id);
        arr.splice(number, 1);
        alert("your meal is  removed from your favourites Array");
    } else {
        arr.push(id);
        alert("your meal is added to your favourites Array");
    }
    localStorage.setItem("favouriteArray",JSON.stringify(arr));
  
}
//removing mealitem from favouriteArray
function removeElement(id) {
    let arr=JSON.parse(localStorage.getItem("favouriteArray"));
    let contain=false;
    for (let index = 0; index < arr.length; index++) {
        if (id==arr[index]) {
            contain=true;
        }
    }
    if (contain) {
        let number = arr.indexOf(id);
        arr.splice(number, 1);
        alert("your meal is  removed from your favourites Array");
       
       
    } 
    localStorage.setItem("favouriteArray",JSON.stringify(arr));
    console.log("here");
    displayFavoriteMeals();
}
//it  shows full meal details of favorite
async function displayFavoriteMeals() {
 
    console.log("here");
      mealList.innerHTML= "";
    let arr=JSON.parse(localStorage.getItem("favouriteArray"));
    if(arr.length==0){
        mealList.innerHTML=`<h1> list is Empty, go forward and explore. </h1>`;
    }
     
    
      for (let i=0; i<arr.length;i++) {
        
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${arr[i]}`);
        const data = await response.json();
        console.log(data);
        let mealItem=data.meals[0]
        let searchItem = document.createElement('div');
        searchItem.classList.add('search-result');
  
        searchItem.innerHTML = 
        `
         <img  src="${mealItem.strMealThumb}" alt="">
         <h1 class="title">${mealItem.strMeal}</h1>
         <button  class = "recipe-btn"   onclick="showMealDetails(${mealItem.idMeal})"  >Get  Recipe</button> 
         <button class="favourite" onclick="removeElement(${mealItem.idMeal})"><i class="fa-solid fa-heart fa-2xl" ></i></button>
     
         `
      mealList.appendChild(searchItem);
      
      }
      
  }







































