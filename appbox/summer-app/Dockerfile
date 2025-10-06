# Use nginx lightweight image
FROM nginx:alpine

# Copy html to nginx folder
COPY index.html /usr/share/nginx/html/index.html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
