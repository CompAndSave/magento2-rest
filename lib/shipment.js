'use strict';

const path = "/shipment";

/**
 * Shipment helper
 * 
 * Functions:
 * - Magento2.shipment.getById() | get shipment details by id
 * - Magento2.shipment.get() | get shipments by searchCriteria
 * - Magento2.shipment.create() | create a new shipment
 * - Magento2.shipment.createTrack() | create a new shipment track
 * - Magento2.salesRules.deleteTrack() | delete a shipment track
 * - Magento2.shipment.email() | email user a specified shipment
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    getById: (shipmentId)=> service.get(`${path}/${shipmentId}`),
    get: (options)=> service.get(`${path}s/search`, options),
    create: (data)=> service.post(path, data),
    createTrack: (data)=> service.post(`${path}/track`, data),
    deleteTrack: (trackId)=> service.delete(`${path}/track/${trackId}`),
    email: (shipmentId, emails)=> service.post(`${path}/${shipmentId}/${emails}`)    
  };
}