/**
 * @typedef {object} preview
 * @property {string} id
 * @property {string} title
 * @property {number} seasons
 * @property {string} image
 * @property {string[]} genres
 * @property {string} updated
 */

/**
 * @typedef {object} episode
 * @property {number} episode
 * @property {string} description
 * @property {string} title
 * @property {string} file
 */

/**
 * @typedef {object} season
 * @property {number} season
 * @property {string} title
 * @property {string} image
 * @property {episode[]} episodes
 *
 */

/**
 * @typedef {object} show
 * @property {string} id
 * @property {string} title
 * @property {season[]} seasons
 * @property {string} image
 * @property {string[]} genres
 * @property {string} updated
 */

const listHtml = document.querySelector("#list");

const getAllPodcasts = async () => {
  listHtml.innerHTML = `Loading...`;

  const response = await fetch("https://podcast-api.netlify.app/shows");

  if (!response.ok) {
    listHtml.innerText = "Something went wrong!";
    return;
  }

  /**
   * @type {preview[]}
   */
  const data = await response.json();

  let newHtml = "";

  for (const { id, title, seasons, image, updated, genres } of data) {
    let genreList;
    if (genres) {
      genreList = genres.map((genre) => {
        return `<button type="button" class="btn btn-link" data-genre-button="${genre}">${genre}</button>`;
      });
    } else {
      genreList = '<div class="mb-2"></div>';
    }
    newHtml = `
            ${newHtml} 
                <li>
                    <img src="${image}" alt="show image" width="100px" />
                    <button data-preview-button="${id}">${title}</button> 
                    <span>(${seasons})</span>
                    <span>${updated}</span>
                    <div>
                        ${genreList}
                    </div>
                </li>
        `;
  }

  listHtml.innerHTML = newHtml;
};

/**
 * @param {string} id
 */
const getSinglePodcast = async (id) => {
  listHtml.innerHTML = `Loading...`;

  const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);

  if (!response.ok) {
    listHtml.innerHTML = "Something wrong!";
    return;
  }

  /**
   * @type {show}
   */
  const data = await response.json();

  let seasonsList = "";

  for (const { image, title, season } of data.seasons) {
    seasonsList = `
            ${seasonsList}

            <li>
                <img src="${image}" width="100" height="100">
                <button data-episode-button="${season}, ${id}">${title}</button>
            </li>
        `;
  }

  listHtml.innerHTML = `
        <button data-action="back">👈 BACK</button>
        <h2>${data.title}<h2>
        <ul>${seasonsList}</ul>
    `;
};

const getSingleSeason = async (myData) => {
  listHtml.innerHTML = `Loading...`;

  const dataArray = myData.split(", ");
  const season = dataArray[0];
  const id = dataArray[1];

  const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);

  if (!response.ok) {
    listHtml.innerHTML = "Something wrong!";
    return;
  }

  /**
   * @type {show}
   */
  const data = await response.json();
  const episodes = data.seasons.find(
    (singleSeason) => season == singleSeason.season
  ).episodes;

  let newHtml = "";

  for (const { title, description, episode, file } of episodes) {
    newHtml = `
            ${newHtml} 
                <li>
                    <h4>${title} <span> (Episode: ${episode})</span></h4> 
                    <p>(${description})</p>
                    <audio controls>
                        <source src="${file}" type="audio/mp3">
                    </audio>
                </li>
        `;
  }

  listHtml.innerHTML = newHtml;
};

const getAllInGenre = async (genre) => {
  listHtml.innerHTML = `Loading...`;

  const response = await fetch("https://podcast-api.netlify.app/shows");

  if (!response.ok) {
    listHtml.innerText = "Something went wrong!";
    return;
  }

  /**
   * @type {preview[]}
   */
  let data = await response.json();
  data = data.filter(
    (allData) => allData.genres && allData.genres.includes(genre)
  );

  console.log(data);

  let newHtml = "";

  for (const { id, title, seasons, image, updated, genres } of data) {
    let genreList;
    if (genres) {
      genreList = genres.map((genre) => {
        return `<button type="button" class="btn btn-link" data-genre-button>${genre}</button>`;
      });
    } else {
      genreList = '<div class="mb-2"></div>';
    }
    newHtml = `
              ${newHtml} 
                  <li>
                      <img src="${image}" alt="show image" width="100px" />
                      <button data-preview-button="${id}">${title}</button> 
                      <span>(${seasons})</span>
                      <span>${updated}</span>
                      <div>
                          ${genreList}
                      </div>
                  </li>
          `;
  }

  listHtml.innerHTML = newHtml;
};

document.body.addEventListener("click", (event) => {
  const { previewButton, action, episodeButton, genreButton} =
    event.target.dataset;

  if (action && action === "back") {
    getAllPodcasts();
    return;
  }

  if (previewButton) {
    getSinglePodcast(previewButton);
  } else if (episodeButton) {
    getSingleSeason(episodeButton);
  } else if (genreButton) {
    getAllInGenre(genreButton);
  } else {
    return;
  }
});

getAllPodcasts();
