'use strict';

const path = "/products";

/**
 * Products helper
 * 
 * Functions:
 * - Magento2.products.getById() | get product details by sku
 * - Magento2.products.get() | get products by searchCriteria
 * - Magento2.products.create() | create a new product
 * - Magento2.products.update() | update a product
 * - Magento2.products.delete() | delete a product
 * - Magento2.products.setStockItems() | set stockItems of a product
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    getById: (sku)=> service.get(`${path}/${sku}`),
    get: (options)=> service.get(path, options),
    create: (data)=> service.post(path, data),
    update: (sku, data)=> service.put(`${path}/${sku}`, data),
    delete: (sku)=> service.delete(`${path}/${sku}`),
    setStockItems: (sku, data)=> service.put(`${path}/${sku}/stockItems/1`, data)
  };
}