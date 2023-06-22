let form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let title = document.querySelector("#title").value;
  let price = document.querySelector("#price").value;
  let description = document.querySelector("#description").value;

  const response = await fetch(
    `https://source.unsplash.com/random/900×700/?${title}`
  );

  let products = {
    title,
    price,
    description,
    image: response.url,
  };

  const result = await fetch(
    `https://loginjs-ec3df-default-rtdb.firebaseio.com/products.json`,
    {
      method: "POST",
      body: JSON.stringify(products),
    }
  );

  getData();
});

onload = getData;
async function getData() {
  let response = await fetch(
    `https://loginjs-ec3df-default-rtdb.firebaseio.com/products.json`
  );

  let data = await response.json();

  let products = [];

  for (let key in data) {
    data[key].id = key;
    products.push(data[key]);
  }

  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  products.forEach((item, index) => {
    let tr = document.createElement("tr");

    let indexCell = document.createElement("th");
    indexCell.setAttribute("scope", "row");
    indexCell.textContent = index + 1;
    tr.appendChild(indexCell);

    let titleCell = document.createElement("td");
    titleCell.textContent = item.title;
    tr.appendChild(titleCell);

    let imageCell = document.createElement("td");
    let image = document.createElement("img");
    image.setAttribute("src", item.image);
    imageCell.appendChild(image);
    tr.appendChild(imageCell);

    let priceCell = document.createElement("td");
    priceCell.textContent = item.price + "$";
    tr.appendChild(priceCell);

    let deleteCell = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      Delete(item.id);
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })  
    });
    deleteCell.appendChild(deleteButton);
    tr.appendChild(deleteCell);

    let updateCell = document.createElement("td");
    let updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", () => {
      Update(item.id);
    });
    updateCell.appendChild(updateButton);
    tr.appendChild(updateCell);

    tbody.appendChild(tr);
  });
}

async function Delete(id) {
  let response = await fetch(
    `https://loginjs-ec3df-default-rtdb.firebaseio.com/products/${id}.json`,
    {
      method: "DELETE",
    }
  );

  getData();
}
