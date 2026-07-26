let flute = 3;



const buttons = document.querySelectorAll(".flute");



buttons.forEach(button => {


    button.addEventListener("click",()=>{


        buttons.forEach(btn=>{

            btn.classList.remove("active");

        });



        button.classList.add("active");



        flute = Number(button.dataset.value);



        localStorage.setItem(
            "flute",
            flute
        );


    });


});





// PINDAH KE HALAMAN AR

document
.getElementById("startMeasure")
.addEventListener("click",()=>{


    if(!flute){

        alert("Pilih flute terlebih dahulu");

        return;

    }



    localStorage.setItem(
        "flute",
        flute
    );



    window.location.href="measure.html";


});







// HITUNG MANUAL

document
.getElementById("calculate")
.addEventListener("click",()=>{


let height =
Number(
document.getElementById("height").value
);



if(!height){

alert("Masukkan tinggi tumpukan");

return;

}



let result =
calculateSheet(height, flute);



document
.getElementById("sheetResult")
.innerHTML =
result+" Sheet";



});