FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3100

ENV MONGODB_URI=mongodb+srv://cse:Va9KlJPm7oRETaIH@cluster0.uvzg0.gcp.mongodb.net/test

EXPOSE 3100

CMD ["npm", "start"]

