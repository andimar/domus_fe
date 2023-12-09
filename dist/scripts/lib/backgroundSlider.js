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





