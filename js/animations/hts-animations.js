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
    let preloadImages = () => {
        for (let i = 1; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
        }
    };

    preloadImages();

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

})

const mainBanner = document.querySelector("#mb-thief");

// Main Banner Animation
function init() {
    console.log("triggered")
    gsap.timeline({
    scrollTrigger: {
        trigger: ".main-banner",
        toggleActions: "play reset play complete",
        start: "top 50%",
        end: "bottom top",
        // markers: true,
    }
})
    .from(".main-banner", {autoAlpha:0})
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
}

mainBanner.addEventListener("load", function() {
    init();
})

// HTS Product Image Animation
gsap.timeline({
    scrollTrigger: {
        trigger: "#product-image",
        toggleActions: "play reset play complete",
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
        toggleActions: "play reset play complete",
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
        toggleActions: "play reset play complete",
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
        toggleActions: "play reset play complete",
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
        toggleActions: "play reset play complete",
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
        toggleActions: "play reset play complete",
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
        toggleActions: "play reset play complete",
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
        toggleActions: "play reset play complete",
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
        toggleActions: "play reset play complete",
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
        toggleActions: "play reset play complete",
        start: "top 50%",
        end: "bottom top",
        // markers: true,
    }
})
    .from("#challenge-0", {
        opacity: 0,
        left: "-500px",
        duration: .25,
        ease: "back"
    })
    .from("#challenge-1", {
        opacity: 0,
        left: "500px",
        duration: .25,
        ease: "back"
    }, 0)
    .from("#challenge-2", {
        opacity: 0,
        top: "500px",
        duration: .25,
    }, .1)


// CTA-1 Animation
gsap.timeline({
    scrollTrigger: {
        trigger: "#cta-2",
        toggleActions: "play reset play complete",
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