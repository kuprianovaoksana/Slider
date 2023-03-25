const images = [
    {
        url: "./images/img1.png",
        title: "Rostov-on-Don, Admiral",
        city: "Rostov-on-Don LCD admiral",
        apartment_area: "81 m2",
        repair_time: "3.5 months",
        repair_cost: "Upon request"
    },
    {
        url: "./images/img2.png",
        title: "Sochi Thieves",
        city: "Sochi Thieves", 
        apartment_area: "105 m2",
        repair_time: "4 months",
        repair_cost: "Upon request"
    },
    {
        url: "./images/img3.png",
        title: "Rostov-on-Don Patriotic",
        city: "Rostov-on-Don Patriotic", 
        apartment_area: "93 m2",
        repair_time: "3 months",
        repair_cost: "Upon request"
    }
];

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", initSlider());


function initSlider(){

    if (!images || !images.length) return;

    const sliderImg = document.querySelector(".slider-img");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    
    leftArrow.addEventListener('click', ()=>{
        currentIndex-=1;
        moveSlider(currentIndex);
    });
    rightArrow.addEventListener('click', ()=>{
        currentIndex+=1;
        moveSlider(currentIndex);
    });

    initDots(images.length);
    
    function initDots(num){
        for(let i=0; i<num; i++){
            rightArrow.insertAdjacentHTML (
            'beforebegin',
            `<div class="dots dot${i}"></div>`
            )
            
            document.querySelector(`.dot${i}`).dataset.index=i;

            document.querySelector(`.dot${i}`).addEventListener('click', ()=>{
                currentIndex=i;
                moveSlider();
            });

        }
        document.querySelector(".dots").classList.add("dots-active");
    }

    initTitles(images.length);

    function initTitles(num){
        const navigation=document.querySelector(".navigation-list");
        for(let i=0; i<num; i++){
            navigation.insertAdjacentHTML (
            'beforeend',
            `<li class="navigation-list__item item${i}"><a>${images[i].title}</a></li>`
            )

            document.querySelector(`.item${i}`).addEventListener('click', ()=>{
                currentIndex=i;
                moveSlider();
            });
    
        }
        document.querySelector(".navigation-list__item").classList.add("navigation-list__item_active");
    }
    
    initDescription(currentIndex);

    function initDescription(current_city){
        const City = document.getElementById("city");
        const Area = document.getElementById("area");
        const Time = document.getElementById("time");
        const Cost = document.getElementById("cost");

        City.insertAdjacentHTML (
            'beforeend',
            `<p>${images[current_city].city}</p>`
        )

        Area.insertAdjacentHTML (
            'beforeend',
            `<p>${images[current_city].apartment_area}</p>`
        )

        Time.insertAdjacentHTML (
            'beforeend',
            `<p>${images[current_city].repair_time}</p>`
        )

        Cost.insertAdjacentHTML (
            'beforeend',
            `<p>${images[current_city].repair_cost}</p>`
        )

    }

    initImages();

    function initImages(){
        for(let i=0; i<images.length; i++){
            sliderImg.insertAdjacentHTML (
            'beforeend',
            `<img class="insert-image n${i}" src="${images[i].url}" alt="Портфолио наших проектов">`
            )
        }
        document.querySelector(".n0").classList.add("active");
    }
}


function moveSlider(){
    if(currentIndex<0){
        currentIndex=2;
    }
    if(currentIndex>2){
        currentIndex=0;
    }

    document.querySelector(".active").classList.remove("active");
    document.querySelector(`.n${currentIndex}`).classList.add("active");

    document.querySelector(".dots-active").classList.remove("dots-active");
    document.querySelector(`.dots[data-index="${currentIndex}"]`).classList.add("dots-active");
    // document.querySelector(`.dot${currentIndex}`).classList.add("dots-active");

    document.querySelector(".navigation-list__item_active").classList.remove("navigation-list__item_active");
    document.querySelector(`.item${currentIndex}`).classList.add("navigation-list__item_active");

    document.getElementById("city").getElementsByTagName("p")[0].innerText = images[currentIndex].city;
    document.getElementById("area").getElementsByTagName("p")[0].innerText = images[currentIndex].apartment_area;
    document.getElementById("time").getElementsByTagName("p")[0].innerText = images[currentIndex].repair_time;
    document.getElementById("cost").getElementsByTagName("p")[0].innerText = images[currentIndex].repair_cost;
}
