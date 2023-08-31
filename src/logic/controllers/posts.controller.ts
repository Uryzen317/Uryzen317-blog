import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from "@nestjs/common";
import { PostsService } from "../services/posts.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreatePostDto } from "../validators/posts.dto";
import { AccessGuard } from "../guards/access.guard";
import { Post as PostType, User } from "@prisma/client";

@Controller("posts")
export class PostsController {
  constructor(public postService: PostsService) {}

  // get posts (by page number // default 1)
  @Get("/:page?")
  @HttpCode(HttpStatus.OK)
  getPosts(@Param("page") page: number = 1): Promise<PostType[]> {
    return this.postService.getPosts(page);
  }

  // get post (increment views)
  @Get("post/:title")
  @HttpCode(HttpStatus.OK)
  getPost(@Param("title") title: string) {
    return this.postService.getPost(title);
  }

  // like post
  @Post("/:title")
  @HttpCode(HttpStatus.OK)
  likePost(@Param("title") title: string) {
    return this.postService.likePost(title);
  }

  // create post
  @Put("/")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor("icon"))
  @UseGuards(AccessGuard)
  createPost(
    @UploadedFile() icon: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
    @Req() req: { user: User }
  ): Promise<PostType> {
    return this.postService.createPost(createPostDto, icon, req.user);
  }

  // edit post
  @Patch("/:id")
  @HttpCode(HttpStatus.OK)
  editPost(editPostDto) {
    return this.postService.editPost(editPostDto);
  }

  // delete post
  @Delete("/:id")
  @HttpCode(HttpStatus.OK)
  deletePost(editPostDto) {
    return this.postService.editPost(editPostDto);
  }

  // get last posts (by 5)
  @Get("last-posts")
  @HttpCode(HttpStatus.OK)
  getLastPosts() {
    return this.postService.getLastEditedPosts();
  }

  // get last edited posts (by 5)
  @Get("last-edited")
  @HttpCode(HttpStatus.OK)
  getLastEditedPosts() {
    return this.postService.getLastEditedPosts();
  }

  // get most vied posts
  @Get("most-viewed")
  @HttpCode(HttpStatus.OK)
  getMostViewedPosts() {
    return this.postService.getMostViewedPosts();
  }

  // get most liked posts
  @Get("most-liked")
  @HttpCode(HttpStatus.OK)
  getMostLikedPosts() {
    return this.postService.getMostLikedPosts();
  }
}
