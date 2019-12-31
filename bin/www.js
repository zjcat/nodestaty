/*
 * @Author: your name
 * @Date: 2019-12-31 14:10:23
 * @LastEditTime : 2019-12-31 16:54:04
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog\bin\www.js
 */
const http = require('http');
const querystring = require('querystring');
const POST = 3000;
const serverHandle = require('../app');
const server = http.createServer(serverHandle);
server.listen(POST)