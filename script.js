const container = document.querySelector(".container");
const loader = document.querySelector(".loader");
let imageArray = [];
let ready = false;
let totalImageLoaded = 0;
let totalImage = 0;

// Setting attribute for each of the element in the DOM
function setAttributes(item, attributes) {
  for (const key in attributes) {
    item.setAttribute(key, attributes[key]);
  }
}

// Load more images when we reach the bottom of the page
function imageLoaded() {
  loader.hidden = true;
  totalImageLoaded++;

  if ((totalImage = totalImageLoaded)) {
    ready = true;
  }
}

// Load images based on the data recieved from unsplash API
function loadImage() {
  imageArray.forEach((api) => {
    totalImage++;
    const imageUrl = api.urls.regular;
    const alt = api.alt_description;
    const userLink = api.user.links.html;
    const imageLink = api.links.html;

    // Create Image element and append that in the DOM
    const image = document.createElement("img");
    const link = document.createElement("a");

    // Link Attributes
    setAttributes(link, {
      href: imageLink,
      target: "_blank",
    });

    // image attributes
    setAttributes(image, {
      src: imageUrl,
      alt: alt,
      title: alt,
    });

    image.addEventListener("load", () => {
      imageLoaded();
    });

    // Append to the DOM
    container.append(link);
    link.append(image);
  });
}

async function getImage() {
  const apiToken = "1vf08jjj7w0wse_Mz5JZXCk9E4YjtcHsWQdk91rKGkw";
  const photoCount = 10;
  const api_url = `https://api.unsplash.com/photos/random?client_id=${apiToken}&count=${photoCount}`;

  const request = await fetch(api_url);
  imageArray = await request.json();

  loadImage();
}

getImage();

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getImage();
    ready = false;
  }
});
