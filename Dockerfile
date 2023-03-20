# syntax=docker/dockerfile:1.4
FROM node:lts-buster-slim AS development

# Create app directory
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

# Install dependencies for development
RUN npm ci

COPY . /usr/src/app

EXPOSE ${PORT}

CMD [ "npm", "run", "dev" ]

FROM development as dev-envs

# Install git
RUN apt-get update && \
    apt-get install -y --no-install-recommends git && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user and add to docker group
RUN useradd -s /bin/bash -m vscode && \
    groupadd docker && \
    usermod -aG docker vscode

# Copy Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker /usr/local/bin/docker* /usr/local/bin/

CMD [ "npm", "run", "dev" ]

# FROM node:lts-buster-slim AS development

# # Create app directory
# WORKDIR /usr/src/app

# COPY package.json /usr/src/app/package.json
# COPY package-lock.json /usr/src/app/package-lock.json
# RUN npm ci

# COPY . /usr/src/app

# EXPOSE ${PORT}

# CMD [ "npm", "run", "dev" ]

# FROM development as dev-envs
# RUN <<EOF
# apt-get update
# apt-get install -y --no-install-recommends git
# EOF

# RUN <<EOF
# useradd -s /bin/bash -m vscode
# groupadd docker
# usermod -aG docker vscode
# EOF
# # install Docker tools (cli, buildx, compose)
# COPY --from=gloursdocker/docker / /
# CMD [ "npm", "run", "dev" ]
# syntax=docker/dockerfile:1.4