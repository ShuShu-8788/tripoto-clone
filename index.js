let i = 0;
let images = []

images[0] = "https://cdn1.tripoto.com/media/filter/nxxl/img/1516992/Image/1670586625_img_0434.jpg"
images[1] = "https://cdn1.tripoto.com/media/filter/nxxl/img/2215463/Image/1669102212_1667974883_web1.jpeg"
images[2] = "https://cdn1.tripoto.com/media/filter/nxxl/img/2224454/Image/1670482094_homepage_recovered_op2.jpg"


function changeImage() {
  document.querySelector(".container").innerHTML = "";
  let img = document.createElement("img");
  img.src = images[i];
  document.querySelector(".container").append(img);
  if (i < images.length - 1) {
    i++;
  } else {
    i = 0;
  }
  setTimeout("changeImage()", 3000)
}
changeImage()


// When the user scrolls the page, execute myFunction

window.onscroll = function () {
  if (window.pageYOffset > 80) {
    document.querySelector(".nav-top").classList.add("fixedheader");
  } else {
    document.querySelector(".nav-top").classList.remove("fixedheader");
  }
};

// third slider/corousel //

document.getElementById(`sec2`).style.display = "none";
document.getElementById(`sec3`).style.display = "none";
function booknow() {
  window.location = "/product-page/detail.html";
}
let count = 1;
function changeS() {
  console.log(count);
  if (count === 1) {
    document.getElementById(`sec1`).style.display = "none";
    document.getElementById(`sec2`).style.display = "block";
    document.getElementById(`sec3`).style.display = "none";
    count++;
  } else if (count === 2) {
    count++;
    document.getElementById(`sec1`).style.display = "none";
    document.getElementById(`sec2`).style.display = "none";
    document.getElementById(`sec3`).style.display = "block";
  } else if ((count = 3)) {
    count = 1;
    document.getElementById(`sec1`).style.display = "block";
    document.getElementById(`sec2`).style.display = "none";
    document.getElementById(`sec3`).style.display = "none";
  }
}
function changeS2() {
  console.log(count);
  if (count === 1) {
    document.getElementById(`sec1`).style.display = "none";
    document.getElementById(`sec2`).style.display = "none";
    document.getElementById(`sec3`).style.display = "block";
    count = 3;
  } else if (count === 2) {
    count = 1;
    document.getElementById(`sec1`).style.display = "block";
    document.getElementById(`sec2`).style.display = "none";
    document.getElementById(`sec3`).style.display = "none";
  } else if ((count = 3)) {
    count = 2;
    document.getElementById(`sec1`).style.display = "none";
    document.getElementById(`sec2`).style.display = "block";
    document.getElementById(`sec3`).style.display = "none";
  }
}

//second slider//

document.getElementById(`sec5`).style.display = "none";
function booknow() {
  window.location = "/product-page/detail.html";
}
function changeS3() {
  console.log(count);
  if (count === 1) {
    document.getElementById(`sec4`).style.display = "none";
    document.getElementById(`sec5`).style.display = "block";
    count++;
  } else if (count === 2) {
    count = 1
    document.getElementById(`sec5`).style.display = "none";
    document.getElementById(`sec4`).style.display = "block";
  }
}
function changeS4() {
  console.log(count);
  if (count === 1) {
    document.getElementById(`sec5`).style.display = "block";
    document.getElementById(`sec4`).style.display = "none";
    count = 2;
  } else if (count === 2) {
    count = 1;
    document.getElementById(`sec4`).style.display = "block";
    document.getElementById(`sec5`).style.display = "none";
  }
}

//slider1//


document.getElementById(`sec7`).style.display = "none";
document.getElementById(`sec8`).style.display = "none";
function booknow() {
  window.location = "/product-page/detail.html";
}
function spotlight_plus() {
  // console.log(count);
  if (count === 1) {
    document.getElementById(`sec6`).style.display = "none";
    document.getElementById(`sec7`).style.display = "block";
    document.getElementById(`sec8`).style.display = "none";
    count++;
  } else if (count === 2) {
    count++;
    document.getElementById(`sec6`).style.display = "none";
    document.getElementById(`sec7`).style.display = "none";
    document.getElementById(`sec8`).style.display = "block";
  } else if ((count = 3)) {
    count = 1;
    document.getElementById(`sec6`).style.display = "block";
    document.getElementById(`sec7`).style.display = "none";
    document.getElementById(`sec8`).style.display = "none";
  }
}
function spotlight_minus() {
  //  console.log(count);
  if (count === 1) {
    document.getElementById(`sec6`).style.display = "none";
    document.getElementById(`sec7`).style.display = "none";
    document.getElementById(`sec8`).style.display = "block";
    count = 3;
  } else if (count === 2) {
    count = 1;
    document.getElementById(`sec6`).style.display = "block";
    document.getElementById(`sec7`).style.display = "none";
    document.getElementById(`sec8`).style.display = "none";
  } else if ((count = 3)) {
    count = 2;
    document.getElementById(`sec6`).style.display = "none";
    document.getElementById(`sec7`).style.display = "block";
    document.getElementById(`sec8`).style.display = "none";
  }
}