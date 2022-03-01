const getphones = () => {
  // input text
  const inputText = document.getElementById("input-field");
  const inputValue = inputText.value.toLowerCase();
  // clear textfield
  inputText.value = "";
  // fetch api
  fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
};
// displayPhones functions
const displayPhones = (phones) => {
  const displayPhones = document.getElementById("display-phones");
  //   empty text fild after every serch
  displayPhones.textContent = "";
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
                <a href="#" class="btn btn-outline-info fw-bold">Explore More</a>
              </div>
            </div>`;
    displayPhones.appendChild(phoneDiv);
  });
};
