// API Root
const apiRoot = "https://api.unsplash.com";

// Number of random images to fetch
const count = 10;

// API Key from unsplash.com
const accessKey = '783f46460ebede7f21f34b84eb80206e27d042af75812821ffbcd17828afee3f';

// Full API endpoint with template literals
const apiEndpoint = `${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`;

const loader = document.querySelector('.loader');

async function getResponse() {
  const pro = await fetch(apiEndpoint);
  return pro;
}

getResponse();
// console.log(getResponse())

const loadMore = () => {
  const photos = [];
  loader.style.display = "block";
  getResponse()
    .then(res => res.json())
    .then(data => {
    addDom(data)
    loader.style.display = "none";
  })
  .catch(err => {
    console.log(err)
  })
}

const addDom = (data) => {
  const photos = [...data]; 
  console.log(photos);
  const parent = document.querySelector('.gallery');
  
  photos.forEach(photo => {
    const markUp = `
          <div class="gallery__item">
            <a href="${photo.links.download}"></a>
            <img src="${photo.urls.regular}" alt="${photo.id}" class="gallery__img">
          </div>
      `;
  parent.insertAdjacentHTML('beforeend', markUp) 
  })
}

window.addEventListener('scroll', function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
    loadMore();
  }
});

loadMore();