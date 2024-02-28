import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { SearchService } from './search.service';
import { CreateIndexDto } from './dto/create-index.dto';
import { CreateDocumentDto } from './dto/create-document.dto';

@Controller('search')
@ApiTags('search')
@UseInterceptors(CacheInterceptor)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('indexes')
  createIndex(@Body() createIndexDto: CreateIndexDto) {
    return this.searchService.createIndex(createIndexDto);
  }

  @Get('indexes')
  indexes() {
    return this.searchService.getIndexes();
  }

  @Get('indexes/:indexUid')
  oneIndex(@Param('indexUid') indexUid: string) {
    return this.searchService.getOneIndex(indexUid);
  }

  @Delete('indexes/:indexUid')
  deleteIndex(@Param('indexUid') indexUid: string) {
    return this.searchService.deleteIndex(indexUid);
  }

  @Post('documents')
  addDocument(@Body() createDocumentDto: CreateDocumentDto) {
    return this.searchService.createDocument(createDocumentDto);
  }

  @Get('documents/:indexUid')
  getDocuments(@Param('indexUid') indexUID: string) {
    return this.searchService.getDocuments(indexUID);
  }

  @Get('documents/:indexUid/:documentId')
  getOneDocument(
    @Param('indexUid') indexUid: string,
    @Param('documentId') documentId: string,
    @Query('fields') fields: string[] = [],
  ) {
    return this.searchService.getDocument(indexUid, documentId);
  }

  @Get('query/:indexUid')
  search(@Param('indexUid') indexUid: string, @Query('q') query: string) {
    return this.searchService.search(indexUid, query);
  }

  @Get()
  multiSearch(@Query('q') query: string) {
    return this.searchService.multiSearch(query);
  }

  @Delete('documents/:indexUid/:documentId')
  deleteDocument(
    @Param('indexUid') indexUid: string,
    @Param('documentId') documentId: string,
    @Query('all') all: boolean = false,
  ) {
    return this.searchService.deleteDocument(indexUid, documentId, all);
  }
}
