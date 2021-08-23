let chuckImgVal = document.querySelector(".chuckImg");
let chuckJokeVal = document.querySelector(".chuckJoke");
let updateJokeVal = document.querySelector(".updateJoke");
let jokesCategoryQuery = "";
let jokesCategorySelectVal = document.querySelector("#jokesCategorySelect");
let jokesApi = "https://api.chucknorris.io/jokes/random";

// Function to Retrieve a random chuck joke
let chuckJokes = () => {
  fetch(jokesApi)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let icon_url = data.icon_url;
      let joke = data.value;
      chuckImgVal.src = icon_url;
      chuckJokeVal.innerHTML = joke;
    })
    .catch(() => {
      console.log("Something went wrong...");
    });
};

// Show Placeholders and display jokes on DOM
updateJokeVal.addEventListener("click", () => {
  chuckImgVal.src = "images/dancing-happy.gif";
  chuckJokeVal.innerHTML = "<span class='jokePlaceholder'>&nbsp;</span>";
  setTimeout(() => {
    chuckJokes();
  }, 1000);
  // console.log(jokesApi);
});

// Function to create an dropdown of available categories
let chuckJokesCategory = () => {
  fetch("https://api.chucknorris.io/jokes/categories")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dataVal = data;
      data.forEach((cat) => {
        // console.log(cat);
        const option = document.createElement("option");
        option.text = cat;
        option.value = cat;
        jokesCategorySelectVal.append(option);
      });
      // console.log(dataVal);
    })
    .catch(() => {
      console.log("Something went wrong...");
    });
};

// Function to change API to get jokes based on categories
let getCategoryJokes = () => {
  let jokesCategorySelectIndex = jokesCategorySelect.selectedIndex;
  let optionVal =
    document.getElementsByTagName("option")[jokesCategorySelectIndex].value;
  jokesCategoryQuery = "?category=" + optionVal;
  jokesApi = "https://api.chucknorris.io/jokes/random" + jokesCategoryQuery;
  return jokesCategoryQuery;
};

// Event to get jokes on dropdown select
jokesCategorySelectVal.addEventListener("change", () => {
  chuckImgVal.src = "images/dancing-happy.gif";
  chuckJokeVal.innerHTML = "<span class='jokePlaceholder'>&nbsp;</span>";
  setTimeout(() => {
    getCategoryJokes();
    chuckJokes();
  }, 1000);
});

// creating dropdown and displaying jokes on windows load
window.addEventListener("load", () => {
  setTimeout(() => {
    chuckJokes();
  }, 1000);
  chuckJokesCategory();
});
