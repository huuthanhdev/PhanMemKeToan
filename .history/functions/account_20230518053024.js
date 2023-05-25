function openForm() {
  document.getElementById("accountForm").style.display = "block";
}

function closeForm() {
  document.getElementById("accountForm").style.display = "none";
}

// document.getElementById("btnSave").onclick=function()
// {
//     document.getElementById("accountTable").style.display="block";
    
//     var table = document.getElementById("accountTable");
//     var row = table.insertRow(-1);
//     var check = row.insertCell(0);
//     var accountId = row.insertCell(1);
//     var accountName = row.insertCell(2);
//     var accountLevel = row.insertCell(3);
//     let checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         check.append(checkbox);
//     accountId.innerHTML = document.getElementById("accountId").value;
//     accountName.innerHTML = document.getElementById("accountName").value;
//     accountLevel.innerHTML = document.getElementById("accountLevel").value;
    
//     return false;
// }

function doSearch() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("accountTable");
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