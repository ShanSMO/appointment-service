# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application source code
COPY ./src ./
COPY ./tsconfig.json ./
RUN npm version 
RUN npm run build

# Expose the port the app runs on
EXPOSE 3003

# Specify the command to run your application
CMD ["npm", "run", "start"]