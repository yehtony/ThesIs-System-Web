const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const csv = require('csv-parser');

// PostgreSQL 連接資訊
const dbParams = {
  host: 'localhost',
  database: 'ideatree',
  username: 'yexuanncu',
  password: '35415',
  port: '5432',
};

// CSV 檔案路徑
const dataPath = '../../data/ideatree'
const csvPath = 'node.csv';
const filePath = dataPath + csvPath;

// 初始化 Sequelize
const sequelize = new Sequelize(dbParams.database, dbParams.username, dbParams.password, {
  host: dbParams.host,
  port: dbParams.port,
  dialect: 'postgres',
});

// 定義模型
const table = sequelize.define('node', {
  column1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  column2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // 添加更多的列定義
});

async function createTable() {
  // 創建表格
  await table.sync({ force: true });
}

async function insertData() {
  // 讀取 CSV 數據
  const fileData = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      fileData.push(row);
    })
    .on('end', async () => {
      // 插入數據到 PostgreSQL
      await table.bulkCreate(fileData);
    });
}

async function main() {
  try {
    // 連接到 PostgreSQL 數據庫
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // 創建表格
    await createTable();

    // 插入數據到 PostgreSQL
    await insertData();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    // 關閉連接
    await sequelize.close();
  }
}

main();
