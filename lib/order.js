'use strict';

const path = "/order";

/**
 * Order helper
 * 
 * Functions:
 * - Magento2.order.invoice() | create invoice
 * - Magento2.order.refund() | refund an order
 * - Magento2.order.ship() | ship an order
 * - Magento2.order.ships() | ship an order - Customized endpoint - supports multiple shipments update
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    invoice: (orderId, data)=> service.post(`${path}/${orderId}/invoice`, data),
    refund: (orderId, data)=> service.post(`${path}/${orderId}/refund`, data),
    ship: (orderId, data)=> service.post(`${path}/${orderId}/ship`, data),
    ships: (data)=> service.post(`${path}-ship`, data)
  };
}