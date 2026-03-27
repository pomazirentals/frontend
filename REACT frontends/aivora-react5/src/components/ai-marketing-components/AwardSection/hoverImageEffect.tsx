import { gsap } from "gsap";

export class HoverImgFx {
  el: HTMLElement;
  reveal: HTMLElement;
  revealInner: HTMLElement;
  revealImg: HTMLElement;

  constructor(el: HTMLElement) {
    this.el = el;

    // Create reveal wrapper
    this.reveal = document.createElement("div");
    this.reveal.className = "xb-img-reveal-wrapper";

    this.reveal.innerHTML = `
      <div class="xb-img-reveal-wrapper__inner">
        <div class="xb-img-reveal-wrapper__img">
          <div class="xb-hover-wrapper">
            <img src="${this.el.dataset.img ?? ""}" alt="">
          </div>
        </div>
      </div>
    `;

    // Append to body to prevent clipping
    document.body.appendChild(this.reveal);

    this.revealInner = this.reveal.querySelector(".xb-img-reveal-wrapper__inner")!;
    this.revealImg = this.reveal.querySelector(".xb-img-reveal-wrapper__img")!;
    this.revealInner.style.overflow = "hidden";

    this.initEvents();
  }

  getMousePos(e: MouseEvent) {
    return { x: e.pageX, y: e.pageY };
  }

  // ⭐ Smooth movement + dynamic top limit
  positionElement(e: MouseEvent) {
    const { x, y } = this.getMousePos(e);

    const maxTop = 300;
    const limitedTop = gsap.utils.clamp(0, maxTop, y + 20);

    gsap.to(this.reveal, {
      x: x + 20,
      y: limitedTop,
      duration: 0.25,
      ease: "power3.out",
    });
  }

  initEvents() {
    this.el.addEventListener("mouseenter", (e) => {
      this.positionElement(e);
      this.showImage();
    });

    this.el.addEventListener("mousemove", (e) => {
      requestAnimationFrame(() => this.positionElement(e));
    });

    this.el.addEventListener("mouseleave", () => {
      this.hideImage();
    });
  }

  showImage() {
    gsap.killTweensOf([this.revealInner, this.revealImg]);

    gsap.set(this.el, { zIndex: 9 });
    gsap.set(this.reveal, { opacity: 1 });

    gsap
      .timeline()
      .fromTo(
        this.revealInner,
        { x: "-100%" },
        { x: "0%", duration: 0.3, ease: "sine.out" }
      )
      .fromTo(
        this.revealImg,
        { x: "100%" },
        { x: "0%", duration: 0.3, ease: "sine.out" },
        "<"
      );
  }

  hideImage() {
    gsap.killTweensOf([this.revealInner, this.revealImg]);

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(this.el, { zIndex: "" });
          gsap.set(this.reveal, { opacity: 0 });
        },
      })
      .to(this.revealInner, { x: "100%", duration: 0.3, ease: "sine.in" })
      .to(
        this.revealImg,
        { x: "-100%", duration: 0.3, ease: "sine.in" },
        "<"
      );
  }
}
