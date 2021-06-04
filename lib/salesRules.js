'use strict';

const path = "/salesRules";

/**
 * SalesRules helper
 * 
 * Functions:
 * - Magento2.salesRules.getById() | get salesRule details by rule id
 * - Magento2.salesRules.get() | get salesRules by searchCriteria
 * - Magento2.salesRules.create() | create a new salesRule
 * - Magento2.salesRules.update() | update a salesRule
 * - Magento2.salesRules.delete() | delete a salesRule
 * 
 * @param {Magento2} service Magento2 static class
 * @returns {object} Object of functions
 */
module.exports = (service)=> {
  return {
    getById: (ruleId)=> service.get(`${path}/${ruleId}`),
    get: (options)=> service.get(`${path}/search`, options),
    create: (data)=> service.post(path, data),
    update: (ruleId, data)=> service.put(`${path}/${ruleId}`, data),
    delete: (ruleId)=> service.delete(`${path}/${ruleId}`)
  };
}