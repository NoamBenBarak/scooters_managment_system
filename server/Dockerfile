FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV MONGO_URL=mongodb+srv://noam_ben_barak:noam1234@noamscooter.gjja13s.mongodb.net/?retryWrites=true&w=majority&appName=NoamScooter
ENV PORT=5000

EXPOSE 5000

CMD [ "node", "dist/server.js" ]