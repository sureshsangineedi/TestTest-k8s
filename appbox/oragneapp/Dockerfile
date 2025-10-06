# Build a tiny static image using nginx
FROM nginx:stable-alpine

# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy static site
COPY index.html /usr/share/nginx/html/index.html

# Expose HTTP port
EXPOSE 80

# Start nginx (default command from nginx image is fine)
CMD ["nginx", "-g", "daemon off;"]
