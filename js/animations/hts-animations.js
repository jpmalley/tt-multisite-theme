gsap.registerPlugin(ScrollTrigger);

const canvasElements = document.querySelectorAll(".animation");
const dpi = window.devicePixelRatio;

canvasElements.forEach((canvas) => {
    let context = canvas.getContext("2d");
    let sceneName = canvas.getAttribute("data-scene");
    let frameCount = canvas.getAttribute("data-frame-count");
    let currentFrame = frameIndex => (`img/animation/${sceneName}/frame-${frameIndex.toString().padStart(3, "0")}.jpg`);
    let images = [];
    let canvasFrames = { frame: 0 };
    let smBreakpoint = window.matchMedia("(max-width: 575.98px)")

    function render() {
        fix_dpi()
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[canvasFrames.frame], 0, 0, canvas.width, canvas.height);
    }

    function fix_dpi() {
        let style = {
            height() {
                return +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
            },
            width() {
                return +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
            }
        }
        canvas.setAttribute('width', style.width() * dpi);
        canvas.setAttribute('height', style.height() * dpi);
    }

    function myFunction(smBreakpoint) {
        if (smBreakpoint.matches) { // If media query matches
            let staticImg = new Image();
            staticImg.src = currentFrame(13);
            
            fix_dpi()
            context.clearRect(0, 0, canvas.width, canvas.height);
            staticImg.onload = () => context.drawImage(staticImg, 0, 0, canvas.width, canvas.height);
        } else {
            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                img.src = currentFrame(i);
                images.push(img);
            }

            gsap.to(canvasFrames, {
                frame: frameCount - 1,
                snap: "frame",
                scrollTrigger: {
                    start: "top center",
                    trigger: canvas,
                    scrub: 0.5,
                    // markers: true,
                },
                onUpdate: render
            });

            images[0].onload = render;
        }
    }

    myFunction(smBreakpoint);
    // smBreakpoint.addEventListener("change", myFunction);

})

const mainBanner = document.querySelector("#mb-thief");

let playActions = "restart complete complete complete"

// Main Banner Animation
gsap.timeline({
    scrollTrigger: {
        trigger: ".main-banner",
        toggleActions: playActions,
        start: "top 50%",
        end: "bottom top",
        // markers: true,
    }
})
    .from(".main-banner", { autoAlpha: 0 })
    .from("#mb-thief", {
        opacity: 0,
        top: "200px",
        duration: 2,
    })
    .from("#mb-rain", {
        top: "-50px",
        duration: 2,
    }, 0)
    .from("#mb-logo", {
        opacity: 0,
        top: "-160px",
        duration: 2,
    }, .2)

// HTS Product Image Animation
gsap.timeline({
    scrollTrigger: {
        trigger: "#product-image",
        toggleActions: playActions,
        start: "top 80%",
        end: "bottom top",
        // markers: true,
    }
})
    .from("#product-img-0", {
        // opacity: 0,
        left: "-100px",
        duration: 1,
    })
    .from("#product-img-1", {
        opacity: 0,
        left: "-200px",
        duration: 1,
    }, 0)


// CTA-1 Animation
gsap.timeline({
    scrollTrigger: {
        trigger: "#cta-1",
        toggleActions: playActions,
        start: "top 50%",
        end: "bottom top",
        // markers: true,
    }
})
    .from("#cta-1-product", {
        opacity: 0,
        left: "-100px",
        duration: 1,
    })
    .from("#cta-1-character", {
        opacity: 0,
        left: "-100px",
        duration: .25,
    }, .5)


// Customizer Animation
gsap.timeline({
    scrollTrigger: {
        trigger: "#customizer-promo",
        toggleActions: playActions,
        start: "top 80%",
        end: "bottom top",
        // markers: true,
    }
})
    .from("#customizer-main", {
        // opacity: 0,
        scale: .7,
        duration: .75,
    })
    .from("#customizer-left", {
        opacity: 0,
        left: "300px",
        duration: .75,
    }, 0)
    .from("#customizer-right", {
        opacity: 0,
        left: "-300px",
        duration: .75,
    }, 0)


// Party Leader Cards Animimation
gsap.timeline({
    scrollTrigger: {
        trigger: "#party-leader-cards",
        toggleActions: playActions,
        start: "top 50%",
        end: "bottom top",
        // markers: true,
    }
})
    .from("#party-leader-cards img", {
        opacity: 0,
        top: "500px",
        stagger: 0.1
    })


// Hero Cards Animimation
gsap.timeline({
    scrollTrigger: {
        trigger: "#hero-cards",
        toggleActions: playActions,
        start: "top 50%",
        end: "bottom top",
        // markers: true,
    }
})
    .from("#hero-cards img", {
        opacity: 0,
        top: "500px",
        stagger: 0.1
    })


// Monster Cards Animimation
gsap.timeline({
    scrollTrigger: {
        trigger: "#monster-cards",
        toggleActions: playActions,
        start: "top 50%",
        end: "bottom top",
        // markers: true,
    }
})
    .from("#monster-cards img", {
        opacity: 0,
        top: "500px",
        stagger: 0.1
    })


// Item Cards Animimation
gsap.timeline({
    scrollTrigger: {
        trigger: "#item-cards",
        toggleActions: playActions,
        start: "top 50%",
        end: "bottom top",
        // markers: true,
    }
})
    .from("#item-cards img", {
        opacity: 0,
        top: "500px",
        stagger: 0.1
    })


// Magic Cards Animimation
gsap.timeline({
    scrollTrigger: {
        trigger: "#magic-cards",
        toggleActions: playActions,
        start: "top 50%",
        end: "bottom top",
        // markers: true,
    }
})
    .from("#magic-cards img", {
        opacity: 0,
        top: "500px",
        stagger: 0.1
    })


// Modifier Cards Animimation
gsap.timeline({
    scrollTrigger: {
        trigger: "#modifier-cards",
        toggleActions: playActions,
        start: "top 50%",
        end: "bottom top",
        // markers: true,
    }
})
    .from("#modifier-cards img", {
        opacity: 0,
        top: "500px",
        stagger: 0.1
    })


// Challenge Cards Animimation
gsap.timeline({
    scrollTrigger: {
        trigger: "#challenge-cards",
        toggleActions: playActions,
        start: "top 50%",
        end: "bottom top",
        // markers: true,
    }
})
    .from("#challenge-2", {
        opacity: 0,
        top: "500px",
        duration: .25,
    },)
    .from("#challenge-0", {
        opacity: 0,
        left: "-500px",
        duration: .25,
        ease: "back"
    }, .1)
    .from("#challenge-1", {
        opacity: 0,
        left: "500px",
        duration: .25,
        ease: "back"
    }, .1)


// CTA-1 Animation
gsap.timeline({
    scrollTrigger: {
        trigger: "#cta-2",
        toggleActions: playActions,
        start: "top 50%",
        end: "bottom top",
        // markers: true,
    }
})
    .from("#cta-2-product", {
        opacity: 0,
        left: "-100px",
        duration: 1,
    })
    .from("#cta-2-character", {
        opacity: 0,
        left: "-100px",
        duration: .25,
    }, .5)