import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Post, User, Topic } from "@prisma/client";
import { CreatePostDto } from "../validators/posts.dto";

@Injectable()
export class PostsService {
  constructor(public prismaService: PrismaService) {}

  // // get posts (by page number // default 1)
  // @Get("/")
  // getPosts() { }
  async getPosts(page: number): Promise<Post[]> {
    page = page ? page : 1;
    const postsPerPage = 10;
    return await this.prismaService.post.findMany({
      skip: (page - 1) * postsPerPage,
      take: postsPerPage,
      orderBy: { createdAt: "asc" },
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
    });
  }

  // // get post (increment views)
  // @Get("/:id")
  // getPost() { }
  async getPost(title: string): Promise<Post> {
    return await this.prismaService.post.update({
      where: {
        title,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        updatedBy: {
          select: {
            username: true,
          },
        },
        topic: true,
      },
    });
  }

  // // like post
  // @Post("/:id")
  // likePost() {}
  async likePost(title: string) {
    return await this.prismaService.post.update({
      where: {
        title,
      },
      data: {
        likes: { increment: 1 },
      },
    });
  }

  // // create post
  // @Put("/")
  // createPost() { }
  async createPost(
    createPostDto: CreatePostDto,
    icon: Express.Multer.File,
    user: User
  ): Promise<Post> {
    const { title, topic, desc, lang, device } = createPostDto;
    return await this.prismaService.post.create({
      data: {
        title,
        desc,
        lang,
        device,
        createdAt: new Date(),
        topicId: Number(topic),
        authorId: user.id,
        icon: icon.filename,
      },
    });
  }

  // // edit post
  // @Patch('/:id')
  // editPost() { }
  async editPost(editPostDto): Promise<Post> {
    const { id, title, desc, lang, device, topic, author } = editPostDto;

    return await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        title,
        desc,
        lang,
        device,
        topic,
        updatedAt: new Date(),
        updatedBy: author,
      },
    });
  }

  // // delete post
  // @Delete('/:id')
  // deletePost() { }
  async deltePost(id: string): Promise<Post> {
    return await this.prismaService.post.delete({
      where: {
        id: Number(id),
      },
    });
  }

  // // get last posts (by 5)
  // @Get('last-posts')
  // getLastPosts() { }
  async getLastPosts(): Promise<Post[]> {
    return await this.prismaService.post.findMany({
      take: 5,
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  // // get last edited posts (by 5)
  // @Get('last-edited')
  // getLastEditedPosts() { }
  async getLastEditedPosts(): Promise<Post[]> {
    return await this.prismaService.post.findMany({
      take: 5,
      orderBy: {
        updatedAt: "asc",
      },
    });
  }

  // // get most vied posts
  // @Get('most-viewed')
  // getMostViewedPosts() { }
  async getMostViewedPosts(): Promise<Post[]> {
    return await this.prismaService.post.findMany({
      take: 5,
      orderBy: {
        views: "asc",
      },
    });
  }

  // // get most liked posts
  // @Get('most-liked')
  // getMostLikedPosts() { }
  async getMostLikedPosts(): Promise<Post[]> {
    return await this.prismaService.post.findMany({
      take: 5,
      orderBy: {
        likes: "asc",
      },
    });
  }
}
