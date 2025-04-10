# ベースイメージの指定
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-18

ARG USER_HOME=/home/node
ENV USER_HOME=${USER_HOME}
ENV CARGO_HOME=${USER_HOME}/.cargo
ENV RUSTUP_HOME=${USER_HOME}/.rustup
ENV PATH="${CARGO_HOME}/bin:${PATH}"

USER root
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    git \
    clang \
    libssl-dev \
    pkg-config \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

USER node

# Rustのインストール
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --no-modify-path \
    && rustup target add wasm32-unknown-unknown \
    && rustup update \
    && cargo install wasm-pack

# Node.js をインストール
RUN npm install -g next

# 作業ディレクトリの作成
WORKDIR /workspace/grid-maker
RUN cargo --version

# ディレクトリをコピー
COPY --chown=node:node ./wasm/Cargo.toml ./wasm/Cargo.lock* ./wasm/

# ダミーデータを作成
RUN mkdir -p wasm/src && touch wasm/src/lib.rs

# Rust依存をビルド（キャッシュ効かせる）
RUN cd wasm && cargo fetch

# ディレクトリをコピー
COPY --chown=node:node ./front/package.json ./front/package-lock.json* ./front/

# Node依存をインストール（キャッシュ効かせる）
RUN cd front && npm install

COPY --chown=node:node ./wasm/ ./wasm/
COPY --chown=node:node ./front/ ./front/

# デフォルトのコマンド
CMD ["sleep", "infinity"]
