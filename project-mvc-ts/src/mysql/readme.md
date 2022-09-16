# 数据类型

## 字符串

DataTypes.STRING // VARCHAR(255)，默认长度 255
DataTypes.STRING(1234) // VARCHAR(1234)，指定长度的字符串
DataTypes.STRING.BINARY // VARCHAR BINARY
DataTypes.TEXT // TEXT，文本字符串
DataTypes.TEXT('tiny') // TINYTEXT，小文本字符串

## 布尔

DataTypes.BOOLEAN // TINYINT(1)，小 int 类型，长度为 1（0，1）

## 数字

DataTypes.INTEGER // INTEGER，int 类型
DataTypes.BIGINT // BIGINT，更大的 int 类型
DataTypes.BIGINT(11) // BIGINT(11)，指定长度的 BIGINT
DataTypes.FLOAT // FLOAT，浮点类型
DataTypes.FLOAT(11) // FLOAT(11)，指定长度的浮点类型
DataTypes.FLOAT(11, 10) // FLOAT(11,10)，指定长度和小数点后的位数
DataTypes.DOUBLE // DOUBLE
DataTypes.DOUBLE(11) // DOUBLE(11)
DataTypes.DOUBLE(11, 10) // DOUBLE(11,10)
DataTypes.DECIMAL // DECIMAL，更准确的小数点类型
DataTypes.DECIMAL(10, 2) // DECIMAL(10,2)，指定长度和小数点后的位数

## 日期

DataTypes.DATE // DATETIME 适用于 mysql / sqlite, 带时区的 TIMESTAMP 适用于 postgres
DataTypes.DATE(6) // DATETIME(6) 适用于 mysql 5.6.4+. 支持 6 位精度的小数秒
DataTypes.DATEONLY // 不带时间的 DATE，仅日期部分

## 枚举

DataTypes.ENUM('value 1','value 2','value 3') //枚举类型，从 value 1、value 2、value 3 中取

## JSON

DataTypes.JSON //适用于 mysql 5.7.8+ ，JSON 类型

## 删除表

删除与模型相关的表：
await Books.drop();
console.log("用户表已删除!");

## 删除所有表：

await sequelize.drop();
console.log("所有表已删除!");

## sequelize.QueryTypes

SELECT: 'SELECT',
INSERT: 'INSERT',
UPDATE: 'UPDATE',
BULKUPDATE: 'BULKUPDATE',
BULKDELETE: 'BULKDELETE',
DELETE: 'DELETE',
UPSERT: 'UPSERT',
VERSION: 'VERSION',
SHOWTABLES: 'SHOWTABLES',
SHOWINDEXES: 'SHOWINDEXES',
DESCRIBE: 'DESCRIBE',
RAW: 'RAW',
FOREIGNKEYS: 'FOREIGNKEYS',
SHOWCONSTRAINTS: 'SHOWCONSTRAINTS'




socket.io

