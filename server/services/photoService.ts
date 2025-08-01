import { createD1Client } from '~~/server/database/client';
import type { H3Event } from 'h3';

/**
 * Service for managing photo data in the D1 database
 */
export class PhotoService {
  private client;

  constructor(event: H3Event) {
    const d1Database = event.context.cloudflare.env.DB;
    this.client = createD1Client(d1Database);
  }

  async savePhoto({
    id,
    filename,
    originalFilename,
    mimeType,
    size,
    latitude,
    longitude,
    description,
  }: {
    id: string;
    filename: string;
    originalFilename: string;
    mimeType: string;
    size: number;
    latitude?: string;
    longitude?: string;
    description?: string;
  }) {
    return await this.client.db.insert(this.client.schema.photos).values({
      id,
      filename,
      originalFilename,
      mimeType,
      size,
      latitude,
      longitude,
      description,
      uploadedAt: Date.now(),
    });
  }

  /**
   * Get all photos from the database
   */
  async getAllPhotos() {
    return await this.client.db.select().from(this.client.schema.photos);
  }
}
