targetScope = 'resourceGroup'

param name string = 'me-mernmarketplace'
param location string = resourceGroup().location
param lawClientId string
param lawClientSecret string

resource env 'Microsoft.App/managedEnvironments@2023-05-01' = {
  location: location
  name: name
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: lawClientId
        sharedKey: lawClientSecret
      }
    }
  }
}

output id string = env.id
