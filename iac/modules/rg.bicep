targetScope = 'subscription'

@description('Provide the name of the resource group')
param rgName string = 'rg-mernmarketplace'

@description('Provide a location for the resource group(meta data).')
param location string = 'canadacentral'

@minLength(5)
@maxLength(50)
@description('Name of the registry (must be globally unique)')
param acrName string

@description('The name for the first Mongo DB collection')
param collection1Name string

@description('The name for the second Mongo DB collection')
param collection2Name string

@description('The name for the second Mongo DB collection')
param collection3Name string

@description('The container registry username')
param containerRegistryUsername string

@description('The container registry password')
@secure()
param containerRegistryPassword string

resource rg 'Microsoft.Resources/resourceGroups@2022-09-01' = {
  name: rgName
  location: location
}

module acrModule './acr.bicep' = {
  scope: rg
  name: 'acr-mernmarketplace'
  params: {
    acrName: acrName
    location: location
  }
}

module cosmodb './cosmodb.bicep' ={
  name: 'mongodb-mernmarketplace'
  params: {
    collection1Name: collection1Name
    collection2Name: collection2Name
    collection3Name: collection3Name
    location: location
    databaseName: 'mernmarketplace'
  }
  scope: rg
}

module acaModule './aca.bicep' = {
  name: 'aca-mernmarketplace'
  scope: rg
  params: {
    location: location
    containerRegistryUsername: containerRegistryUsername
    containerRegistryPassword: containerRegistryPassword
  }
}

output id string = rg.id
