gsap.registerPlugin(ScrollTrigger);

const canvasElements = document.querySelectorAll(".animation");
const dpi = window.devicePixelRatio;
let smBreakpoint = window.matchMedia("(max-width: 575.98px)");
let startString = "top 90%";

canvasElements.forEach((canvas) => {
    let context = canvas.getContext("2d");
    let sceneName = canvas.getAttribute("data-scene");
    let frameCount = canvas.getAttribute("data-frame-count");
    let currentFrame = frameIndex => (`img/animation/${sceneName}/frame-${frameIndex.toString().padStart(3, "0")}.jpg`);
    let images = [];
    let canvasFrames = { frame: 0 };

    function render() {
        fix_dpi();
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

    function scrubMediaQuery(breakpoint) {
        if (breakpoint.matches) {
            let staticImg = new Image();
            staticImg.src = currentFrame(5);

            fix_dpi();
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
                    start: "top 40%",
                    trigger: canvas,
                    scrub: 0.5,
                    // markers: true,
                },
                onUpdate: render
            });

            images[0].onload = render;
        }
    }

    scrubMediaQuery(smBreakpoint);

})

function timelineMediaQuery(breakpoint) {
    if (breakpoint.matches) {
        startString = "top 95%";
    }
}

timelineMediaQuery(smBreakpoint);

let playOptions = "restart complete complete reset";

// HTS Product Image Animation
gsap.timeline({
    scrollTrigger: {
        trigger: "#hld-product",
        toggleActions: playOptions,
        start: startString,
        end: "bottom top",
        // markers: true,
    }
})
    .from("#hld-product", {
        opacity: 0,
        x: "-100px",
        duration: 1,
    })



// let waitForIt1 = document.getElementById('hld-1');

// waitForIt1.addEventListener('load', function() {
//     ScrollTrigger.refresh();
// })