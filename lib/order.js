'use strict';

const path = "/order";

/**
 * Order helper
 * 
 * Functions:
 * - Magento2.order.invoice() | create invoice
 * - Magento2.order.refund() | refund an order
 * - Magento2.order.ship() | ship an order
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    invoice: (orderId)=> service.post(`${path}/${orderId}/invoice`),
    refund: (orderId)=> service.post(`${path}/${orderId}/refund`),
    ship: (orderId)=> service.post(`${path}/${orderId}/ship`)
  };
}