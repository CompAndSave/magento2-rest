'use strict';

const path = "/coupons";

/**
 * Coupons helper
 * 
 * Functions:
 * - Magento2.coupons.getById() | get coupons details by rule id
 * - Magento2.coupons.get() | get coupons by searchCriteria
 * - Magento2.coupons.create() | create a new coupon
 * - Magento2.coupons.update() | update a coupon
 * - Magento2.coupons.delete() | delete a coupon
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    getById: (couponId)=> service.get(`${path}/${couponId}`),
    get: (options)=> service.get(`${path}/search`, options),
    create: (data)=> service.post(path, data),
    update: (couponId, data)=> service.put(`${path}/${couponId}`, data),
    delete: (couponId)=> service.delete(`${path}/${couponId}`)
  };
}