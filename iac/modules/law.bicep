targetScope = 'resourceGroup'

param location string = resourceGroup().location
param name string = 'law-mernmarketplace'

resource law 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: name
  location: location
  properties: {
    retentionInDays: 30
    features: {
      searchVersion: 1
    }
    sku: {
      name: 'PerGB2018'
    }
  }
}

output clientId string = law.properties.customerId
output clientSecret string = law.listKeys().primarySharedKey
