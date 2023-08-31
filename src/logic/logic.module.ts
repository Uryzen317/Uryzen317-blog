import { BadRequestException, Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid'
import { AccessGuard } from './guards/access.guard';
import { TopicsController } from './controllers/topics.controller';
import { TopicsService } from './services/topics.service';

@Module({
  controllers: [PostsController, TopicsController],
  providers: [PostsService, AccessGuard, TopicsService],
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: '../files/',
        filename(req, file, callback) {
          callback(null, v4() + extname(file.originalname))
        },
      }),
      limits: {
        files: 1,
        fileSize: 100 * 1000 * 1000 // 100mb,
      },
      fileFilter(req, file, callback) {
        if (file.mimetype !== 'image/jpeg') {
          callback(new BadRequestException(), false)
        }
        callback(null, true)
      },
    })
  ],

})
export class LogicModule { }
