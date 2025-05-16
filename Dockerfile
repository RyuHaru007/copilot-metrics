# Use official Node.js 22 LTS image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port (adjust if needed)
EXPOSE 3000

# Serve the dist folder
CMD ["npm", "run", "serve"]