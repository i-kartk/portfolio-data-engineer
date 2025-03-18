// // import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
 
function circleFlatkaro() {
    let timeoutScale;
    let xprev = 0
    let yprev = 0

    const min_scale_value = 0.8
    const max_scale_value = 1.2;

    window.addEventListener("mousemove", function(dets){
        this.clearTimeout(timeoutScale);

        let xdiff = dets.clientX - xprev;
        let ydiff = dets.clientY - yprev;

        xprev = dets.clientX
        yprev = dets.clientY

        let xfinal = gsap.utils.clamp(min_scale_value, max_scale_value, xdiff) 
        let yfinal = gsap.utils.clamp(min_scale_value, max_scale_value, ydiff)

        circleMouseFollower(xfinal, yfinal)

        timeoutScale = setTimeout(function () {
            let circle = document.querySelector(".mini-circle");
            circle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xfinal}, ${yfinal}`
        }, 100);    
    });
}


function circleMouseFollower(xfinal, yfinal) {
    window.addEventListener("mousemove",function(dets) {
        const circle = document.querySelector(".mini-circle")
        circle.style.transform =`translate(${dets.clientX}px, ${dets.clientY}px) scale(${xfinal}, ${yfinal})`;  
    });   
}




function firstPageAnimation(){
    
    let tl = gsap.timeline ();
    tl.from("nav",{
        y:'-10',
        opacity:0,
        duration:2,
        ease: Expo.easeInOut
    })

        tl.to(".bounding-elem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            stagger: .2,
            delay: -1
        })

        tl.from(".landing-footer",{
            y: -10,
            opacity: 0,
            delay:-1,
            duration: 1.5,
            ease: Expo.easeInOut
        })
}

function image_hover_animation(params) {

    const page_2_element = document.querySelectorAll(".element ")                
    page_2_element.forEach(function(page_2_element){

            // to rotate the image , we put it at top because whenever the mousemove event is so it don't reset the value of the prev
            let difference = 0;
            let xprev = 0; 
            let img = page_2_element.querySelector("img")

            
            // this event to rotate and show image on hovering over the div
        page_2_element.addEventListener("mousemove",function (dets) {

            value_of_div_from_top = page_2_element.getBoundingClientRect().top;
            value_of_cursor_from_top = dets.clientY;
            value_of_cursor_in_x_axis = dets.clientX;

            // now the difference of div from top and cursor will be the value of cursor from the top of the div

            value_of_cursor_from_div_top = value_of_cursor_from_top- value_of_div_from_top;

            xcurr = dets.clientX;
            // console.log(`x current: ${xcurr}`);
            
            difference = xcurr - xprev
            // console.log(`difference: ${difference}`)

            xprev = dets.clientX
            // console.log(`x previous: ${xprev}`);
            
            let rotate_value = gsap.utils.clamp(-20,20, difference * .5);


            // hr div ki hr ek alg image hai usko select krenge
            gsap.to(img,{
                opacity: 1,
                ease: Power2,
                top: value_of_cursor_from_div_top,
                left: value_of_cursor_in_x_axis,
                duration: .5,
                rotate: rotate_value,

                })
        });


        // this event to disappear the image when we stop hovering the div
        page_2_element.addEventListener("mouseleave",function (dets) {
            gsap.to(img,{
                duration: .5,
                ease: Power3,
                opacity: 0,

            });
            
        });
    });
}

// function updateTime() {
//     function Time() {
        

//     // Update the time immediately and then every second
//     updateTime();
//     setInterval(updateTime, 1000);
// }

setInterval(function time (){
    const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
            timeZone: 'Asia/Kolkata' // IST time zone
        };
        const timeString = now.toLocaleTimeString('en-IN', options);
        document.getElementById('current-time').textContent = timeString;
    }, 1000);

circleMouseFollower();
circleFlatkaro();
firstPageAnimation();
image_hover_animation();
