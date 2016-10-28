FROM chengjianhua/cnpm

# Build app
ENV WORK_DIR /usr/src/book-share
RUN mkdir -p $WORK_DIR
WORKDIR $WORK_DIR
COPY . $WORK_DIR

RUN cnpm install

RUN npm run build -- --release

EXPOSE 3000

CMD node build/server.js
