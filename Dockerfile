# Use the official NGINX image from Docker Hub
FROM nginx:alpine

# Copy the index.html file to the NGINX default public directory
COPY index.html /usr/share/nginx/html/

# Expose port 80 to allow incoming traffic
EXPOSE 80
