FROM ubuntu:22.04
# Use bash instead of sh
SHELL ["/bin/bash", "-c"]
WORKDIR /app
COPY . /app

# Add a build-arg to set the environment file path
ARG ENV_FILE
# Set the environment variables from the file
ENV $(cat $ENV_FILE | xargs)
ENV NODE_MAJOR=18

# Install Node.js and npm
RUN apt-get update &&\
    apt-get install -y ca-certificates curl gnupg &&\
    mkdir -p /etc/apt/keyrings &&\
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg 
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main"\
    | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update && \
    apt-get install nodejs -y

RUN npm install
EXPOSE $PORT

CMD ["npm","run", "start:prod"]
