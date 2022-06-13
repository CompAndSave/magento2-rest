'use strict';

const axios = require('axios');

const ADMIN_TOKEN_PATH = "/integration/admin/token";

class Magento2 {

  /**
   * @class
   * @classdesc Library with Magento 2 toolsets
   * 
   * Note:
   * - Recommend to use integration access token for performance issue
   * - Using admin username and password will have one extra api request to get the integration token
   * 
   * @param {string} storeRestUrl Magento2 store REST URL. E.g, https://www.yourstore.url/rest/V1
   * @param {object} authentication Authentication object
   */
  constructor(storeRestUrl, authentication) {
    Magento2.storeRestUrl = storeRestUrl;
    Magento2.authentication = authentication;
  }

  /**
   * Initialize the helpers
   */
  static initHelpers() {
    Magento2.cache = require("./lib/cache")(Magento2);
    Magento2.coupons = require("./lib/coupons")(Magento2);
    Magento2.indexer = require("./lib/indexer")(Magento2);
    Magento2.invoice = require("./lib/invoice")(Magento2);
    Magento2.order = require("./lib/order")(Magento2);
    Magento2.orders = require("./lib/orders")(Magento2);
    Magento2.orderDetails = require("./lib/orderDetails")(Magento2);
    Magento2.orderStatus = require("./lib/orderStatus")(Magento2);
    Magento2.products = require("./lib/products")(Magento2);
    Magento2.salesRules = require("./lib/salesRules")(Magento2);
    Magento2.shipment = require("./lib/shipment")(Magento2);
  }

  /**
   * GET request via M2 api
   * 
   * Reference: {@link https://devdocs.magento.com/guides/v2.4/rest/performing-searches.html}
   * 
   * Options examples:
   * - filter: [{ field: "name", value: "hello", condition_type: "like" }, { field: "id", value: "5", condition_type: "eq" }]
   * - sort: { name: 1, id: -1 }  1 is ASC, -1 is DESC
   * - projection: [name,id,type]
   * 
   * @param {string} path API url path
   * @param {object} options Parameter for searchCriteria. Possible attributes: `filter`, `sort`, `pageSize`, `currentPage`, `projection`
   * @returns {promise} Promise with response object
   */
  static async get(path, options) { return Promise.resolve(await Magento2._send("GET", `${path}${typeof options === "undefined" ? "" : ("?" + Magento2._getParams(options))}`)); }

  /**
   * POST request via M2 api
   * 
   * @param {string} path API url path 
   * @param {object} data Data request
   * @returns {promise} Promise with response object
   */
  static async post(path, data) { return Promise.resolve(await Magento2._send("POST", path, data)); }

  /**
   * PUT request via M2 api
   * 
   * @param {string} path API url path 
   * @param {object} data Data request
   * @returns {promise} Promise with response object
   */
  static async put(path, data) { return Promise.resolve(await Magento2._send("PUT", path, data)); }

  /**
   * DELETE request via M2 api
   * 
   * @param {string} path API url path 
   * @returns {promise} Promise with response object
   */
  static async delete(path) { return Promise.resolve(await Magento2._send("DELETE", path)); }

  /**
   * Private function for settting access token
   * 
   * @returns {promise}
   */
  static async _setAccessToken() {
    if (typeof Magento2.authentication.integration !== "undefined" && typeof Magento2.authentication.integration.access_token === "string") {
      Magento2.accessToken = Magento2.authentication.integration.access_token;
      return Promise.resolve();
    }

    if (typeof Magento2.authentication.login === "undefined" || typeof Magento2.authentication.login === "undefined"
        || typeof Magento2.authentication.login.username !== "string" || typeof Magento2.authentication.login.password !== "string") {
      return Promise.reject("Invalid or missing authentication info");
    }

    let error;
    await axios({
      method: "POST",
      url: `${Magento2.storeRestUrl}${ADMIN_TOKEN_PATH}`,
      data: Magento2.authentication.login
    })
    .then(response => Magento2.accessToken = response.data)
    .catch(err => error = err);

    if (typeof error !== "undefined") {
      return Promise.reject(error.response && error.response.data && error.response.data.message ? error.response.data.message : error);
    }

    return Promise.resolve();
  }

  /**
   * Private function to send api request
   * 
   * @param {string} method API method. E.g., `GET`, `POST`, `PUT`, `DELETE` and etc
   * @param {string} path API url path
   * @param {*} data Data body
   * @returns {promise} Promise with response object
   */
  static async _send(method, path, data) {
    await Magento2._setAccessToken();

    let error, result = await axios({
      method: method,
      url: `${Magento2.storeRestUrl}${path}`,
      data: data,
      headers: { Authorization: `Bearer ${Magento2.accessToken}` }
    }).catch(err => error = err);

    // Replace the parameter(s) at M2 returned message
    //
    if (typeof error !== "undefined") {
      let message = error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message;
      let parameters = error.response && error.response.data && error.response.data.parameters ? error.response.data.parameters : undefined;

      if (typeof parameters !== "undefined") {
        let parameter, regex = /%([\w\d]+)(?!\w\d%)/g;
        do {
          parameter = regex.exec(message);
          if (parameter && Array.isArray(parameters)) { parameter[1] = Number(parameter[1]) - 1; }
          if (parameter) { message = message.replace(new RegExp(parameter[0]), parameters[parameter[1]]) }
        }
        while (parameter !== null);
      }

      return Promise.reject(message);
    }
    
    return Promise.resolve(result.data);
  }
  
  /**
   * Return searchCriteria string
   * 
   * Reference: {@link https://devdocs.magento.com/guides/v2.4/rest/performing-searches.html}
   * 
   * Options examples:
   * - filter: [{ field: "name", value: "hello", condition_type: "like" }, { field: "id", value: "5", condition_type: "eq" }]
   * - sort: { name: 1, id: -1 }  1 is ASC, -1 is DESC
   * - projection: [name,id,type]
   * 
   * @param {object} options Parameter for searchCriteria. Possible attributes: `filter`, `sort`, `pageSize`, `currentPage`, `projection`
   * @returns {string} searchCriteria string
   */
  static _getParams(options) {
    if (typeof options === "undefined") { return ""; }

    let params = "", keys;
    if (Array.isArray(options.filter)) {
      for (let i = 0; i < options.filter.length; ++i) {
        if (i > 0) { params += "&"; }
        params += `searchCriteria[filter_groups][${i}][filters][${i}][field]=${options.filter[i].field}`;
        params += `&searchCriteria[filter_groups][${i}][filters][${i}][value]=${options.filter[i].value}`;
        params += `&searchCriteria[filter_groups][${i}][filters][${i}][condition_type]=${options.filter[i].condition_type}`;
      }
    }

    if (typeof options.sort !== "undefined") {
      keys = Object.keys(options.sort);
      for (let i = 0; i < keys.length; ++i) {
        if (params !== "" || i > 0) { params += "&"; }
        params += `searchCriteria[sortOrders][${i}][field]=${keys[i]}`;
        if (options.sort[keys[i]] !== -1) { params += `&searchCriteria[sortOrders][${i}][direction]=ASC`; }
      }
    }

    if (typeof options.pageSize !== "undefined") { params += `${params !== "" ? "&" : ""}searchCriteria[pageSize]=${options.pageSize}`; }
    if (typeof options.currentPage !== "undefined") { params += `${params !== "" ? "&" : ""}searchCriteria[currentPage]=${options.currentPage}`; }
    if (typeof options.projection === "string") { params += `${params !== "" ? "&" : ""}fields=items${options.projection}`; }
    
    return params;
  }
}

module.exports = Magento2;