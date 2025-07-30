# Stage 1: Node for building frontend
FROM node:20 as node-builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Laravel with PHP-FPM + Nginx
FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache nginx bash curl git unzip supervisor \
    libzip-dev libpng-dev libjpeg-turbo-dev libwebp-dev zlib-dev oniguruma-dev \
    autoconf g++ make libxml2-dev

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy project files
COPY --from=node-builder /app /var/www


# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www \
 && chmod -R 775 storage bootstrap/cache

# Add custom Nginx and Supervisor configs
COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf

EXPOSE 8080
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
