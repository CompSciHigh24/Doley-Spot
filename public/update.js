console.log("update.js running");

const deleteBtn = document.querySelectorAll(".delete");

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", () => {
    // console.log(deleteBtn[i].dataset.id);
    fetch("/clothes/" + deleteBtn[i].dataset.id, {
      method: "DELETE",
    }).then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        window.location.href = "/admin";
      }
    });
  });
}

const updateBtn = document.querySelectorAll(".update");

for (let i = 0; i < updateBtn.length; i++) {
  updateBtn[i].addEventListener("submit", (e) => {
    e.preventDefault();
    const itemData = new FormData(updateBtn[i]);
    const reqBody = Object.fromEntries(itemData);

    fetch("/clothes/" + updateBtn[i].dataset.elephant, {
      method: "PATCH",
      body: JSON.stringify(reqBody),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((response) => {
      console.log(response)
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        window.location.href = "/clothes";
      }
    });
  });
}
