let arrow = document.querySelectorAll(".arrow");
  for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e)=>{
   let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
   arrowParent.classList.toggle("showMenu");
    });
  }
  let sidebar = document.querySelector(".sidebar");
  let sidebarBtn = document.querySelector(".bx-menu");
  console.log(sidebarBtn);
  sidebarBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });
  
  function checkAll(o) {
    var boxes = document.getElementsByTagName("input");
    for (var x = 0; x < boxes.length; x++) {
      var obj = boxes[x];
      if (obj.type == "checkbox") {
        if (obj.name != "check")
          obj.checked = o.checked;
      }
    }
  }

  function deleteRow(tableId)  {
    var table = document.getElementById(tableId).tBodies[0];
    var rowCount = table.rows.length;

    // var i=1 to start after header
    for(var i=1; i<rowCount; i++) {
        var row = table.rows[i];
        // index of td contain checkbox is 8
        var chkbox = row.cells[0].getElementsByTagName('input')[0];
        if('checkbox' == chkbox.type && true == chkbox.checked) {
            table.deleteRow(i);
         }
    }
}