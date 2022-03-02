const getphones = () => {
  // input text
  const searchInput = document.getElementById("input-field");
  const inputText = searchInput.value;
  const InputValue = inputText.toLowerCase();
  // clear textfield
  searchInput.value = "";
  // fetch api
  fetch(`https://openapi.programming-hero.com/api/phones?search=${InputValue}`)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data, inputText));
};
// displayPhones functions
const displayPhones = (phones, searchValue) => {
  const phoneDisplay = document.getElementById("display-phones");
  const resultDiv = document.getElementById("result-text");
  const dtailDiv = document.getElementById("show-dtails");
  //   empty text fild after every search
  phoneDisplay.textContent = "";
  //   empty result field after every search
  resultDiv.textContent = "";
  //   empty dtails field after every search
  dtailDiv.textContent = "";

  if (phones.length > 0) {
    // search result number show in UI
    const resultText = document.createElement("div");
    resultText.innerHTML = `<p class="text-success">${phones.length} results found for ${searchValue} </p>`;
    resultDiv.appendChild(resultText);
  } else {
    //no search results found show in UI
    const resultText = document.createElement("div");
    resultText.innerHTML = `<p class="text-danger">No results found for <span class="fw-bold fs-5"> ${searchValue} </span></p>`;
    resultDiv.appendChild(resultText);
  }
  // 20 results condition
  if (phones.length > 19) {
    const phoneQuantity = phones.slice(0, 20);
    phoneQuantity.forEach((phone) => {
      const phoneDiv = document.createElement("div");
      phoneDiv.classList.add("col");
      phoneDiv.innerHTML = `
      <div class="card shadow-sm">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto my-3" alt="..." />
                <div class="card-body">
                  <h5 class="card-title fw-bold">${phone.phone_name}</h5>
                  <p class="card-text">
                  <span class="fw-bold">Brand : </span>${phone.brand}
                  </p>
                  <a onclick="getApiId('${phone.slug}')" href="#" class="btn btn-outline-info fw-bold shadow-sm">Explore More</a>
                </div>
              </div>`;
      phoneDisplay.appendChild(phoneDiv);
    });
  } else {
    phones.forEach((phone) => {
      const phoneDiv = document.createElement("div");
      phoneDiv.classList.add("col");
      phoneDiv.innerHTML = `
      <div class="card shadow-sm">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto my-3" alt="..." />
                <div class="card-body">
                  <h5 class="card-title fw-bold">${phone.phone_name}</h5>
                  <p class="card-text">
                  <span class="fw-bold">Brand : </span>${phone.brand}
                  </p>
                  <a onclick="getApiId('${phone.slug}')" href="#" class="btn btn-outline-info fw-bold shadow-sm">Explore More</a>
                </div>
              </div>`;
      phoneDisplay.appendChild(phoneDiv);
    });
  }

  // for each for phones
};
// call dtails api by id
const getApiId = (dtailsId) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${dtailsId}`)
    .then((res) => res.json())
    .then((data) => displayDtails(data.data));
};
// show dtails is UI
const displayDtails = (dtails) => {
  const dtailsDiv = document.createElement("div");
  const dtailsContainer = document.getElementById("show-dtails");
  dtailsDiv.classList.add("card");
  // releaseDate error
  let relese = dtails.releaseDate;
  if (relese == "") {
    relese = "No relese date found";
  }

  dtailsDiv.innerHTML = `
 <img class="w-50 mx-auto my-3" src="${
   dtails.image
 }" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">
    <p class="fs-4 fw-bold">${dtails.name}</p>
    <p>${relese}</p>
    <p><span class="fw-bold">Storage : </span>${dtails.mainFeatures.storage}</p>
    <p><span class="fw-bold">Chipset : </span>${dtails.mainFeatures.chipSet}</p>
    <p><span class="fw-bold">Memory : </span>${dtails.mainFeatures.memory}</p>
    <p><span class="fw-bold">Display : </span>${
      dtails.mainFeatures.displaySize
    }</p>
    <p><span class="fw-bold">Sensors : </span>${dtails.mainFeatures.sensors.join(
      " , "
    )}</p>
    <p><span class="fw-bold">Others : </span>
    <li> WLan : ${dtails.others?.WLAN ? dtails.others.WLAN : "No Info"}</li>
    <li> Bluetooth : ${
      dtails.others?.Bluetooth ? dtails.others.Bluetooth : "No Info"
    }</li>
    <li> Gps : ${dtails.others?.GPS ? dtails.others.GPS : "No Info"}</li>
    <li> NFC : ${dtails.others?.NFC ? dtails.others.NFC : "No Info"}</li>
    <li> Radio : ${dtails.others?.NFC ? dtails.others.Radio : "No Info"}</li>
    </p>
    </p>
  </div>`;

  dtailsContainer.appendChild(dtailsDiv);
};
