targetScope = 'resourceGroup'

param acrName string = 'acrmernmarketplace.azurecr.io'
param location string = resourceGroup().location
param containerAppEnvName string = 'aca-containerappenv'

@description('The container registry username')
param containerRegistryUsername string

@description('The container registry password')
@secure()
param containerRegistryPassword string

module lawModule './law.bicep' = {
  name: 'law'
  params: {
    location: location
  }
}

module envModule './environment.bicep' = {
  name: containerAppEnvName
  params: {
    lawClientId: lawModule.outputs.clientId
    lawClientSecret: lawModule.outputs.clientSecret
    location: location
  }
}

resource userApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: 'user-microservice-app'
  location: location
  properties: {
    managedEnvironmentId: envModule.outputs.id
    configuration: {
      ingress: {
        allowInsecure: true
        external: true
        targetPort: 3001
      }
      secrets: [
        {
          name: 'containerregistrypasswordref'
          value: containerRegistryPassword
        }
      ]
      registries: [
        {
          server: 'acrmernmarketplace.azurecr.io'
          username: containerRegistryUsername
          passwordSecretRef: 'containerregistrypasswordref'
        }
      ]
    }
    template: {
      containers: [
        {
          image: '${acrName}/user-service:latest'
          name: 'user-container'
          resources: {
            cpu: json('0.25')
            memory: '0.5Gi'
          }
        }
      ]
    }
  }
}

resource productApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: 'product-microservice-app'
  location: location
  properties: {
    managedEnvironmentId: envModule.outputs.id
    configuration: {
      ingress: {
        allowInsecure: true
        external: true
        targetPort: 3002
      }
      secrets: [
        {
          name: 'containerregistrypasswordref'
          value: containerRegistryPassword
        }
      ]
      registries: [
        {
          server: 'acrmernmarketplace.azurecr.io'
          username: containerRegistryUsername
          passwordSecretRef: 'containerregistrypasswordref'
        }
      ]
    }
    template: {
      containers: [
        {
          image: '${acrName}/product-service:latest'
          name: 'product-container'
          resources: {
            cpu: json('0.25')
            memory: '0.5Gi'
          }
        }
      ]
    }
  }
}

resource orderApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: 'order-microservice-app'
  location: location
  properties: {
    managedEnvironmentId: envModule.outputs.id
    configuration: {
      ingress: {
        allowInsecure: true
        external: true
        targetPort: 3003
      }
      secrets: [
        {
          name: 'containerregistrypasswordref'
          value: containerRegistryPassword
        }
      ]
      registries: [
        {
          server: 'acrmernmarketplace.azurecr.io'
          username: containerRegistryUsername
          passwordSecretRef: 'containerregistrypasswordref'
        }
      ]
    }
    template: {
      containers: [
        {
          image: '${acrName}/order-service:latest'
          name: 'order-container'
          resources: {
            cpu: json('0.25')
            memory: '0.5Gi'
          }
        }
      ]
    }
  }
}
