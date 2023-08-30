targetScope = 'resourceGroup'

@description('Cosmos DB account name')
param accountName string = 'mongo-${uniqueString(resourceGroup().id)}'

@description('Location for the Cosmos DB account.')
param location string = resourceGroup().location

@description('The name for the Mongo DB database')
param databaseName string

@description('The name for the first Mongo DB collection')
param collection1Name string

@description('The name for the second Mongo DB collection')
param collection2Name string

@description('The name for the second Mongo DB collection')
param collection3Name string

resource account 'Microsoft.DocumentDB/databaseAccounts@2023-04-15' = {
  name: toLower(accountName)
  location: location
  kind: 'MongoDB'
  properties: {
    enableFreeTier: true
    databaseAccountOfferType: 'Standard'
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
    }
    locations: [
      {
        locationName: location
      }
    ]
  }
}

resource database 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases@2023-04-15' = {
  parent: account
  name: databaseName
  properties: {
    resource: {
      id: databaseName
    }
    options: {
      throughput: 400
    }
  }
}

resource collection1 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections@2023-04-15' = {
  parent: database
  name: collection1Name
  properties: {
    resource: {
      id: collection1Name
      shardKey: {
        user_id: 'Hash'
      }
      indexes: [
        {
          key: {
            keys: [
              '_id'
            ]
          }
        }
        {
          key: {
            keys: [
              '$**'
            ]
          }
        }
      ]
    }
  }
}

resource collection2 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections@2023-04-15' = {
  parent: database
  name: collection2Name
  properties: {
    resource: {
      id: collection2Name
      shardKey: {
        user_id: 'Hash'
      }
      indexes: [
        {
          key: {
            keys: [
              '_id'
            ]
          }
        }
        {
          key: {
            keys: [
              '$**'
            ]
          }
        }
      ]
    }
  }
}

resource collection3 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections@2023-04-15' = {
  parent: database
  name: collection3Name
  properties: {
    resource: {
      id: collection3Name
      shardKey: {
        user_id: 'Hash'
      }
      indexes: [
        {
          key: {
            keys: [
              '_id'
            ]
          }
        }
        {
          key: {
            keys: [
              '$**'
            ]
          }
        }
      ]
    }
  }
}
