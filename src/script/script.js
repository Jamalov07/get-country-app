"use strict";

let them = document.querySelector("#them");
let header = document.querySelector("header");

them.addEventListener("input", (e) => {
  localStorage.setItem("them", e.target.checked);
  changeMode(e.target.checked);
});

function changeMode(check) {
  let mode = localStorage.getItem("them");
  console.log(typeof mode, mode, check);
  console.log(mode == "false");
  if (mode == "false") {
    console.log(1111);
    document.body.classList.toggle("text-white");
    document.body.style.backgroundColor = "#202c36";
    // document.body.style.cssText = "background-color:#202c36; color:#fff;";
    header.style.backgroundColor = "#2B3844";
    header.classList.remove("text-black");
    header.classList.add("text-white");
    document.body.classList.remove("text-black");
    document.body.classList.add("text-white");
  } else {
    document.body.classList.toggle("text-white");
    document.body.style.backgroundColor = "#F2F2F2";
    header.style.backgroundColor = "#ffffff";
    // document.body.style.cssText = "background-color:#f2f2f2; color:#000;";
    header.classList.remove("text-white");
    header.classList.add("text-black");
    document.body.classList.remove("text-white");
    document.body.classList.add("text-black");
  }
}

changeMode();

// ================= Dynamic Card Mode =================

let baseUrl = "https://restcountries.com/v2/all";
let wrapperCards = document.querySelector(".card__wrapper");

const getAllCountries = async () => {
  wrapperCards.innerHTML =
    "<div class='flex text-center mr-10 items-center justify-center w-screen'><span class='loader'></span></div>";
  try {
    const response = await fetch(baseUrl);
    const result = await response.json();
    if (response.status === 200) {
      renderCards(result);
    }
    return result;
  } catch (error) {
    console.log("Error message", error);
  }
};

getAllCountries();

// =========== render cards ============

async function renderCards(cards) {
  console.log(await cards);
  wrapperCards.innerHTML = "";
  cards.forEach((element) => {
    const card = createElement(
      "div",
      "rounded-[5px] shadow-lg bg-white max-w-sm w-[264px] min-h-[336px]",
      `<a href="#!">
     <img
       class="rounded-t-lg w-full h-[160px]"
       src="${element.flags.svg}"
       alt=""
     />
   </a>
   <div class="p-6 pb-7">
     <h5 class="text-gray-900 text-xl font-medium mb-2">
       ${element.name}
     </h5>

     <ul class="list-none">
       <li><strong>Population: </strong>${element.population}</li>
       <li><strong>Region: </strong>${element.region}</li>
       <li><strong>Capital: </strong>${element.capital}</li>
     </ul>
   </div>`
    );
    wrapperCards.append(card);
  });
}
