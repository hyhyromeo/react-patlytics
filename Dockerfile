# Step 1: Build the React app
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application and build the React app
COPY . .
RUN npm run build

# Step 2: Serve the React app using Nginx
FROM nginx:alpine

# Remove default nginx.conf
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d

# Copy the React build output to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]