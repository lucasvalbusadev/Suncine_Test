import type { Entity } from "../entity"
import type { ValueObject } from "../value-object"

export interface RepositoryInterface<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>
  bulkInsert(entities: E[]): Promise<void>
  update(entity: E): Promise<void>
  delete(entity_id: EntityId): Promise<void>

  findById(entity_id: EntityId): Promise<E | null>
  findAll(): Promise<E[]>
  findByIds(ids: EntityId[]): Promise<E[]>
}
