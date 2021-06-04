# Magento 2 REST API for Node via Axios

## Features
* Supports both integration access token and admin username / password authentication
* Includes basic GET/POST/PUT/DELETE http methods
* Simplified searchCriteria arguments
* Helpers are included to make it easier to initialize api requests. More helpers will be added to the library.

## Initialization
```
const Magento2 = require('magento2-rest');

// Either login or integration attribute is needed
// Recommend to use integration access token for performance issue
// using admin username and password will have one extra api request to get the integration token
//
Magento2.authentication = {
  login: {
    username:  "YOUR_MAGENTO2_ADMIN_USERNAME",
    password:  "YOUR_MAGENTO2_ADMIN_PASSWORD"
  },
  integration: {
    access_token:"ACCESS_TOKEN_FROM_INTEGRATION_ADMIN_SECTION"
  }
}

// Your magento2 store url + '/rest/V1'
//
Magento2.storeRestUrl = "YOUR_MAGENTO_STORE_REST_URL";

// Initialize Helpers - It is not required if helper is not used
//
Magento2.initHelpers();
```

## How to Use
**Examples on basic usage without helpers**
```
// Basic GET examples on products
//
// options are the search criteria parameters
// Possible attributes: `filter`, `sort`, `pageSize`, `currentPage`, `projection`
// 
// Options examples:
// - filter: [{ field: "name", value: "hello", condition_type: "like" }, { field: "id", value: "5", condition_type: "eq" }]
// - sort: { name: 1, id: -1 } 1 is ASC, -1 is DESC
// - projection: [name,id,type]
//
await Magento2.get("/products", {
  filter: [{ field: "name", value: "hello", condition_type: "like" }, { field: "id", value: "5", condition_type: "eq" }],
  sort: { name: 1, sku: -1 },
  projection: [name,sku,price],
  currentPage: 2,
  pageSize: 20
});

// Basic POST example on coupons
//
await Magento2.post("/coupons", data);

// Basic PUT example on salesRules
//
await Magento2.put("/salesRules/SALESRULES_ID", data);

// Basic DELETE example on coupons
//
await Magento2.delete("/coupons/COUPON_ID");

```
**Examples on usage with helpers**
(Note: Only Coupons and SalesRules Helpers are included at this moment. More are coming)
```
// GET Coupon data by ID
//
await Magento2.coupons.getById("10");

// Get Coupon data by search criteria
//
await Magento2.coupons.get({
  filter: [{ field: "code", value: "%RE%", condition_type: "like" }],
  pageSize: 5,
  currentPage: 2
});

// Create a new Coupon
//
await Magento2.coupons.create(data);

// Update a coupon
//
await Magento2.coupons.update(couponID, data);

// Delete a coupon
//
await Magento2.coupons.delete(couponID);
```