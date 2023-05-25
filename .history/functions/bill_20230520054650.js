function openForm() {
    document.getElementById("billForm").style.display = "block";
  }
  
function closeForm() {
  document.getElementById("billForm").style.display = "none";
}
function closeForm_View() {
  document.getElementById("billForm_View").style.display = "none";
}

function openForm_View() {
  document.getElementById("billForm_View").style.display = "block";
  // returnPage();
}
function returnPage(){
  history.back();
}

function calc(){
  var SoLuong = document.getElementById('serviceNumber').value;
  var DonGia = document.getElementById('servicePrice').value;
  var ThueSuat = document.getElementById('tax').value;

  if (isNaN(SoLuong) || isNaN(DonGia) || isNaN(ThueSuat)){
    alert("Giá trị nhập không phải số!");
  }else{
    var TienDV = parseInt(DonGia) * parseInt(SoLuong);

    document.getElementById('TienDV').value = TienDV;
    document.getElementById('TienDT').value = TienDV;
    var TienThue = parseInt(ThueSuat)%100 * TienDV;
    document.getElementById('TienThue').value = TienThue;
  }
  // 


}



/*
    Example:
    <a href="//example.com" class="print-url">Print</a>
*/

// //LISTEN FOR PRINT URL ITEMS TO BE CLICKED
// $(document).off('click.PrintUrl').on('click.PrintUrl', '.print-url', function(e){

//   //PREVENT OTHER CLICK EVENTS FROM PROPAGATING
//   e.preventDefault();

//   //TRY TO ASK THE URL TO TRIGGER A PRINT DIALOGUE BOX
//   printUrl($(this).attr('href'));
// });

// //TRIGGER A PRINT DIALOGE BOX FROM A URL
// function printUrl(url) {    

//   //CREATE A HIDDEN IFRAME AND APPEND IT TO THE BODY THEN WAIT FOR IT TO LOAD
//   $('<iframe src="'+url+'"></iframe>').hide().appendTo('body').on('load', function(){
      
//       var oldTitle    = $(document).attr('title');                //GET THE ORIGINAL DOCUMENT TITLE
//       var that        = $(this);                                  //STORE THIS IFRAME AS A VARIABLE           
//       var title       = $(that).contents().find('title').text();  //GET THE IFRAME TITLE
//       $(that).focus();                                            //CALL THE IFRAME INTO FOCUS (FOR OLDER BROWSERS)   

//       //SET THE DOCUMENT TITLE FROM THE IFRAME (THIS NAMES THE DOWNLOADED FILE)
//       if(title && title.length) $(document).attr('title', title);
      
//       //TRIGGER THE IFRAME TO CALL THE PRINT
//       $(that)[0].contentWindow.print();

//       //LISTEN FOR THE PRINT DIALOGUE BOX TO CLOSE
//       $(window).off('focus.PrintUrl').on('focus.PrintUrl', function(e){
//           e.stopPropagation();                                            //PREVENT OTHER WINDOW FOCUS EVENTS FROM RUNNING            
//           $(that).remove();                                               //GET RID OF THE IFRAME
//           if(title && title.length) $(document).attr('title', oldTitle);  //RESET THE PAGE TITLE
//           $(window).off('focus.PrintUrl');                                //STOP LISTENING FOR WINDOW FOCUS
//       });
//   });    
// };