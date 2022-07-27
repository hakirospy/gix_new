class SlideStories {
  constructor(id) {
    this.slide = document.querySelector(`[data-slide="${id}"]`);
    this.active = 0;
    this.init();
  }

  activeSlide(index, start = 'Y') {
    this.active = index;
    this.items.forEach((item) => item.classList.remove('active'));
    this.items[index].classList.add('active');
    this.thumbItems.forEach((item) => item.classList.remove('active'));
    this.thumbItems[index].classList.add('active');
    this.autoSlide(start);
  }

  prev() {
    if (this.active > 0) {
      this.activeSlide(this.active - 1);
    } else {
      this.activeSlide(this.items.length - 1);
    }
    this.addHref()
  }
  autoClick(elem){

    var click_event = new CustomEvent('click');
    var btn_element = document.querySelector(elem);
    btn_element.dispatchEvent(click_event);

  }
  addHref(){

    document.querySelector('.gallery-item-3').children[2].setAttribute('href',document.querySelector('.gallery-item-3').children[1].children[0].querySelector('.active').getAttribute('data-href'))

  }
  next() {
    if (this.active < this.items.length - 1) {
      this.activeSlide(this.active + 1);
    } else {
      this.autoClick('.gallery-controls-next');
    }
    this.addHref()
  }  



  addNavigation() {
    const nextBtn = this.slide.querySelector('.slide-next');
    const prevBtn = this.slide.querySelector('.slide-prev');
    nextBtn.addEventListener('click', this.next);
    prevBtn.addEventListener('click', this.prev);
  }

  addThumbItems() {
    this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
    this.thumbItems = Array.from(this.thumb.children);
  }

  autoSlide(start) {
    clearTimeout(this.timeout);
    if (start == 'Y') {this.timeout = setTimeout(this.next, 5000);}
  }

  init() {
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.items = this.slide.querySelectorAll('.slide-items > *');
    this.thumb = this.slide.querySelector('.slide-thumb');
    this.addThumbItems();
    //this.activeSlide(0);
    this.addNavigation();
  }
}
//slide.activeSlide(0);

