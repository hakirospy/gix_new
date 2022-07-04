const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous',  'next'];
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
    
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
      el.classList.remove('gallery-item-4');
  
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i+1}`);
    });
  }

  // Update the current order of the carouselArray and gallery
  setCurrentState(direction) {

    if (direction.className == 'gallery-controls-previous') {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    
    this.updateGallery();
  }

  // Construct the carousel navigation
   setNav() {
   galleryContainer.appendChild(document.createElement('ul')).className = 'gallery-nav';

     this.carouselArray.forEach(item => {
      const nav = galleryContainer.lastElementChild;
       nav.appendChild(document.createElement('li'));
     }); 
 }s

  // Construct the carousel controls
  setControls() {
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;

      document.querySelector(`.gallery-controls-${control}`).innerText = control;
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
          const latestIndex = this.carouselArray.findIndex(item => item.getAttribute('data-index') == this.carouselArray.length)+1;

          // Assign the necessary properties for new gallery item
          Object.assign(newItem,{
            className: 'gallery-item',
            src: `http://fakeimg.pl/300/?text=${this.carouselArray.length+1}`
          });
          newItem.setAttribute('data-index', this.carouselArray.length+1);

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
document.querySelector('.gallery-item-3').children[0].classList.add('hidden');

slider = new SlideStories(document.querySelector('.gallery-item-3').children[1].getAttribute('data-slide'));

slider.activeSlide(0,'Y');

document.querySelectorAll('.holst').forEach(item => {


    item.addEventListener('click', (e) => {

//var countSlider = e.target.parentElement.classList[3].split('-')[2]; e.target.parentElement.getBoundingClientRect().right e.target.parentElement.nextElementSibling.children[0].classList.add('hidden');

//slide.autoSlide('N');
//delete slide;



if(e.target.parentElement.nextElementSibling != null) {


if( e.target.parentElement.nextElementSibling.classList.contains('gallery-item-3')){


  exampleCarousel.carouselArray.unshift(exampleCarousel.carouselArray.pop())

}else{

  exampleCarousel.carouselArray.push(exampleCarousel.carouselArray.shift());
 
}
}else {


if(e.target.parentElement.previousElementSibling.classList.contains('gallery-item-3')){
  exampleCarousel.carouselArray.push(exampleCarousel.carouselArray.shift());

 }
  else{
    exampleCarousel.carouselArray.unshift(exampleCarousel.carouselArray.pop())
   


  }

}
document.querySelector('.gallery-item-3').children[0].classList.remove('hidden');
slider.activeSlide(0,'N');

document.querySelector('.gallery-item-3').children[1].children[1].children[0].innerHTML = ''

exampleCarousel.updateGallery();

document.querySelector('.gallery-item-3').children[0].classList.add('hidden');
slider = new SlideStories(document.querySelector('.gallery-item-3').children[1].getAttribute('data-slide'));
slider.activeSlide(0);

})

})
