targetScope = 'subscription'

@description('Resource Group location')
param location string = 'canadacentral'

@description('Provide the subscription id')
param subscriptionId string

@description('ACR Name')
param acrName string

@description('The name for the first Mongo DB collection')
param collection1Name string = 'users'

@description('The name for the second Mongo DB collection')
param collection2Name string = 'products'

@description('The name for the second Mongo DB collection')
param collection3Name string = 'orders'

@description('The container registry username')
param containerRegistryUsername string

@description('The container registry password')
@secure()
param containerRegistryPassword string

module rgModule './modules/rg.bicep' = {
  name: 'rgmernmarketplace'
  params: {
    location: location
    acrName: acrName
    collection1Name: collection1Name
    collection2Name: collection2Name
    collection3Name: collection3Name
    containerRegistryUsername: containerRegistryUsername
    containerRegistryPassword: containerRegistryPassword
  }
  scope: subscription(subscriptionId)
}
