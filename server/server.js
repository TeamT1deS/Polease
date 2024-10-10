const Datastore = require("nedb");
// const { destination } = require("pino");
const fastify = require("fastify")({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: false,
        destination: "./log/server.log",
      },
    },
    level: "info",
  },
});

// 声明数据库变量
let db;

// 延迟加载数据库
function loadDatabase() {
  if (!db) {
    db = new Datastore({ filename: "./database/test.db", autoload: true });
  }
}
// 销毁数据库实例
function destroyDatabase() {
  db = null; // 解除对数据库的引用
}

// Declare a route
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

// 添加数据的路由
fastify.get("/test/addData", function (request, reply) {
  loadDatabase();
  const startTime = performance.now();
  const data = [];

  for (let i = 0; i < 100000; i++) {
    data.push({ name: `Item ${i}` });
  }

  db.insert(data, (err) => {
    const duration = performance.now() - startTime;
    let msg = err ? "ERROR" : "已添加 100K 条数据！";
    reply.send({ msg: msg, duration: `${duration.toFixed(2)} ms` });
  });
  destroyDatabase();
});

// 获取数据的路由
fastify.get("/test/fetchData", function (request, reply) {
  loadDatabase();
  const startTime = performance.now();

  db.find({ name: { $regex: /^Item/ } }, (err, docs) => {
    const duration = performance.now() - startTime;
    let msg = err ? "ERROR" : "SUCCESS";
    reply.send({ msg: msg, duration: `${duration.toFixed(2)} ms` });
  });
  destroyDatabase();
});

// 查询单条数据的路由
fastify.get("/test/queryData", function (request, reply) {
  loadDatabase();
  const startTime = performance.now();

  db.find({ name: "Item 75466" }, (err) => {
    const duration = performance.now() - startTime;
    let msg = err ? "ERROR" : "SUCCESS";
    reply.send({ msg: msg, duration: `${duration.toFixed(2)} ms` });
  });
  destroyDatabase();
});

fastify.listen({ port: 8081 }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is now listening on http://localhost:8081`);
});

// module.exports = fastify;
