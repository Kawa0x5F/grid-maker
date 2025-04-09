FROM mcr.microsoft.com/devcontainers/typescript-node:20

# Rust, wasm-packのインストール
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y \
    && . "$HOME/.cargo/env" \
    && cargo install wasm-pack

ENV PATH="/root/.cargo/bin:${PATH}"