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
$(document).ready(function() {

  $('#select-all').click(function(event) {  //on click
      if(this.checked) { // check select status
          $('.check-box').each(function() { //loop through each checkbox
              this.checked = true;  //select all checkboxes with class "checkbox1"            
          });

      }else{
          $('.check-box').each(function() { //loop through each checkbox
              this.checked = false; //deselect all checkboxes with class "checkbox1"                    
          });      
      }
  });

});
// checkbox - select all