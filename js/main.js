const mainImg = document.querySelector(".screen img");
const mainContainer = document.querySelector(".image-thumbnail-carousel");
const allSlides = [...document.querySelectorAll(".carousel__slide")];
const thumbnailImgs = [...document.querySelectorAll(".thumbnail img")];
const totalSlides = allSlides.length;
let currentSlide = 0;
let slideInterval;
let swipeStartX = 0;
let swipeEndX = 0;

//* helper function *//
const removeAllActives = (listItems) => {
  listItems.forEach((item) => {
    item.classList.remove("active");
  });
};

//* Show Slide Function *//
const showSlide = (index) => {
  if (index >= totalSlides) currentSlide = 0;
  if (index < 0) currentSlide = totalSlides - 1;

  const currentSrc = thumbnailImgs[currentSlide].getAttribute("src");
  mainImg.setAttribute("src", currentSrc);

  removeAllActives(allSlides);
  allSlides[currentSlide].classList.add("active");

  allSlides.forEach((slide) => {
    window.innerWidth > 680
      ? (slide.style.transform = `translateX(-${currentSlide * 100}%)`)
      : (slide.style.transform = `none`);
  });
};
allSlides.forEach((slide) => {
  slide.addEventListener("click", (e) => {
    thumbnailImgs.forEach((img) => {
      if (img.getAttribute("src") === e.target.getAttribute("src")) {
        currentSlide = thumbnailImgs.indexOf(img);
        showSlide(currentSlide);
      }
    });
  });
});

//* pagination Function *//
const handlePagination = () => {
  allSlides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
};

//* Next and Previous Slide Functions *//
const nextSlide = () => {
  currentSlide++;
  showSlide(currentSlide);
};
document.querySelector(".next").addEventListener("mouseup", (e) => {
  e.stopPropagation();
  nextSlide();
});

const prevSlide = () => {
  currentSlide--;
  showSlide(currentSlide);
};
document.querySelector(".prev").addEventListener("mouseup", (e) => {
  e.stopPropagation();
  prevSlide();
});

//* Automatic Slide Show and Pause Slide Show Function *//
const startSlideShow = (e) => {
  slideInterval = setInterval(nextSlide, 3000);
};
mainContainer.addEventListener("mouseout", startSlideShow);

const pauseSlideShow = () => {
  clearInterval(slideInterval);
};
mainContainer.addEventListener("mouseover", pauseSlideShow);

//* Swipe Functions *//
const handleSwipeStart = (e) => {
  if (e.type === "mousedown") {
    e.preventDefault();
    swipeStartX = e.pageX;
  } else if (e.type === "touchstart") {
    swipeStartX = e.changedTouches[0].pageX;
  }
};

const handleSwipeEnd = (e) => {
  if (e.type === "mouseup") {
    e.preventDefault();
    swipeEndX = e.pageX;
  } else if (e.type === "touchend") {
    swipeEndX = e.changedTouches[0].pageX;
  }

  handleSwipe();
};

const handleSwipe = () => {
  const currentSwipeDistanceX = swipeEndX - swipeStartX;

  if (currentSwipeDistanceX > 20) {
    prevSlide();
  }

  if (currentSwipeDistanceX < -20) {
    nextSlide();
  }

  swipeStartX = 0;
  swipeEndX = 0;
};

//* Runs when the DOM is fully loaded (similar to useEffect or componentDidMount in React) *//
document.addEventListener("DOMContentLoaded", () => {
  showSlide(currentSlide);
  startSlideShow();
  handlePagination();

  mainContainer.addEventListener("mousedown", handleSwipeStart);
  mainContainer.addEventListener("touchstart", handleSwipeStart);
  mainContainer.addEventListener("mouseup", handleSwipeEnd);
  mainContainer.addEventListener("touchend", handleSwipeEnd);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    }

    if (e.key === "ArrowRight") {
      nextSlide();
    }
  });
});
