// -----------form pop-up-------------
function openForm() {
  document.getElementById("customerForm").style.display = "block";
}
function openForm_Update() {
  document.getElementById("customerForm_Update").style.display = "block";
}

function closeForm() {
  document.getElementById("customerForm").style.display = "none";
}
function closeForm_Update() {
  document.getElementById("customerForm_Update").style.display = "none";
  // returnPage();
}
//------------event back history------------
function returnPage(){
  history.back();
}

// --------------------DELETE CUSTOMER (*modified by HT)
function delete_record(obj, customerId){
  var req = new XMLHttpRequest();

  req.open("GET", "/danhmuc/khachhang-delete?customerId="+customerId, true);
  req.send();

  req.onreadystatechange = function(){
    if(req.readyState == 4 && req.status == 200){
      document.getElementById("response").innerText = req.responseText;
      obj.parentElement.parentEleement.remove();
    }
  };
}

// -------------Tìm kiếm -----------------
function doSearch() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("customerTable");
    tr = table.getElementsByTagName("tr");
    
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      td2 = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
      if (td2) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
          responseText="Không tìm thấy?";
        }
      }       
    }
  }

  
  function doUpdate() {
    
    document.getElementById("customerForm")
    var table = document.getElementById("customerTable").tBodies[0];
    var rowCount = table.rows.length;

    for(var i=1; i<rowCount; i++) {
        var row = table.rows[i];
        var objCells = table.rows.item(i).cells;
        var chkbox = row.cells[0].getElementsByTagName('input')[0];
        if('checkbox' == chkbox.type && true == chkbox.checked) {
          for (var j = 0; j < objCells.length; j++){
            document.getElementsById('customerId').innerHTML = objCells.item(j).innerHTML
          }
           //= "abc";
          //row.cells[1].getElementsById('customerId').value;
          // document.getElementById("customerForm").customerName.t = row.cells[2].getElementsById('customerName').value;
          // document.getElementsById('phone').innerHTML= row.cells[3].getElementsById('phone').value;
          // document.getElementsById('email').value= row.cells[4].getElementsById('email').value;
          // document.getElementsById('taxId').value= row.cells[5].getElementsById('taxId').value;
          // document.getElementsById('address').value= row.cells[6].getElementsById('address').value;
          // document.getElementsById('taxId').value= row.cells[5].getElementsById('taxId').value;

          //form.getElementsById('customerId').value.append(row.cells[1].getElementsById('customerId').value);
          table.deleteRow(i);
          document.getElementById("customerForm").style.display = "block";
         }
    }
  }

function showCustomTable(){

  var connection = new ActiveXObject("ADODB.Connection");  
  var connectionstring = "Data Source=.;Initial Catalog=KeToanDoanhThu;Persist Security Info=True;User ID=sa;Password=****;Provider=SQLOLEDB";  
  connection.Open(connectionstring);  
  var rs = new ActiveXObject("ADODB.Recordset");  
  rs.Open("select * from tblDMKH ", connection);  
  rs.MoveFirst();  
  var table = document.getElementById("customerTable");
      var row = table.insertRow(-1);
      var check = row.insertCell(0);
      var customerId = row.insertCell(1);
      var customerName = row.insertCell(2);
      var phone = row.insertCell(3);
      var email = row.insertCell(4);
      var taxId = row.insertCell(5);
      var address = row.insertCell(6);
      var cusomerType = row.insertCell(7);
      
  while (!rs.eof)  
  {
    let checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          check.append(checkbox);
      customerId.innerHTML = rs.fields(0);
      customerName.innerHTML = rs.fields(1);
      phone.innerHTML = rs.fields(3);
      email.innerHTML = "_";
      taxId.innerHTML = rs.fields(5);
      address.innerHTML = rs.fields(2);
      cusomerType.innerHTML = rs.fields(4);
      rs.MoveNext();  
  }  
  rs.close();  
  connection.close();
}
   

    
   