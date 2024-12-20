// api/main.ts
import { NowRequest, NowResponse } from '@vercel/node';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';  // Шлях до вашого AppModule
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

dotenv.config();

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const app = await NestFactory.create(AppModule);  // Ініціалізуємо додаток NestJS

    // Налаштовуємо CORS
    const corsOptions: CorsOptions = {
      origin: 'http://localhost:3000',  // Або ваш фронтенд
      credentials: true,
    };
    app.enableCors(corsOptions);

    // Використовуємо cookie-parser
    app.use(cookieParser());

    // Ініціалізація NestJS додатка
    await app.init();

    // Якщо потрібно відправити відповідь
    res.status(200).json({ message: 'NestJS server is running on Vercel!' });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
};
