const getphones = () => {
  // input text
  const inputText = document.getElementById("input-field");
  const inputValue = inputText.value;
  const searchInput = inputValue.toLowerCase();
  // clear textfield
  inputText.value = "";
  // fetch api
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInput}`)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data, inputValue));
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

  // for each for phones
  phones.forEach((phone) => {
    // console.log(phone);
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
};
// call dtails api by id
const getApiId = (dtailsId) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${dtailsId}`)
    .then((res) => res.json())
    .then((data) => displayDtails(data.data));
};
// show dtails is UI
const displayDtails = (dtails) => {
  console.log(dtails);
  const dtailsDiv = document.createElement("div");
  const dtailsContainer = document.getElementById("show-dtails");
  dtailsDiv.classList.add("card");
  dtailsDiv.innerHTML = `
 <img class="w-50 mx-auto my-3" src="${dtails.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">
    <p class="fs-4 fw-bold">${dtails.name}</p>
    <p>${dtails.releaseDate}</p>
    <p><span class="fw-bold">storage : </span>${dtails.mainFeatures.storage}</p>
    <p><span class="fw-bold">Chipset : </span>${dtails.mainFeatures.chipSet}</p>
    <p><span class="fw-bold">Memory : </span>${dtails.mainFeatures.memory}</p>
    <p><span class="fw-bold">Display : </span>${dtails.mainFeatures.displaySize}</p>
    </p>
  </div>`;
  dtailsContainer.appendChild(dtailsDiv);
};
