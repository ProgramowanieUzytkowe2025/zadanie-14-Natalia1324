const API_BASE_URL = "http://localhost:8000";

let loaderHandlers = {
  show: () => {},
  hide: () => {},
};

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const registerLoader = (show, hide) => {
  loaderHandlers.show = show;
  loaderHandlers.hide = hide;
};

async function fetchWithLoader(url, options) {
  loaderHandlers.show();

  try {
    const response = await fetch(url, options);
    await sleep(200);
    if (!response.ok) {
      throw new Error("Błąd WebAPI");
    }

    return await response.json();
  } finally {
    loaderHandlers.hide();
  }
}


class Api {
  static getKoty(doAdopcji = null) {
    let url = `${API_BASE_URL}/koty`;

    if (doAdopcji !== null) {
      url += `?doAdopcji=${doAdopcji}`;
    }

    return fetchWithLoader(url);
  }

  static getKot(id) {
    return fetchWithLoader(`${API_BASE_URL}/koty/${id}`);
  }

  static createKot(kot) {
    return fetchWithLoader(`${API_BASE_URL}/koty`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(kot),
    });
  }

  static updateKot(id, kot) {
    return fetchWithLoader(`${API_BASE_URL}/koty/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(kot),
    });
  }

  static deleteKot(id) {
    return fetchWithLoader(`${API_BASE_URL}/koty/${id}`, {
      method: "DELETE",
    });
  }
}

export default Api;
