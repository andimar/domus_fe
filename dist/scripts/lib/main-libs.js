/** Vanilla JavaScript Accordion v1.1.0 **/
var Accordion=function(e){var t="string"==typeof e.element?document.getElementById(e.element):e.element,n=e.openTab,l=e.oneOpen||!1,c="js-Accordion-title",i="js-Accordion-content";function o(e){var t,n;-1!==e.target.className.indexOf(c)&&(l&&r(),n=(t=e.target.nextElementSibling).scrollHeight,"0px"===t.style.height||""===t.style.height?t.style.height=n+"px":t.style.height=0)}function r(){[].forEach.call(t.querySelectorAll("."+i),function(e){e.style.height=0})}function s(e){return t.querySelectorAll("."+i)[e-1]}function a(e){var t=s(e);t&&(l&&r(),t.style.height=t.scrollHeight+"px")}return[].forEach.call(t.querySelectorAll("button"),function(e){e.classList.add(c),e.nextElementSibling.classList.add(i)}),t.addEventListener("click",o),r(),n&&a(n),{open:a,close:function(e){var t=s(e);t&&(t.style.height=0)},destroy:function(){t.removeEventListener("click",o)}}};
!function(n){function t(){"use strict";if(window.addEventListener){if(!this)return new t;this.images=e(),this.images.length&&window.addEventListener("load",function(){this.init(),this.process()}.bind(this))}}function e(){return n.querySelectorAll("[data-adaptive-background]")}t.prototype.init=function(){var n,t,e,o,i;n=window,t=function(n,t){var e=new Image;e.crossOrigin="Anonymous",e.src=n.src,e.onload=function(){var o=document.createElement("canvas").getContext("2d");o.drawImage(e,0,0);var i=o.getImageData(0,0,n.width,n.height);t&&t(i.data)}},e=function(n){return["rgb(",n,")"].join("")},o=function(n){return n.map(function(n){return e(n.name)})},i={colors:function(n,i,a){t(n,function(n){for(var t=n.length,r={},c="",u=[],s={dominant:{name:"",count:0},palette:Array.apply(null,Array(a||10)).map(Boolean).map(function(n){return{name:"0,0,0",count:0}})},d=0;d<t;){if(u[0]=n[d],u[1]=n[d+1],u[2]=n[d+2],r[c=u.join(",")]=c in r?r[c]+1:1,"0,0,0"!==c&&"255,255,255"!==c){var m=r[c];m>s.dominant.count?(s.dominant.name=c,s.dominant.count=m):s.palette.some(function(n){if(m>n.count)return n.name=c,n.count=m,!0})}d+=20}i&&i({dominant:e(s.dominant.name),palette:o(s.palette)})})}},n.RGBaster=n.RGBaster||i},t.prototype.process=function(){for(var n=this.images.length-1;n>=0;n--)!function(n){RGBaster.colors(n,function(t){n.parentNode.style.backgroundColor=t.dominant},20)}(this.images[n])},t.prototype.refresh=function(){this.images=e()},window.AdaptiveBackgrounds=t}(document);
"use strict";

/*
  since querySelectorAll gives us the total number
  of items of the class "controls"
  console.log(controls.length) result(3)
*/
const controls = document.querySelectorAll('.controls');


let slides = document.querySelectorAll('#all_slides .slide');
let currentSlide = 0;

const nextSlide = () => {
    goToSlide(currentSlide + 1);
}

const previousSlide = () => {
    goToSlide(currentSlide - 1);
}

/*
  this does the magic of moving to the next slide after
  every 2.1 seconds and starting all over.
*/

let slideInterval = setInterval(nextSlide, 4000);

// which slide to move to as denoted by "s"
const goToSlide = (s) => {
  /* 
   when this function is run, hide all slides
   since the slide class has opacity set to 0.
  */
    slides[currentSlide].className = 'slide';
    
     /* assuming we have 4 different slides
        we can index these slides as follows:
        Slide 1 = 0
        Slide 2 = 1
        Slide 3 = 2
        Slide 4 = 3

        Now, we set the current slide index to be zero.

        currentSlide = 0

        Now, we need to find a way to increment the currentSlide index 
        every 2.1 seconds as specified in our setInterval method.

        recall the slide.length = 4
        This tells us that the index stops at 3.

        currentSlide = 0 + 4/4 = 1 [new currentSlide]

        now that the currentSlide is 1, when the setInterval runs 
        it again, we have:

        currentSlide = 1 + 4/4 = 2 [new currentSlide]

        now that the currentSlide is 2, when the setInterval runs 
        it again, we have:

        currentSlide = 2 + 4/4 = 3 [new currentSlide]

        since our index stops at 3. The setInternal starts from the
        beginning again by assigning 0 to currentSlide and doing same 
        process all over again.

     */
    currentSlide = (s + slides.length) % slides.length;
    // in active we set opacity to 1.
    slides[currentSlide].className = 'slide active';
}


let playing = true;





