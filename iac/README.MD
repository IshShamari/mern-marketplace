There's two commands you can run. The first one is to see what happens if you deploy these changes and the second one is the actual deployment.

az deployment sub what-if --name "<RESOURCE_GROUP_NAME>" --template-file main.bicep --parameters subscriptionId="<SUBSCRIPTION_ID>" location="canadacentral" acrName="<ACR_NAME>" containerregistrypassword="<ACR_CLIENT_ID>" containerregistryusername="<ACR_CLIENT_SECRET>"

az deployment sub create --name "<RESOURCE_GROUP_NAME>" --template-file main.bicep --parameters subscriptionId="<SUBSCRIPTION_ID>" location="canadacentral" acrName="<ACR_NAME>" containerregistrypassword="<ACR_CLIENT_ID>" containerregistryusername="<ACR_CLIENT_SECRET>"