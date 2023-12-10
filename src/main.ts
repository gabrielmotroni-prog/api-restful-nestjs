import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //permite transformar os dados json para a nossa classe DTO
      transform: true,
      //ignorar `propriedades` que vieram no json que n foram mapeados na classe sem dar erro de forma silenciona
      whitelist: true,
      // lancar um erro caso alguem mandar um `dado` que não atende criterio da  DTO
      forbidNonWhitelisted: true,
    }),
  );

  // passar ao class validator mesmo container de resolucao de depencia que nestjs usa. A patir da raiz ele consegue resolverr qualquer dependencia. Em caso de erro ele usa a propria estrutura.
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
