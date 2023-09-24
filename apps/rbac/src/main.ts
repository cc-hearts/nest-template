import { NestFactory } from '@nestjs/core';
import { RbacModule } from './rbac.module';
import { ValidationPipe } from '@nestjs/common';
import { getConfig } from '../../../libs/utils/env';
import { generatorSwaggerDocument } from '../../../libs/utils/swagger';
import { AuthGuard } from '../../../libs/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ExceptionFilters } from '../../../libs/exception/exception.filter';
import { CustomLogger } from '../../../libs/logger/logger';
import { join } from 'path';

async function bootstrap() {
  const config = getConfig();
  const app = await NestFactory.create(RbacModule);

  const loggerIns = new CustomLogger({
    maxBufferSize: 1024 * 1024 * 2,
    loggerPath: join(process.cwd(), './logs'),
  });
  app.useLogger(loggerIns);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard(app.get(JwtService)));
  app.useGlobalFilters(new ExceptionFilters());
  generatorSwaggerDocument(app);

  await app.listen(config.port, () => {
    loggerIns.startLogger();
    console.log('service launch success: http://localhost:%d', config.port);
  });
}
bootstrap();
