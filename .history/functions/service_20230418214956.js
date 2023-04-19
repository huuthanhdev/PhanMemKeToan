function openForm() {
  document.getElementById("serviceForm").style.display = "block";
}

function closeForm() {
  document.getElementById("serviceForm").style.display = "none";
}

document.getElementById("btnSave").onclick=function()
{
    document.getElementById("serviceTable").style.display="block";
    
    var table = document.getElementById("serviceTable");
    var row = table.insertRow(-1);
    var check = row.insertCell(0);
    var serviceId = row.insertCell(1);
    var serviceName = row.insertCell(2);
    var serviceDesc = row.insertCell(3);
    var serviceType = row.insertCell(4);
    var servicePrice = row.insertCell(5);
    let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        check.append(checkbox);
    serviceId.innerHTML = document.getElementById("serviceId").value;
    serviceName.innerHTML = document.getElementById("serviceName").value;
    serviceDesc.innerHTML = document.getElementById("serviceDesc").value;
    serviceType.innerHTML = document.getElementById("serviceType").value;
    price.innerHTML = document.getElementById("servicePrice").value;
    
    return false;
}

function doSearch() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("serviceTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }