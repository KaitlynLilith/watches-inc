import { getJSON } from "./helpers.js";
import { API_URL, RES_PER_PAGE, KEY } from "./config.js";

export const state = {
  contactUs: [],
  faqs: [],
  retailers: [],
  promoted: [],
  categories: [],
  watch: {},
  search: {
    query: [],
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  thumbnails: [],
  pageInfo: {},
  bookmarks: [],
};

function clearBookmarks() {
  localStorage.clear("watches-inc");
}
// clearBookmarks();

export async function loadLocalStorage() {
  try {
    const data = localStorage.getItem("watches-inc");
    if (!data) return;
    state.bookmarks = JSON.parse(data);
    state.bookmarks.forEach((item) => markBookmarks(item));
  } catch (err) {
    throw err;
  }
}

export async function addBookmark(id) {
  try {
    const data = await getJSON(`${API_URL}thumbnails?id=${id}&key=${KEY}`);
    if (data) state.bookmarks.push(data);
    state.promoted.forEach((item) => markBookmarks(item));
    state.thumbnails.forEach((item) =>
      item.forEach((item) => markBookmarks(item))
    );
    state.search.results.forEach((item) => markBookmarks(item));
    markBookmarks(state.watch);
    persistBookmarks();
  } catch (err) {
    throw err;
  }
}

export async function removeBookmark(id) {
  try {
    const index = state.bookmarks.findIndex((el) => el.id === id);
    state.bookmarks.splice(index, 1);
    state.promoted.forEach((item) => markBookmarks(item));
    state.thumbnails.forEach((item) => item.forEach((el) => markBookmarks(el)));
    state.search.results.forEach((item) => markBookmarks(item));
    markBookmarks(state.watch);
    persistBookmarks();
  } catch (err) {
    throw err;
  }
}

function markBookmarks(item) {
  if (state.bookmarks.some((bookmark) => bookmark.id === item.id)) {
    item.bookmarked = true;
  } else {
    item.bookmarked = false;
  }
}

function persistBookmarks() {
  localStorage.setItem("watches-inc", JSON.stringify(state.bookmarks));
}

export async function loadCategories() {
  try {
    const data = await getJSON(`${API_URL}categories?key=${KEY}`);
    if (data) state.categories = data;
  } catch (err) {
    throw err;
  }
}

export async function loadPageInfo() {
  try {
    const [data] = await getJSON(`${API_URL}pageInfo?key=${KEY}`);
    if (data) state.pageInfo = data;
  } catch (err) {
    throw err;
  }
}

export async function loadFAQs() {
  try {
    const data = await getJSON(`${API_URL}faqs?key=${KEY}`);
    if (data) state.faqs = data;
  } catch (err) {
    throw err;
  }
}

export async function loadRetailers() {
  try {
    const data = await getJSON(`${API_URL}retailers?key=${KEY}`);
    if (data) state.retailers = data;
  } catch (err) {
    throw err;
  }
}

export async function loadContactUs() {
  try {
    const data = await getJSON(`${API_URL}contactUs?key=${KEY}`);
    if (data) state.contactUs = data;
  } catch (err) {
    throw err;
  }
}

export async function loadPromoted() {
  try {
    const data = await getJSON(`${API_URL}thumbnails?promote=yes&key=${KEY}`);

    if (data) state.promoted = data;
    state.promoted.forEach((item) => markBookmarks(item));
  } catch (err) {
    throw err;
  }
}

export async function loadThumbnailsByCategory(category) {
  try {
    const data = await getJSON(`${API_URL}thumbnails/${category}?key=${KEY}`);
    if (data) state.thumbnails[category] = data;
    state.thumbnails[category].forEach((item) => markBookmarks(item));
  } catch (err) {
    throw err;
  }
}

export async function loadWatch(id) {
  try {
    const data = await getJSON(`${API_URL}products/${id}?key=${KEY}`);

    state.watch = {
      id: data.id,
      name: data.name,
      category: data.category,
      price: data.price,
      sale: data.sale,
      url: data.url,
      dataWatch: data.dataWatch,
      shortDesc: data.shortDesc,
      topInfo: data.topInfo,
      features: data.features,
      techSpecs: data.techSpecs,
      movement: data.movement,
      movementImg: data.movementImg,
      movementAlt: data.movementAlt,
      science: data.science,
      scienceImg: data.scienceImg,
      scienceAlt: data.scienceAlt,
      tags: data.tags,
    };

    markBookmarks(state.watch);
  } catch (err) {
    throw err;
  }
}

export async function loadSearchResults(query) {
  try {
    state.search.query = query.toLowerCase().split(/[\W+]/);
    console.log(state.search.query);
    const tagStr = state.search.query
      .map((item) => {
        return `tags=${item}&`;
      })
      .join("");
    console.log(tagStr);
    console.log(`${API_URL}thumbnails?${tagStr}key=${KEY}`);
    const data = await getJSON(`${API_URL}thumbnails?${tagStr}key=${KEY}`);
    state.search.results = data;

    state.search.results.forEach((item) => markBookmarks(item));
    console.log(state.search.results);
  } catch (err) {
    throw err;
  }
}
