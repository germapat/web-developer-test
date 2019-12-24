FROM node:10.16.0

# Setup
EXPOSE 4002
WORKDIR /app
ARG env=qa
# Copy sources
COPY ./$env.env ./production.env
COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./
COPY ./package.json ./
COPY ./src/ ./src/

# Build application
RUN npm install
RUN npm run build

ENV NODE_ENV production
# Run application
CMD ["node", "dist/main.js"]
