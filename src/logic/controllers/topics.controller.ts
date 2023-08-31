import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateTopicDTO } from '../validators/topics.dto';
import { AccessGuard } from '../guards/access.guard';
import { Topic, User, } from '@prisma/client';
import { TopicsService } from '../services/topics.service';

@Controller('topics')
export class TopicsController {
    constructor(private topicsService: TopicsService) { }

    //create topic
    @Put('/')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessGuard)
    createPost(@Body() createTopicDTO: CreateTopicDTO, @Req() req: { user: User }): Promise<Topic> {
        let { user } = req;
        return this.topicsService.createTopic(createTopicDTO, user);
    }

    // get the list of topics
    // or
    // get list of posts of a topic
    @Get('/:title?')
    @HttpCode(HttpStatus.OK)
    topics(@Param('title') title: string): Promise<Topic[]> | Promise<Topic> {
        // return list of all topics
        if (!title) return this.topicsService.topics();

        // return posts of an spicific topic
        return this.topicsService.topic(title);
    }
}
