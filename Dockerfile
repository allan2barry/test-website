FROM node:13.12.0-alpine
WORKDIR ./frontend
ENV PATH /node_modules/.bin:$PATH

COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

COPY /frontend ./

CMD ["npm", "start"]