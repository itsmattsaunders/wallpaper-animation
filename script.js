//Grab the HTML and assign to variable.
const html = document.documentElement;

//Grabbing the canvas by it's element ID.
const canvas = document.getElementById("hero-lightpass");

//UNSURE WHAT THESE DO.
const context = canvas.getContext("2d");

//The number of frames for the animation.
const frameCount = 148;
//The current frame of the animation wallpaper.
const currentFrame = index => (
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
)

//Pre load images for smoother animations on fast scrolling.
const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

// Create, load and draw the image
const img = new Image()
img.src = currentFrame(1); // we'll make this dynamic in the next step, for now we'll just load image 1 of our sequence

// Set canvas dimensions
canvas.width = 1158;
canvas.height = 770;
img.onload = function () {
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {

  //Scrolltop to get vertical position of element.
  //This serves as starting point value (0).
  const scrollTop = html.scrollTop;

  //Get the max value of the window by subtracting the window height from the scroll height, this gives us the scroll progress of the user.
  const maxScrollTop = html.scrollHeight - window.innerHeight;

  //Divide the scrollTop value by the max value of the window.
  //This gives us the user's scroll progress.
  const scrollFraction = scrollTop / maxScrollTop;

  //Get the index number of the wallpaper image we need.
  //This is done by multiplying the scroll progress by the number of frames we have.
  //Math.floor rounds the numner down.
  //Math.min so the number never exceeds he total number of images.
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  //requestAnimationFrame works with the browser to generate smooth animations.
  //requestAnumationFrame takes an argument, so pass a function in that will update the image source and update the canvas.
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});



preloadImages();