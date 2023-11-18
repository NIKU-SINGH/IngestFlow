FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g typescript
RUN npm install
COPY . . 
CMD ["npm","start"]