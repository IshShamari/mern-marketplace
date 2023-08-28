FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Bundle the application source code inside the Docker image
COPY . .

# Expose the port the app will run on
EXPOSE 3001

# Command to run the application
CMD [ "npm", "start" ]