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
    && cargo install wasm-pack \
    && cargo install wasm-bindgen-cli

# nodeユーザーのまま
USER node

# NVMを使って Node.js 20 をインストール
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && \
    export NVM_DIR="/usr/local/share/nvm" && \
    . "$NVM_DIR/nvm.sh" && \
    nvm install 20 && \
    nvm use 20 && \
    nvm alias default 20 && \
    npm install -g next

# node -v で確認できるように
ENV NVM_DIR=/home/node/.nvm
ENV NODE_VERSION=20
ENV PATH="$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH"

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
