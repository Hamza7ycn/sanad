var faq = document.getElementsByClassName("faq-box-question");
var i;
for (i = 0; i < faq.length; i++) {
    faq[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");
        /* Toggle between hiding and showing the active panel */
        var body = this.nextElementSibling;
        if (body.style.maxHeight == "3100px") {
            body.style.maxHeight = "0px";
        } else {
            body.style.maxHeight = "3100px";
        }
    });
}
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6
})
function toggleText() {
  const textDiv = document.getElementById("text");

  if (textDiv.style.display === "block") {
    textDiv.style.display = "none";
  } else {
    textDiv.style.display = "block";
    textDiv.style.animation = "none"; 
    void textDiv.offsetWidth;      
    textDiv.style.animation = "zoomIn 0.3s ease forwards";
  }
}



