const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  // Update css classes for gallery
  updateGallery() {

    this.carouselArray.forEach(el => {
      el.classList.remove('gallery-item-0', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');

    });
    /*
      this.carouselArray.slice(0, 3).forEach((el, i) => {
        el.classList.add(`gallery-item-${i+1}`);
        
      });*/

    // document.querySelector('.gallery-item-1').previousElementSibling
    //document.querySelector('.gallery-item-1').nextElementSibling


  }

  // Update the current order of the carouselArray and gallery
  setCurrentState(direction) {

    var activ_element = document.querySelector('.gallery-item-1')

    activ_element.children[0].classList.remove('hidden');
    slider.activeSlide(0, 'N');

    activ_element.children[1].children[1].children[0].innerHTML = ''



    if (direction.className == 'gallery-controls-previous') {

      var prev_activ_element = activ_element.previousElementSibling

      if (prev_activ_element !== null) {

        this.updateGallery()

        activ_element.classList.add('gallery-item-2')

        prev_activ_element.classList.add('gallery-item-1')




        if (prev_activ_element.previousElementSibling !== null) {

          prev_activ_element.previousElementSibling.classList.add('gallery-item-3')
        }
        activ_element.classList.remove('gallery-item-1')

      }



    } else {


      var new_activ_element = activ_element.nextElementSibling

      if (new_activ_element !== null) {

        this.updateGallery()



        activ_element.classList.add('gallery-item-3')

        new_activ_element.classList.add('gallery-item-1')


        if (new_activ_element.nextElementSibling !== null) {

          new_activ_element.nextElementSibling.classList.add('gallery-item-2')
        }

        activ_element.classList.remove('gallery-item-1')

      }

    }

    if (document.querySelector('.gallery-item-1').nextElementSibling === null) {

      document.querySelector('.gallery-controls-next').style.visibility = 'hidden'

    } else {

      document.querySelector('.gallery-controls-next').style.visibility = ''

    }



    if (document.querySelector('.gallery-item-1').previousElementSibling === null) {

      document.querySelector('.gallery-controls-previous').style.visibility = 'hidden'

    } else {


      document.querySelector('.gallery-controls-previous').style.visibility = ''

    }




    document.querySelector('.gallery-item-1').children[0].classList.add('hidden');
    slider = new SlideStories(document.querySelector('.gallery-item-1').children[1].getAttribute('data-slide'));
    slider.activeSlide(0);



  }

  // Construct the carousel navigation
  setNav() {
    galleryContainer.appendChild(document.createElement('ul')).className = 'gallery-nav';

    this.carouselArray.forEach(item => {
      const nav = galleryContainer.lastElementChild;
      nav.appendChild(document.createElement('li'));
    });
  }

  // Construct the carousel controls
  setControls() {
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;

      //document.querySelector(`.gallery-controls-${control}`).innerText = control;
    });
  }

  // Add a click event listener to trigger setCurrentState method to rearrange carousel
  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];


    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();


        if (control.className == 'gallery-controls-add') {
          const newItem = document.createElement('img');
          const latestItem = this.carouselArray.length;
          const latestIndex = this.carouselArray.findIndex(item => item.getAttribute('data-index') == this.carouselArray.length) + 1;

          // Assign the necessary properties for new gallery item
          Object.assign(newItem, {
            className: 'gallery-item',
            src: `http://fakeimg.pl/300/?text=${this.carouselArray.length + 1}`
          });
          newItem.setAttribute('data-index', this.carouselArray.length + 1);

          // Then add it to the carouselArray and update the gallery
          this.carouselArray.splice(latestIndex, 0, newItem);
          document.querySelector(`[data-index="${latestItem}"]`).after(newItem);
          this.updateGallery();

        } else {
          this.setCurrentState(control);
        }

      });
    });
  }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
//exampleCarousel.setNav();
exampleCarousel.useControls();
document.querySelector('.gallery-item-1').children[0].classList.add('hidden');

slider = new SlideStories(document.querySelector('.gallery-item-1').children[1].getAttribute('data-slide'));

slider.activeSlide(0, 'Y');
document.querySelector('.gallery-controls-previous').style.visibility = 'hidden'

const direction1 = {
  className: 'gallery-controls-previous',
};


const direction2 = {
  className: 'gallery-controls-next',
};

document.querySelectorAll('.holst').forEach(item => {


  item.addEventListener('click', (e) => {



    if (e.target.parentElement.nextElementSibling !== null) {
      if (e.target.parentElement.nextElementSibling.classList.contains('gallery-item-1')) {


        exampleCarousel.setCurrentState(direction1)


      } else {

        exampleCarousel.setCurrentState(direction2)

      }


    }
    else {

      exampleCarousel.setCurrentState(direction2)
    }





  })

})
document.querySelector('.close_story').addEventListener('click', (e) => {

  document.querySelector('.gallery').classList.add('hidden');


})



const sliders = document.querySelector('.gallery-container')

const slides = Array.from(document.querySelectorAll('.slide'))



// set up our state
let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0


// add our event listeners
slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img')
  // disable default image drag
  slideImage.addEventListener('dragstart', (e) => e.preventDefault())
  // touch events

  slide.addEventListener('touchmove', touchMove)
  slide.addEventListener('touchstart', touchStart)
  slide.addEventListener('touchend', touchEnd)

})

function touchStart(index) {

  isDragging = true
  startPos = 0
}
function touchEnd() {

  isDragging = false
  startPos = 0
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}



function touchMove(event) {
  if (isDragging) {

    if (startPos > 0) {

      isDragging = false

      if (startPos > getPositionX(event)) {
        exampleCarousel.setCurrentState(direction2)
      } else {
        exampleCarousel.setCurrentState(direction1)

      }

    }
    startPos = getPositionX(event)


  }


}







