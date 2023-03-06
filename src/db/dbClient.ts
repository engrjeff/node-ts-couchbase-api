import { Bucket, connect, Scope, QueryOptions, GetOptions, InsertOptions } from 'couchbase';

class DBClient {
  private HOST = process.env.DB_HOST as string;
  private USERNAME = process.env.DB_USER as string;
  private PASSWORD = process.env.DB_PASSWORD as string;
  private BUCKET_NAME = process.env.DB_BUCKET as string;
  private SCOPE_NAME = process.env.DB_SCOPE as string;

  private bucket!: Bucket;
  private scope!: Scope;

  // Singleton pattern
  private static instance: DBClient;

  public static getInstance(): DBClient {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient();
    }

    DBClient.instance.createConnection();

    return DBClient.instance;
  }

  private async createConnection() {
    try {
      const cluster = await connect(this.HOST, {
        username: this.USERNAME,
        password: this.PASSWORD,
      });

      this.bucket = cluster.bucket(this.BUCKET_NAME);
      this.scope = this.bucket.scope(this.SCOPE_NAME);

      console.log('Connected to DB');
    } catch (error) {
      console.log('Connection error', error);
    }
  }

  private constructor() {}

  // query
  public async query<T>(queryStr: string, options?: QueryOptions) {
    const result = await this.scope.query<T>(queryStr, options);
    return result.rows;
  }

  // find one
  public async findOne<T>(collectionName: string, id: string, options?: GetOptions) {
    const collection = this.scope.collection(collectionName);
    const document = await collection.get(id, options);

    return document.content as T;
  }

  public async insert<T>(collectionName: string, doc: T, options?: InsertOptions) {
    const id = Date.now().toString();

    await this.scope.collection(collectionName).insert(id, doc, options);

    return await this.findOne<T>(collectionName, id);
  }
}

const dbClient = DBClient.getInstance();

export default dbClient;
