//const baseUri = "https://todo-app-evandro-nova.herokuapp.com/";
const baseUri = "http://10.207.58.198:8080/";

export const item = {
  get: baseUri + "item/",
  search: baseUri + "v2/item/",
  put: baseUri + "item/",
  patch: baseUri + "item/",
  getEvents: baseUri + "v2/item/",
  post: baseUri + "item/",
  delete: baseUri + "item/",
};
