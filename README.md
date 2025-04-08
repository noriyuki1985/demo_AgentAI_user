# AIエージェントプラットフォーム デモ

## データベーススキーマ

以下は、Google スプレッドシートを RDS ライクに扱うためのテーブル定義です。

```sql
-- Users（お客様マスタ）
CREATE TABLE Users (
  user_id        VARCHAR(50) PRIMARY KEY,
  company_name   VARCHAR(100) NOT NULL,
  user_name      VARCHAR(100) NOT NULL,
  role           VARCHAR(20)  NOT NULL,
  last_login     DATETIME     NOT NULL,
  password       VARCHAR(100) NOT NULL,
  phone          VARCHAR(20),
  email          VARCHAR(100),
  address        VARCHAR(200)
);

-- Categories（カテゴリマスタ）
CREATE TABLE Categories (
  category_id    VARCHAR(50) PRIMARY KEY,
  category_name  VARCHAR(50) NOT NULL
);

-- UserCategories（ユーザー×カテゴリ紐付け）
CREATE TABLE UserCategories (
  user_id     VARCHAR(50) NOT NULL,
  category_id VARCHAR(50) NOT NULL,
  PRIMARY KEY (user_id, category_id),
  FOREIGN KEY (user_id)     REFERENCES Users(user_id),
  FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

-- Agents（エージェントマスタ）
CREATE TABLE Agents (
  agent_id     VARCHAR(50) PRIMARY KEY,
  agent_name   VARCHAR(100) NOT NULL,
  category_id  VARCHAR(50)  NOT NULL,
  FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

-- UserAgents（ユーザー×エージェント紐付け：直近利用）
CREATE TABLE UserAgents (
  user_id    VARCHAR(50) NOT NULL,
  agent_id   VARCHAR(50) NOT NULL,
  last_used  DATETIME      NOT NULL,
  PRIMARY KEY (user_id, agent_id),
  FOREIGN KEY (user_id)  REFERENCES Users(user_id),
  FOREIGN KEY (agent_id) REFERENCES Agents(agent_id)
);

-- AgentHistories（利用履歴）
CREATE TABLE AgentHistories (
  history_id  VARCHAR(50) PRIMARY KEY,
  user_id     VARCHAR(50) NOT NULL,
  agent_id    VARCHAR(50) NOT NULL,
  used_at     DATETIME      NOT NULL,
  description TEXT          NOT NULL,
  FOREIGN KEY (user_id)  REFERENCES Users(user_id),
  FOREIGN KEY (agent_id) REFERENCES Agents(agent_id)
);
