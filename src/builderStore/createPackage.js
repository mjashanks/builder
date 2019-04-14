 
export const createNewPackage = store => {
    store.set({
        hasAppPackage:true,
        heirarchy: testroot
    });
};

const testroot = {
  "name": "root",
  "type": "root",
  "children": [
    {
      "name": "settings",
      "type": "record",
      "fields": [
        {
          "name": "appName",
          "type": "string",
          "typeOptions": {
            "maxLength": null,
            "values": null,
            "allowDeclaredValuesOnly": false
          },
          "label": "appName",
          "getInitialValue": "default",
          "getUndefinedValue": "default"
        }
      ],
      "children": [],
      "validationRules": [],
      "recordNodeId": 0,
      "indexes": [],
      "allidsShardFactor": 64,
      "collectionName": "",
      "isSingle": true
    },
    {
      "name": "customer",
      "type": "record",
      "fields": [
        {
          "name": "surname",
          "type": "string",
          "typeOptions": {
            "maxLength": null,
            "values": null,
            "allowDeclaredValuesOnly": false
          },
          "label": "surname",
          "getInitialValue": "default",
          "getUndefinedValue": "default"
        },
        {
          "name": "isalive",
          "type": "bool",
          "typeOptions": {
            "allowNulls": true
          },
          "label": "isalive",
          "getInitialValue": "true",
          "getUndefinedValue": "default"
        },
        {
          "name": "createddate",
          "type": "datetime",
          "typeOptions": {
            "maxValue": "+275760-09-13T00:00:00.000Z",
            "minValue": "-271821-04-20T00:00:00.000Z"
          },
          "label": "createddate",
          "getInitialValue": "default",
          "getUndefinedValue": "default"
        },
        {
          "name": "age",
          "type": "number",
          "typeOptions": {
            "maxValue": 9007199254740991,
            "minValue": -9007199254740991,
            "decimalPlaces": 0
          },
          "label": "age",
          "getInitialValue": "default",
          "getUndefinedValue": "default"
        },
        {
          "name": "profilepic",
          "type": "file",
          "typeOptions": {},
          "label": "profilepic",
          "getInitialValue": "default",
          "getUndefinedValue": "default"
        },
        {
          "name": "partner",
          "type": "reference",
          "typeOptions": {
            "indexNodeKey": "/partnersReference",
            "displayValue": "name",
            "reverseIndexNodeKeys": [
              "/partners/2-{id}/partnerCustomers"
            ]
          },
          "label": "partner",
          "getInitialValue": "default",
          "getUndefinedValue": "default"
        },
        {
          "name": "referredBy",
          "type": "reference",
          "typeOptions": {
            "indexNodeKey": "/customer_index",
            "displayValue": "surname",
            "reverseIndexNodeKeys": [
              "/customers/1-{id}/referredToCustomers"
            ]
          },
          "label": "referredBy",
          "getInitialValue": "default",
          "getUndefinedValue": "default"
        }
      ],
      "children": [
        {
          "name": "invoice",
          "type": "record",
          "fields": [
            {
              "name": "totalIncVat",
              "type": "number",
              "typeOptions": {
                "maxValue": 9007199254740991,
                "minValue": -9007199254740991,
                "decimalPlaces": 2
              },
              "label": "totalIncVat",
              "getInitialValue": "default",
              "getUndefinedValue": "default"
            },
            {
              "name": "createdDate",
              "type": "datetime",
              "typeOptions": {
                "maxValue": "+275760-09-13T00:00:00.000Z",
                "minValue": "-271821-04-20T00:00:00.000Z"
              },
              "label": "createdDate",
              "getInitialValue": "default",
              "getUndefinedValue": "default"
            },
            {
              "name": "paidAmount",
              "type": "number",
              "typeOptions": {
                "maxValue": 9007199254740991,
                "minValue": -9007199254740991,
                "decimalPlaces": 0
              },
              "label": "paidAmount",
              "getInitialValue": "default",
              "getUndefinedValue": "default"
            },
            {
              "name": "invoiceType",
              "type": "string",
              "typeOptions": {
                "maxLength": null,
                "values": null,
                "allowDeclaredValuesOnly": false
              },
              "label": "invoiceType",
              "getInitialValue": "default",
              "getUndefinedValue": "default"
            },
            {
              "name": "isWrittenOff",
              "type": "bool",
              "typeOptions": {
                "allowNulls": true
              },
              "label": "isWrittenOff",
              "getInitialValue": "default",
              "getUndefinedValue": "default"
            },
            {
              "name": "customer",
              "type": "reference",
              "typeOptions": {
                "indexNodeKey": "/customersReference",
                "reverseIndexNodeKeys": [
                  "/customers/1-{id}/invoice_index"
                ],
                "displayValue": "name"
              },
              "label": "customer",
              "getInitialValue": "default",
              "getUndefinedValue": "default"
            }
          ],
          "children": [
            {
              "name": "charge",
              "type": "record",
              "fields": [
                {
                  "name": "amount",
                  "type": "number",
                  "typeOptions": {
                    "maxValue": 9007199254740991,
                    "minValue": -9007199254740991,
                    "decimalPlaces": 0
                  },
                  "label": "amount",
                  "getInitialValue": "default",
                  "getUndefinedValue": "default"
                },
                {
                  "name": "partnerInvoice",
                  "type": "reference",
                  "typeOptions": {
                    "reverseIndexNodeKeys": [
                      "/partners/2-{id}/invoices/3-{id}/partnerCharges"
                    ],
                    "displayValue": "createdDate",
                    "indexNodeKey": "/partners/2-{id}/partnerInvoices_index"
                  },
                  "label": "partnerInvoice",
                  "getInitialValue": "default",
                  "getUndefinedValue": "default"
                }
              ],
              "children": [],
              "validationRules": [],
              "recordNodeId": 5,
              "indexes": [],
              "allidsShardFactor": 1,
              "collectionName": "charges",
              "isSingle": false
            }
          ],
          "validationRules": [],
          "recordNodeId": 4,
          "indexes": [
            {
              "name": "charge_index",
              "type": "index",
              "map": "return {...record};",
              "filter": "",
              "indexType": "ancestor",
              "getShardName": "",
              "getSortKey": "record.id",
              "aggregateGroups": [],
              "allowedRecordNodeIds": [
                5
              ]
            }
          ],
          "allidsShardFactor": 1,
          "collectionName": "invoices",
          "isSingle": false
        }
      ],
      "validationRules": [],
      "recordNodeId": 1,
      "indexes": [
        {
          "name": "invoice_index",
          "type": "index",
          "map": "return {createdDate: record.createdDate, totalIncVat: record.totalIncVat};",
          "filter": "",
          "indexType": "ancestor",
          "getShardName": "",
          "getSortKey": "record.id",
          "aggregateGroups": [],
          "allowedRecordNodeIds": [
            4
          ]
        },
        {
          "name": "referredToCustomers",
          "type": "index",
          "map": "return {...record};",
          "filter": "",
          "indexType": "reference",
          "getShardName": "return !record.surname ? 'null' : record.surname.substring(0,1);",
          "getSortKey": "record.id",
          "aggregateGroups": [],
          "allowedRecordNodeIds": [
            1
          ]
        },
        {
          "name": "invoicesByOutstanding",
          "type": "index",
          "map": "return {...record};",
          "filter": "",
          "indexType": "ancestor",
          "getShardName": "return (record.totalIncVat > record.paidAmount ? 'outstanding' : 'paid');",
          "getSortKey": "record.id",
          "aggregateGroups": [
            {
              "name": "all_invoices_by_type",
              "type": "aggregateGroup",
              "groupBy": "return record.invoiceType",
              "aggregates": [
                {
                  "name": "totalIncVat",
                  "aggregatedValue": "return record.totalIncVat"
                }
              ],
              "condition": ""
            }
          ],
          "allowedRecordNodeIds": [
            3,
            4
          ]
        }
      ],
      "allidsShardFactor": 64,
      "collectionName": "customers",
      "isSingle": false
    },
    {
      "name": "partner",
      "type": "record",
      "fields": [
        {
          "name": "businessName",
          "type": "string",
          "typeOptions": {
            "maxLength": null,
            "values": null,
            "allowDeclaredValuesOnly": false
          },
          "label": "businessName",
          "getInitialValue": "default",
          "getUndefinedValue": "default"
        }
      ],
      "children": [
        {
          "name": "invoice",
          "type": "record",
          "fields": [
            {
              "name": "totalIncVat",
              "type": "number",
              "typeOptions": {
                "maxValue": 9007199254740991,
                "minValue": -9007199254740991,
                "decimalPlaces": 2
              },
              "label": "totalIncVat",
              "getInitialValue": "default",
              "getUndefinedValue": "default"
            },
            {
              "name": "createdDate",
              "type": "datetime",
              "typeOptions": {
                "maxValue": "+275760-09-13T00:00:00.000Z",
                "minValue": "-271821-04-20T00:00:00.000Z"
              },
              "label": "createdDate",
              "getInitialValue": "default",
              "getUndefinedValue": "default"
            },
            {
              "name": "paidAmount",
              "type": "number",
              "typeOptions": {
                "maxValue": 9007199254740991,
                "minValue": -9007199254740991,
                "decimalPlaces": 0
              },
              "label": "paidAmount",
              "getInitialValue": "default",
              "getUndefinedValue": "default"
            }
          ],
          "children": [],
          "validationRules": [],
          "recordNodeId": 3,
          "indexes": [
            {
              "name": "partnerCharges",
              "type": "index",
              "map": "return {...record};",
              "filter": "",
              "indexType": "reference",
              "getShardName": "",
              "getSortKey": "record.id",
              "aggregateGroups": [],
              "allowedRecordNodeIds": [
                {
                  "name": "charge",
                  "type": "record",
                  "fields": [
                    {
                      "name": "amount",
                      "type": "number",
                      "typeOptions": {
                        "maxValue": 9007199254740991,
                        "minValue": -9007199254740991,
                        "decimalPlaces": 0
                      },
                      "label": "amount",
                      "getInitialValue": "default",
                      "getUndefinedValue": "default"
                    },
                    {
                      "name": "partnerInvoice",
                      "type": "reference",
                      "typeOptions": {
                        "reverseIndexNodeKeys": [
                          "/partners/2-{id}/invoices/3-{id}/partnerCharges"
                        ],
                        "displayValue": "createdDate",
                        "indexNodeKey": "/partners/2-{id}/partnerInvoices_index"
                      },
                      "label": "partnerInvoice",
                      "getInitialValue": "default",
                      "getUndefinedValue": "default"
                    }
                  ],
                  "children": [],
                  "validationRules": [],
                  "recordNodeId": 5,
                  "indexes": [],
                  "allidsShardFactor": 1,
                  "collectionName": "charges",
                  "isSingle": false
                }
              ]
            }
          ],
          "allidsShardFactor": 1,
          "collectionName": "invoices",
          "isSingle": false
        }
      ],
      "validationRules": [],
      "recordNodeId": 2,
      "indexes": [
        {
          "name": "partnerInvoices_index",
          "type": "index",
          "map": "return {...record};",
          "filter": "",
          "indexType": "ancestor",
          "getShardName": "",
          "getSortKey": "record.id",
          "aggregateGroups": [],
          "allowedRecordNodeIds": [
            3
          ]
        },
        {
          "name": "partnerCustomers",
          "type": "index",
          "map": "return {...record};",
          "filter": "record.isalive === true",
          "indexType": "reference",
          "getShardName": "",
          "getSortKey": "record.id",
          "aggregateGroups": [],
          "allowedRecordNodeIds": [
            1
          ]
        }
      ],
      "allidsShardFactor": 64,
      "collectionName": "partners",
      "isSingle": false
    }
  ],
  "pathMaps": [],
  "indexes": [
    {
      "name": "customer_index",
      "type": "index",
      "map": "return record;",
      "filter": "",
      "indexType": "ancestor",
      "getShardName": "",
      "getSortKey": "record.id",
      "aggregateGroups": [
        {
          "name": "Customers Summary",
          "type": "aggregateGroup",
          "groupBy": "",
          "aggregates": [
            {
              "name": "all customers - age breakdown",
              "aggregatedValue": "return record.age"
            }
          ],
          "condition": ""
        }
      ],
      "allowedRecordNodeIds": [
        1
      ]
    },
    {
      "name": "partner_index",
      "type": "index",
      "map": "return {...record};",
      "filter": "",
      "indexType": "ancestor",
      "getShardName": "",
      "getSortKey": "record.id",
      "aggregateGroups": [],
      "allowedRecordNodeIds": [
        2
      ]
    },
    {
      "name": "partnersReference",
      "type": "index",
      "map": "return {name:record.businessName};",
      "filter": "",
      "indexType": "ancestor",
      "getShardName": "",
      "getSortKey": "record.id",
      "aggregateGroups": [],
      "allowedRecordNodeIds": [
        2
      ]
    },
    {
      "name": "customersReference",
      "type": "index",
      "map": "return {name:record.surname}",
      "filter": "record.isalive === true",
      "indexType": "ancestor",
      "getShardName": "",
      "getSortKey": "record.id",
      "aggregateGroups": [],
      "allowedRecordNodeIds": [
        1
      ]
    },
    {
      "name": "deceased",
      "type": "index",
      "map": "return {surname: record.surname, age:record.age};",
      "filter": "record.isalive === false",
      "indexType": "ancestor",
      "getShardName": "",
      "getSortKey": "record.id",
      "aggregateGroups": [],
      "allowedRecordNodeIds": [
        1
      ]
    },
    {
      "name": "customer_invoices",
      "type": "index",
      "map": "return record;",
      "filter": "record.type === 'invoice'",
      "indexType": "ancestor",
      "getShardName": "",
      "getSortKey": "record.id",
      "aggregateGroups": [],
      "allowedRecordNodeIds": [
        4
      ]
    },
    {
      "name": "Outstanding Invoices",
      "type": "index",
      "map": "return {...record};",
      "filter": "record.type === 'invoice' && record.paidAmount < record.totalIncVat",
      "indexType": "ancestor",
      "getShardName": "",
      "getSortKey": "record.id",
      "aggregateGroups": [
        {
          "name": "all_invoices",
          "type": "aggregateGroup",
          "groupBy": "",
          "aggregates": [],
          "condition": ""
        },
        {
          "name": "all_invoices_by_type",
          "type": "aggregateGroup",
          "groupBy": "return record.invoiceType",
          "aggregates": [
            {
              "name": "totalIncVat",
              "aggregatedValue": "return record.totalIncVat"
            },
            {
              "name": "paidAmount",
              "aggregatedValue": "return record.paidAmount"
            }
          ],
          "condition": ""
        },
        {
          "name": "written_off",
          "type": "aggregateGroup",
          "groupBy": "return record.invoiceType",
          "aggregates": [
            {
              "name": "totalIncVat",
              "aggregatedValue": "return record.totalIncVat"
            }
          ],
          "condition": "record.isWrittenOff === true"
        }
      ],
      "allowedRecordNodeIds": [
        4,
        3
      ]
    },
    {
      "name": "customersBySurname",
      "type": "index",
      "map": "return {...record};",
      "filter": "",
      "indexType": "ancestor",
      "getShardName": "return !record.surname ? 'null' : record.surname.substring(0,1);",
      "getSortKey": "record.id",
      "aggregateGroups": [],
      "allowedRecordNodeIds": [
        1
      ]
    }
  ]
};