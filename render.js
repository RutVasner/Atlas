const getData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(url.status);
       if(data.status === 404|| data[0].name.common==="Palestine"){
        alert("country not found")
        return 
       }
        return data;
    } catch (error) {
        // alert(error);
        throw error; // יש לזרוק מחדש את השגיאה כדי שיוכלו לטפל בה פונקציות אחרות שמשתמשות בפונקציה זו
    }
}



const borders = async (border) => {
    console.log(border);

    const pEl = document.createElement("p");
    const borderData = await getData(`https://restcountries.com/v3.1/alpha?codes=${border}`)
console.log("borderData");
console.log(borderData);
    pEl.innerHTML = border.map(b => {
        console.log("map")
        console.log(b)
        const index = borderData.findIndex(country => country.cca3 === b);
        console.log(index)
        return `<a class="borclick">${borderData[index].name.common}</a>` || `<p>${"there is no borders"}</p>`
    }).join("")
    console.log(pEl);
    return pEl;
}

const showData = async (country, content) => {

    try {
        const data = await getData(`https://restcountries.com/v3.1/name/${country}/?fields=name,flags,maps,population,languages,capital,borders,latlng`)

        console.log(data);
        content.innerHTML = `<div class=" d-flex flex-column  ">
        <div class="d-flex justify-content-around bg-white align-center p-3  ">
        <div class="">
            <p>Name:${data[0].name.common}</p>
            <p>Capital:${data[0].capital}</p>
            <p>language: ${Object.keys(data[0].languages).map(key => data[0].languages[key])}</p>
            <p>population:${data[0].population.toLocaleString()}</p>
            <p display="inline-block">Border-Countries:<span class="spanborder"></span> </p>
        </div>
        <div>
            <img src="${data[0].flags.png}" style="border:2px solid black" />
        </div>
    </div>
    <div class="Mymap">
            <iframe width="900px" height="300px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
            src="https://maps.google.com/maps?q=${data[0].latlng[0]},${data[0].latlng[1]}&hl=es&z=5&amp;output=embed">
            </iframe>
           </div>      
    </div>
    
    `
        console.log("ארטטטטט")

        const bor = document.querySelector(".spanborder");
        console.log(bor);
        bor.append(await borders(data[0].borders));
        console.log("bor");
        console.log(bor);
        const abor = document.querySelectorAll(".borclick")

        console.log("getdataborders");
        console.log(abor);
for (let index = 0; index < abor.length; index++) {
    // const element = array[index];
    console.log(abor[index].textContent);
        abor[index].addEventListener("click", () => {  showData(abor[index].textContent, content) })
}
        return content
    } catch (error) {
        console.error(error);
    }
}


const cardRender = async (country, content) => {
    try {
        const data = await getData(`https://restcountries.com/v3.1/name/${country}/?fields=name,flags`)
        // const colEL = document.createElement("div");
        // colEL.className = "p-1 content";
        const cardEl = document.createElement("div");
        cardEl.className = "cardclick  card p-1 shadow w-50";
        cardEl.innerHTML = `
        <h1>${data[0].name.common}</h1>
        <img src="${data[0].flags.png}">
        `
        // const cardclick = document.querySelector(".cardclick")
        cardEl.addEventListener("click", () => showData(country, content))
        console.log(cardEl);
        console.log(content);
        // colEL.append(cardEl)
        content.appendChild(cardEl);
        // return cardEl;
    } catch (error) {
        console.error(error);

    }
}

export { showData, getData, cardRender }