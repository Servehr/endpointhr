require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import session from 'express-session';
import * as passport from 'passport'
import cookieParser from 'cookie-parser';


const port: string | number = process.env.PORT || 4554

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });
  // app.use(cookieParser())
  // app.enableCors({
  //     origin: 'http://127.0.0.1:5648/api/',
  //     credentials: true
  // })
  app.use(
    session({
        name: "hrsolutions",
        secret: "",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000
        }
    })
  )
  app.enableCors();
  app.setGlobalPrefix('/api/');
  await app.listen(port);
  Logger.log(`Server Started at port ${port}`)
}
bootstrap();




