import { showData, cardRender, getData } from "./render.js";
const mainCountries = ["israel", "usa", "United Kingdom", "france", "spain"];
const navbarItem = document.querySelectorAll(".nav-link");
const content = document.querySelector(".content")
const input = document.querySelector(".input")
const inputBtn = document.querySelector(".inputBtn")
const navBtn = document.querySelector(".navBtn")
const flags = document.querySelector(".flags")

const render = async (mainCountries, content) => {
    console.log("render");
    content.innerText = "";
    mainCountries.map(country => cardRender(country, content));
    console.log("render2");

    const cards = document.querySelectorAll(".cardclick")
    console.log(cards);
    for (let index = 0; index < cards.length; index++) {
        console.log("cards[index]");
        console.log(cards[index]);
        // cards[index].addEventListener("click", () => showData())
    }
}
//nav-bar
inputBtn.addEventListener("click", () => showData(input.value, content))
try {
    navBtn.addEventListener("click", () => { render(mainCountries, content) })
}
catch {
    // alert("country not found")
}

for (let index = 0; index < navbarItem.length; index++) {
    navbarItem[index].innerText = mainCountries[index];
    navbarItem[index].addEventListener("click", () => showData(event.target.innerText, content))
}
console.log(getData(`https://restcountries.com/v3.1/name/israel`))
render(mainCountries, content)
// console.log(getFlag().data)



const getFlag = async (flags) => {
    const data = await getData(`https://restcountries.com/v3.1/all/?fields=name,flags`)
    const div = document.createElement("div");
    div.classList.add("d-flex", "justify-content-between")

    console.log(data[0].flags.png);

    for (let i = 0; i < 22; i++) {
        const index = Math.floor(Math.random() * 250)
        div.innerHTML += `
        <img class="imgFlag  border-black border" style="height:30px; width:70px;" src="${data[index].flags.png}" alt="${data[index].name.common}"/>`
    }
    console.log(div);
    flags.appendChild(div)
    const imgFlag = document.querySelectorAll(".imgFlag")
    console.log(imgFlag);
    for (let index = 0; index < imgFlag.length; index++) {
        console.log(imgFlag[index].alt);
        imgFlag[index].addEventListener("click", () => showData(imgFlag[index].alt, content))
    }

    // return div;
}

getFlag(flags);