<ref *1> Socket {
  _events: [Object: null prototype] {},
  _eventsCount: 0,
  _maxListeners: undefined,
  nsp: <ref *2> Namespace {
    _events: [Object: null prototype] { connection: [Function (anonymous)] },
    _eventsCount: 1,
    _maxListeners: undefined,
    sockets: Map(1) { 'cFSnRgHCFGVBqhXPAAAB' => [Circular *1] },
    _fns: [],
    _ids: 0,
    server: Server {
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      _nsps: [Map],
      parentNsps: Map(0) {},
      _path: '/socket.io',
      clientPathRegex: /^\/socket\.io\/socket\.io(\.msgpack|\.esm)?(\.min)?\.js(\.map)?(?:\?|$)/,
      _connectTimeout: 45000,
      _serveClient: true,
      _parser: [Object],
      encoder: Encoder {},
      _adapter: [class Adapter extends EventEmitter],
      sockets: [Circular *2],
      opts: [Object],
      eio: [Server],
      httpServer: [Server],
      engine: [Server],
      [Symbol(kCapture)]: false
    },
    name: '/',
    adapter: Adapter {
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      nsp: [Circular *2],
      rooms: [Map],
      sids: [Map],
      encoder: Encoder {},
      [Symbol(kCapture)]: false
    },
    [Symbol(kCapture)]: false
  },
  client: Client {
    sockets: Map(1) { 'cFSnRgHCFGVBqhXPAAAB' => [Circular *1] },
    nsps: Map(1) { '/' => [Circular *1] },
    server: Server {
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      _nsps: [Map],
      parentNsps: Map(0) {},
      _path: '/socket.io',
      clientPathRegex: /^\/socket\.io\/socket\.io(\.msgpack|\.esm)?(\.min)?\.js(\.map)?(?:\?|$)/,
      _connectTimeout: 45000,
      _serveClient: true,
      _parser: [Object],
      encoder: Encoder {},
      _adapter: [class Adapter extends EventEmitter],
      sockets: [Namespace],
      opts: [Object],
      eio: [Server],
      httpServer: [Server],
      engine: [Server],
      [Symbol(kCapture)]: false
    },
    conn: Socket {
      _events: [Object: null prototype],
      _eventsCount: 3,
      _maxListeners: undefined,
      id: '07Q_aU-6r6NoPqcWAAAA',
      server: [Server],
      upgrading: false,
      upgraded: false,
      _readyState: 'open',
      writeBuffer: [Array],
      packetsFn: [],
      sentCallbackFn: [],
      cleanupFn: [Array],
      request: [IncomingMessage],
      protocol: 4,
      remoteAddress: '127.0.0.1',
      checkIntervalTimer: null,
      upgradeTimeoutTimer: null,
      pingTimeoutTimer: Timeout {
        _idleTimeout: 45000,
        _idlePrev: [TimersList],
        _idleNext: [TimersList],
        _idleStart: 5387,
        _onTimeout: [Function (anonymous)],
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: false,
        [Symbol(refed)]: true,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 37,
        [Symbol(triggerId)]: 36
      },
      pingIntervalTimer: Timeout {
        _idleTimeout: 25000,
        _idlePrev: [TimersList],
        _idleNext: [TimersList],
        _idleStart: 5379,
        _onTimeout: [Function (anonymous)],
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: false,
        [Symbol(refed)]: true,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 24,
        [Symbol(triggerId)]: 0
      },
      transport: [Polling],
      [Symbol(kCapture)]: false
    },
    encoder: Encoder {},
    decoder: Decoder { _callbacks: [Object] },
    id: '07Q_aU-6r6NoPqcWAAAA',
    onclose: [Function: bound onclose],
    ondata: [Function: bound ondata],
    onerror: [Function: bound onerror],
    ondecoded: [Function: bound ondecoded],
    connectTimeout: undefined
  },
  data: {},
  connected: true,
  acks: Map(0) {},
  fns: [],
  flags: {},
  server: <ref *3> Server {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    _nsps: Map(1) { '/' => [Namespace] },
    parentNsps: Map(0) {},
    _path: '/socket.io',
    clientPathRegex: /^\/socket\.io\/socket\.io(\.msgpack|\.esm)?(\.min)?\.js(\.map)?(?:\?|$)/,
    _connectTimeout: 45000,
    _serveClient: true,
    _parser: {
      protocol: 5,
      PacketType: [Object],
      Encoder: [class Encoder],
      Decoder: [class Decoder extends Emitter]
    },
    encoder: Encoder {},
    _adapter: [class Adapter extends EventEmitter],
    sockets: <ref *2> Namespace {
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: undefined,
      sockets: [Map],
      _fns: [],
      _ids: 0,
      server: [Circular *3],
      name: '/',
      adapter: [Adapter],
      [Symbol(kCapture)]: false
    },
    opts: { cors: [Object] },
    eio: Server {
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: undefined,
      clients: [Object],
      clientsCount: 1,
      opts: [Object],
      corsMiddleware: [Function: corsMiddleware],
      ws: [WebSocketServer],
      [Symbol(kCapture)]: false
    },
    httpServer: Server {
      maxHeaderSize: undefined,
      insecureHTTPParser: undefined,
      _events: [Object: null prototype],
      _eventsCount: 5,
      _maxListeners: undefined,
      _connections: 1,
      _handle: [TCP],
      _usingWorkers: false,
      _workers: [],
      _unref: false,
      allowHalfOpen: true,
      pauseOnConnect: false,
      noDelay: false,
      keepAlive: false,
      keepAliveInitialDelay: 0,
      httpAllowHalfOpen: false,
      timeout: 0,
      keepAliveTimeout: 5000,
      maxHeadersCount: null,
      maxRequestsPerSocket: 0,
      headersTimeout: 60000,
      requestTimeout: 0,
      _connectionKey: '4:0.0.0.0:3030',
      [Symbol(IncomingMessage)]: [Function: IncomingMessage],
      [Symbol(ServerResponse)]: [Function: ServerResponse],
      [Symbol(kCapture)]: false,
      [Symbol(async_id_symbol)]: 9,
      [Symbol(kUniqueHeaders)]: null
    },
    engine: Server {
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: undefined,
      clients: [Object],
      clientsCount: 1,
      opts: [Object],
      corsMiddleware: [Function: corsMiddleware],
      ws: [WebSocketServer],
      [Symbol(kCapture)]: false
    },
    [Symbol(kCapture)]: false
  },
  adapter: <ref *4> Adapter {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    nsp: <ref *2> Namespace {
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: undefined,
      sockets: [Map],
      _fns: [],
      _ids: 0,
      server: [Server],
      name: '/',
      adapter: [Circular *4],
      [Symbol(kCapture)]: false
    },
    rooms: Map(1) { 'cFSnRgHCFGVBqhXPAAAB' => [Set] },
    sids: Map(1) { 'cFSnRgHCFGVBqhXPAAAB' => [Set] },
    encoder: Encoder {},
    [Symbol(kCapture)]: false
  },
  id: 'cFSnRgHCFGVBqhXPAAAB',
  handshake: {
    headers: {
      host: 'localhost:3030',
      connection: 'keep-alive',
      pragma: 'no-cache',
      'cache-control': 'no-cache',
      'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
      accept: '*/*',
      'sec-ch-ua-mobile': '?0',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
      'sec-ch-ua-platform': '"Windows"',
      origin: 'http://127.0.0.1:5500',
      'sec-fetch-site': 'cross-site',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      referer: 'http://127.0.0.1:5500/',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'zh-CN,zh;q=0.9'
    },
    time: 'Thu Sep 15 2022 16:57:36 GMT+0800 (中国标准时间)',
    address: '127.0.0.1',
    xdomain: true,
    secure: false,
    issued: 1663232256349,
    url: '/socket.io/?EIO=4&transport=polling&t=OD0NY8c',
    query: [Object: null prototype] {
      EIO: '4',
      transport: 'polling',
      t: 'OD0NY8c'
    },
    auth: {}
  },
  [Symbol(kCapture)]: false
} 