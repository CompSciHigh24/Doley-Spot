
  
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemData = new FormData(form);
  const reqBody = Object.fromEntries(itemData);
  console.log(reqBody)
  fetch("/clothes", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    } else {
      window.location.href = "/";
    }
  });
});

deleteBtn.addEventListener("click", (e)=>{
  console.log("Button clicked")
})