import { Injectable } from '@nestjs/common';
import { Index, MeiliSearch } from 'meilisearch';
import { CreateIndexDto } from './dto/create-index.dto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { IndexEntity } from './models/index.entity';

@Injectable()
export class SearchService {
  private readonly _client: MeiliSearch;
  private readonly _indexes: IndexEntity[] = [
    { uid: 'coordinates', primaryKey: 'uuid' },
    { uid: 'geometries', primaryKey: 'uuid' },
    { uid: 'departments', primaryKey: 'uuid' },
    { uid: 'districts', primaryKey: 'uuid' },
    { uid: 'towns', primaryKey: 'uuid' },
    { uid: 'directions', primaryKey: 'uuid' },
  ];

  constructor() {
    this._client = new MeiliSearch({
      host: 'http://localhost:7700',
      apiKey: process.env.MASTER_KEY,
    });

    this._indexes.forEach(async (index) => {
      await this._client.createIndex(index.uid, {
        primaryKey: index.primaryKey,
      });
    });
  }

  createIndex(index: CreateIndexDto) {
    const { uid, primaryKey } = index;
    return this._client.createIndex(uid, { primaryKey });
  }

  getIndexes() {
    return this._client.getIndexes();
  }

  getOneIndex(indexUid: string) {
    return this._client.index(indexUid).getRawInfo();
  }

  deleteIndex(indexUid: string) {
    return this._client.deleteIndex(indexUid);
  }

  createDocument(createDocumentDto: CreateDocumentDto) {
    const { uid, document } = createDocumentDto;
    return this._client.index(uid).addDocuments(document);
  }

  deleteDocument(indexUid: string, documentId: string, all: boolean = false) {
    if (all) return this._client.index(indexUid).deleteAllDocuments();
    return this._client.index(indexUid).deleteDocument(documentId);
  }

  getDocuments(indexUid: string) {
    return this._client.index(indexUid).getDocuments();
  }

  getDocument(indexUid: string, documentId: string, fields: string[] = []) {
    if (fields.length)
      return this._client
        .index(indexUid)
        .getDocument(documentId, { fields: fields });
    return this._client.index(indexUid).getDocument(documentId);
  }

  search(indexUid: string, query: string) {
    return this._client.index(indexUid).searchGet(query);
  }

  multiSearch(query: string) {
    const queriesIndex = [
      { indexUid: 'coordinates', q: query },
      { indexUid: 'geometries', q: query },
      { indexUid: 'departments', q: query },
      { indexUid: 'districts', q: query },
      { indexUid: 'towns', q: query },
      { indexUid: 'directions', q: query },
    ];

    return this._client.multiSearch({ queries: queriesIndex });
  }
}
