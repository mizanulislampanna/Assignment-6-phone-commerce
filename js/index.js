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
  //   empty text fild after every search
  phoneDisplay.textContent = "";
  //   empty result field after every search
  resultDiv.textContent = "";

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
    console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card shadow-sm">
              <img src="${phone.image}" class="card-img-top w-50 mx-auto my-3" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                <span class="fw-bold">Brand : </span>${phone.brand}
                </p>
                <a href="#" class="btn btn-outline-info fw-bold shadow-sm">Explore More</a>
              </div>
            </div>`;
    phoneDisplay.appendChild(phoneDiv);
  });
};
