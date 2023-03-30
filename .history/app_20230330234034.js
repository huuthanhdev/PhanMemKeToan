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

// Popup
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

// checkbox - select all
  function checkAll(baseId, itemId) {
    var baseCheck = document.getElementById(baseId).checked;
    var item = document.getElementById(itemId + '1');
    var i = 1;
     
    while (item != null) {
      if (item.disabled == false) {
        item.checked = baseCheck;
      }
      i = i + 1;
      item = document.getElementById(itemId + i);
    }
  }
// checkbox - select all