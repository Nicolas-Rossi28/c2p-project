FROM node:20-alpine

WORKDIR /app

# Copia package.json primeiro — aproveita cache do Docker
COPY package*.json ./
RUN npm install

# Copia o resto do código
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]