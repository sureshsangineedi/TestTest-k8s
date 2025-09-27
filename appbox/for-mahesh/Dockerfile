# Use a lightweight web server image
FROM nginx:alpine

# Copy the HTML file to nginx's default folder
COPY index.html /usr/share/nginx/html/index.html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
