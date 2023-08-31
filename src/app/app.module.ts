import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { LogicModule } from 'src/logic/logic.module';
import { JwtModule } from '@nestjs/jwt';
import { DownloadModule } from 'src/download/download.module';


@Module({
  imports: [ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
  }),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '1d'
    },
    global: true,
  }),
    UserModule,
    LogicModule,
    DownloadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
