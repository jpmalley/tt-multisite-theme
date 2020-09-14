gsap.registerPlugin(ScrollTrigger);

// BEGIN WORKING CODE - working gsap controller for one canvas element

// const canvas = document.getElementById("hts-animation-0");
// const context = canvas.getContext("2d");
// const dpi = window.devicePixelRatio;

// const frameCount = 124;
// const currentFrame = index => (`img/animation/hts-sequence-${index.toString()}.jpg`);
// const images = []
// const canvasFrames = {frame: 0};

// for (let i = 0; i < frameCount; i++) {
//     const img = new Image();
//     img.src = currentFrame(i);
//     images.push(img);
// }

// gsap.to(canvasFrames, {
//     frame: frameCount - 1,
//     snap: "frame",
//     scrollTrigger: {
//         scrub: 0.5,
//         markers: true,
//         pin: canvas,
//         pinSpacing: "margin",
//     },
//     onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
// });

// images[0].onload = render;

// function render() {
//     fix_dpi()
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.drawImage(images[canvasFrames.frame], 0, 0, canvas.width, canvas.height);
// }

// function fix_dpi() {
//     let style = {
//         height() {
//             return +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
//         },
//         width() {
//             return +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
//         }
//     }
//     //set the correct attributes for a crystal clear image!
//     canvas.setAttribute('width', style.width() * dpi);
//     canvas.setAttribute('height', style.height() * dpi);
// }

// END WORKING CODE


// BEGIN WORKING CODE - working gsap controller for multiple canvas elements

const canvasElements = document.querySelectorAll(".animation");
const dpi = window.devicePixelRatio;

canvasElements.forEach((canvas) => {
    let context = canvas.getContext("2d");
    let sceneName = canvas.getAttribute("data-scene");
    let frameCount = canvas.getAttribute("data-frame-count");
    let currentFrame = frameIndex => (`img/animation/${sceneName}/frame-${frameIndex.toString().padStart(3, "0")}.jpg`);
    let images = [];
    let canvasFrames = { frame: 0 };

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

gsap.timeline({scrollTrigger:{
    trigger:".layered-png",
    toggleActions: "play reset play complete",
	start:"top 50%",
	end:"bottom top",
	// markers:true,
}})
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