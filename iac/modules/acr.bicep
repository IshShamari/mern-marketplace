targetScope = 'resourceGroup'

@minLength(5)
@maxLength(50)
@description('Name of the registry (must be globally unique)')
param acrName string

@description('Enable an admin user that has push/pull permission to the registry')
param acrAdminUserEnabled bool = false

@description('Location for resources')
param location string = resourceGroup().location

@allowed([
  'Basic'
])
@description('Tier of your Azure Container Registry.')
param acrSku string = 'Basic'

resource acr 'Microsoft.ContainerRegistry/registries@2023-06-01-preview' = {
  name: acrName
  location: location
  tags: {
    displayName: 'Container Registry'
    'container.registry': acrName
  }
  sku: {
    name: acrSku
  }
  properties: {
    adminUserEnabled: acrAdminUserEnabled
  }
}

output acrLoginServer string = acr.properties.loginServer
