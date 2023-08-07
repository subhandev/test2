# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Install the mysql package
RUN npm install mysql

# Copy the rest of the application files to the container
COPY . .

# Expose the port that the Node.js app will listen on
EXPOSE 3000

# Command to start the application
CMD [ "node", "app.js" ]
