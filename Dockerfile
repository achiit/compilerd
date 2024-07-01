FROM docker.io/library/node:20.13.0-alpine

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV GOROOT=/usr/lib/go
ENV GOPATH=/go
ENV PATH=$GOPATH/bin:$GOROOT/bin:$PATH
ENV RUSTUP_HOME=/usr/local/rustup
ENV CARGO_HOME=/usr/local/cargo
ENV PATH=/usr/local/cargo/bin:$PATH

# Install necessary packages
RUN set -ex && \
    apk add --no-cache \
        gcc g++ musl-dev \
        python3 openjdk17 ruby \
        iptables ip6tables \
        chromium lsof \
        go \
        curl

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --profile minimal --default-toolchain stable && \
    rustc --version && \
    cargo --version

# Install Dart SDK
RUN curl -fsSL https://storage.googleapis.com/dart-archive/channels/stable/release/latest/sdk/dartsdk-linux-x64-release.zip -o dart.zip && \
    unzip dart.zip -d /usr/lib && \
    rm dart.zip && \
    echo 'export PATH="$PATH:/usr/lib/dart-sdk/bin"' >> /etc/profile

# Set up Go workspace
RUN mkdir -p "$GOPATH/src" "$GOPATH/bin" && chmod -R 777 "$GOPATH"

# Clean up unnecessary files
RUN set -ex && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/cc1obj && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto1 && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto-wrapper && \
    rm -f /usr/bin/x86_64-alpine-linux-musl-gcj && \
    rm -rf /var/cache/apk/* && \
    rm -rf /tmp/*

# Set up Python symlink
RUN ln -sf python3 /usr/bin/python

# Add application files
ADD . /usr/bin/
ADD start.sh /usr/bin/

# Install Node.js dependencies
RUN npm --prefix /usr/bin/ install

# Expose port
EXPOSE 8080

# Add a non-root user for security
RUN addgroup -S -g 2000 runner && adduser -S -D -u 2000 -s /sbin/nologin -h /tmp -G runner runner

# Set the start command
CMD sh /usr/bin/start.sh