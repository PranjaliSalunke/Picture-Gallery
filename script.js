const accessKey = 'yE_I_QIOEH5UW8U1B5NSAAxkkWpQwIKWTbIHEX8zQjM'; 

const categoryInput = document.getElementById('category-input');
const searchButton = document.getElementById('search-button');
const gallery = document.getElementById('gallery');

searchButton.addEventListener('click', searchPictures);

function searchPictures() {
  const category = categoryInput.value;
  const apiUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(category)}&per_page=9&client_id=${accessKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      gallery.innerHTML = '';

      data.results.forEach(result => {
        const picture = document.createElement('div');
        picture.classList.add('picture');

        const image = document.createElement('img');
        image.src = result.urls.regular;
        image.alt = result.alt_description;

        const details = document.createElement('div');
        details.classList.add('details');

        const author = document.createElement('p');
        author.innerText = `Author: ${result.user.name}`;

        const description = document.createElement('p');
        description.innerText = `Description: ${result.description || 'N/A'}`;

        const link = document.createElement('p');
        const linkText = document.createElement('a');
        linkText.href = result.links.html;
        linkText.target = '_blank';
        linkText.innerText = 'View on Unsplash';

        link.appendChild(linkText);

        details.appendChild(author);
        details.appendChild(description);
        details.appendChild(link);

        picture.appendChild(image);
        picture.appendChild(details);

        gallery.appendChild(picture);
    });
  })
  .catch(error => {
    console.log('Error:', error);
  });
}
