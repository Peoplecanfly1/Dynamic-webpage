class gsapAnimation {
  constructor() {
    this.slides = document.querySelectorAll(".slide");
    this.nav = document.querySelector(".nav-header");
    this.cursor = document.querySelector(".cursor");
    this.mouseText = this.cursor.querySelector("span");
    this.slideAnimation(this.slides);
    this.addListeners();
  }

  slideAnimation = (slides) => {
    slides.forEach((slide, index) => {
      const revealImg = slide.querySelector(".reveal-img");
      const img = slide.querySelector("img");
      const revealText = slide.querySelector(".reveal-text");

      const navTl = new gsap.timeline({
        defaults: {
          duration: 1,
          ease: "power2.inOut",
        },
      });

      navTl.fromTo(this.nav, { y: "-100%" }, { y: "0%" }, "+=0.75");

      const slideTL = new gsap.timeline({
        defaults: {
          duration: 1,
          ease: "power2.inOut",
        },
        scrollTrigger: {
          trigger: slide,
          start: "top center",
          markers: false,
          toggleActions: "play none none reverse",
        },
      });
      slideTL
        .fromTo(img, { scale: 2 }, { scale: 1 })
        .fromTo(revealImg, { x: "0%" }, { x: "100%" }, "-=1")
        .fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");

      const pageTl = new gsap.timeline({
        defaults: {
          duration: 0.5,
          ease: "power2.inOut",
        },
        scrollTrigger: {
          trigger: slide,
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: true,
          markers: false,
          pinSpacing: false,
        },
      });
      let nextSlide = slides.length - 1 === index ? "end" : slides[index - 1];
      pageTl.to(nextSlide, { y: "50%" });
      pageTl.to(slide, { autoAlpha: 0, scale: 0.5 });
      pageTl.to(nextSlide, { y: "0" }, "-=0.5");
    });
  };

  addListeners = () => {
    window.addEventListener("mousemove", this.addCursor);
    window.addEventListener("mouseover", this.mouseHover);
  };

  addCursor = (e) => {
    this.cursor.style.top = e.pageY + "px";
    this.cursor.style.left = e.pageX + "px";
  };

  mouseHover = (e) => {
    const item = e.target;
    if (item.id == "logo" || item.classList.contains("burger")) {
      this.cursor.classList.add("nav-active");
    } else {
      this.cursor.classList.remove("nav-active");
    }
    if(item.classList.contains("explore")) {
      this.cursor.classList.add("explore-active");
      this.mouseText.innerText = "Tap";
    } else {
      this.cursor.classList.remove("explore-active");
      this.mouseText.innerText = "";
    }
  };
}

const animation = new gsapAnimation();
