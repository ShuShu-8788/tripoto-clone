let i=0;
let images=[]

images[0] = "https://cdn1.tripoto.com/media/filter/nxxl/img/1516992/Image/1670586625_img_0434.jpg"
images[1] = "https://cdn1.tripoto.com/media/filter/nxxl/img/2215463/Image/1669102212_1667974883_web1.jpeg"
images[2] = "https://cdn1.tripoto.com/media/filter/nxxl/img/2224454/Image/1670482094_homepage_recovered_op2.jpg"


function changeImage(){ 
   document.querySelector(".container").innerHTML = "";
   let img = document.createElement("img");
     img.src = images[i];
 document.querySelector(".container").append(img);
 if(i<images.length-1){
    i++;
}else{
    i=0;
}
setTimeout("changeImage()",3000)
}
changeImage()   

