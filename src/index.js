(async function () {
  async function fetchData() {
    let data = await fetch("./mockData/data.json");
    data = await data.json();
    return data;
  }
  let data = await fetchData();

  const employeeList = document.querySelector(".employee__name--list");
  const employeeinfo = document.querySelector(".employee__sigle--info");
  const addEmployee = document.querySelector(".addEmplyee__Button");
  const showAddEmployee = document.querySelector(".employee__add");
  const submitEmployee = document.querySelector(".employee--addForm");
  addEmployee.addEventListener("click", (e) => {
    showAddEmployee.style.display = "flex";
  });

  showAddEmployee.addEventListener("click", (e) => {
    if (e.target.className == "employee__add") {
      showAddEmployee.style.display = "none";
    }
  });

  let selectedEmployee = data[0];
  function renderEmployee() {
    employeeList.innerHTML = "";
    data.forEach((employee) => {
      const newEmployee = document.createElement("span");
      if (employee.id === selectedEmployee.id) {
        newEmployee.classList.add("selected");
      }
      newEmployee.classList.add("emplpyee__name--item");
      newEmployee.setAttribute("id", employee.id);
      newEmployee.innerHTML = `${employee.firstName} ${employee.lastName} <i class="employeeDelete" id="${employee.id}">x</i>`;
      employeeList.append(newEmployee);
    });
  }

  function renderInfoDetails() {
    employeeinfo.innerHTML = `<img class="employee__single--image" src="./asset/avatar.jpg">
     <span>${selectedEmployee.firstName} ${selectedEmployee.lastName} </span>
    `;
  }

  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName == "SPAN") {
      selectedEmployee = data.find((item) => item.id === parseInt(e.target.id));
      renderInfoDetails();
      renderEmployee();
    }
    if (e.target.tagName == "I") {
      data = data.filter((item) => item.id != e.target.id);
      renderEmployee();
    }
  });

  submitEmployee.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(submitEmployee);
    const values = [...formData.entries()];
    const newEmployee = values.reduce((acc, item) => {
      return { ...acc, [item[0]]: item[1] };
    }, {});
    newEmployee.id = data[data.length - 1].id + 1;
    data.push(newEmployee);
    selectedEmployee = newEmployee;
    renderEmployee();
    renderInfoDetails();
    showAddEmployee.style.display = "none";
  });

  renderEmployee();
  renderInfoDetails();
})();
