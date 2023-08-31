import { Injectable } from "@nestjs/common";
import { CreateTopicDTO } from "../validators/topics.dto";
import { Topic, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TopicsService {
  constructor(private prismaService: PrismaService) {}

  async createTopic(
    createTopicDTO: CreateTopicDTO,
    user: User
  ): Promise<Topic> {
    let { title } = createTopicDTO;
    let { id } = user;

    return this.prismaService.topic.create({
      data: {
        title,
        authorId: id,
      },
    });
  }

  async topics(): Promise<Topic[]> {
    return await this.prismaService.topic.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });
  }

  async topic(title: string): Promise<Topic> {
    return this.prismaService.topic.findUnique({
      where: {
        title,
      },
      include: {
        posts: {
          include: {
            updatedBy: {
              select: {
                username: true,
              },
            },
            author: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
  }
}
