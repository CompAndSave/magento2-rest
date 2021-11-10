'use strict';

const path = "/orders";

/**
 * Orders helper
 * 
 * Functions:
 * - Magento2.orders.get() | search order by search criteria
 * - Magento2.orders.getById() | get order by order id
 * - Magento2.orders.create() | create a new order
 * - Magento2.orders.getItem() | list order items by search criteria
 * - Magento2.orders.getItemById() | get order item by orderitem id
 * - Magento2.orders.cancel() | cancel an order
 * - Magento2.orders.addComment() | add an order comment
 * - Magento2.orders.listComment() | list comments for an order
 * - Magento2.orders.email() | email an order to customer
 * - Magento2.orders.hold() | hold an order
 * - Magento2.orders.unhold() | unhold an order
 * - Magento2.orders.getStatus() | get status for an order
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    get: (options)=> service.get(path, options),
    getById: (orderId)=> service.get(`${path}/${orderId}`),
    create: (data)=> service.post(path, data),
    getItem: (options)=> service.get(`${path}/items`, options),
    getItemById: (itemId)=> service.get(`${path}/items/${itemId}`),
    cancel: (orderId)=> service.post(`${path}/${orderId}/cancel`),
    addComment: (orderId)=> service.post(`${path}/${orderId}/comments`),
    listComment: (orderId)=> service.get(`${path}/${orderId}/comments`),
    email: (orderId)=> service.post(`${path}/${orderId}/emails`),
    hold: (orderId)=> service.post(`${path}/${orderId}/hold`),
    unhold: (orderId)=> service.post(`${path}/${orderId}/unhold`),
    getStatus: (orderId)=> service.get(`${path}/${orderId}/statuses`)
  };
}