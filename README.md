## 描述

使用[Nest](https://github.com/nestjs/nest)搭建的node项目，作为packbox的业务服务。

## 安装依赖

```bash
$ npm install
```

## 添加配置文件

本项目使用mongodb数据库，使用nest提供的@nestjs/mongoose作为ORM。
当你想要真正连接数据库时，请做如下操作：
1. 复制一份本项目根目录下的`.mongodb.sample.env`文件中的内容放在同一目录下，并命名为`.mongodb.env`
2. 修改`.mongodb.env`中的配置参数的值为你实际的数据库配置

## 运行程序

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 测试

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Licenses

Nest is [MIT licensed](LICENSE).

## 提供贡献
