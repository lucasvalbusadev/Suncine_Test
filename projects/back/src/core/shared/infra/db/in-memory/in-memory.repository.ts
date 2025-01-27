import type { Entity } from "../../../domain/entity"
import type { RepositoryInterface } from "../../../domain/repository/repository-interface"
import type { ValueObject } from "../../../domain/value-object"
import {
  DATABASE_DICTIONARY_ERRORS,
  DefaultDatabaseErrorCode
} from "../../../errors/dictionaries/dictionary-database-error"
import {
  DEFAULT_DICTIONARY_ERROS,
  DefaultErrorsCode
} from "../../../errors/dictionaries/dictionary-default-errors"
import { generateErrorMessage } from "../../../errors/handlers/generate-error"

export abstract class InMemoryRepository<E extends Entity, EntityId extends ValueObject>
  implements RepositoryInterface<E, EntityId>
{
  items: E[] = []

  // biome-ignore lint/suspicious/useAwait: use async to simulate promise on tests
  async insert(entity: E): Promise<void> {
    this.items.push(entity)
  }

  // biome-ignore lint/suspicious/useAwait: use async to simulate promise on tests
  async bulkInsert(entities: any[]): Promise<void> {
    this.items.push(...entities)
  }

  async update(entity: E): Promise<void> {
    const index_found = this.items.findIndex((item) => item.entityId.equals(entity.entityId))
    if (index_found === -1) {
      generateErrorMessage(
        DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
        DATABASE_DICTIONARY_ERRORS,
        {},
        "in-memory.repository ::: generateErrorMessage"
      )
    }
    this.items[index_found] = entity
  }

  async delete(entity_id: EntityId): Promise<void> {
    const index_found = this.items.findIndex((item) => item.entityId.equals(entity_id))
    if (index_found === -1) {
      generateErrorMessage(
        DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
        DATABASE_DICTIONARY_ERRORS,
        {},
        "in-memory.repository ::: delete"
      )
    }
    this.items.splice(index_found, 1)
  }

  async findById(entity_id: EntityId): Promise<E | null> {
    const item = this.items.find((item) => item.entityId.equals(entity_id))
    return typeof item === "undefined" ? null : item
  }

  // biome-ignore lint/suspicious/useAwait: use async to simulate promise on tests
  async findAll(): Promise<any[]> {
    return this.items
  }

  async findByIds(ids: EntityId[]): Promise<E[]> {
    return this.items.filter((entity) => {
      return ids.some((id) => entity.entityId.equals(id))
    })
  }

  async existsById(ids: EntityId[]): Promise<{ exists: EntityId[]; not_exists: EntityId[] }> {
    if (!ids.length) {
      generateErrorMessage(
        DefaultErrorsCode.INVALID_UUID,
        DEFAULT_DICTIONARY_ERROS,
        {},
        "in-memory.repository ::: existsById"
      )
    }

    if (this.items.length === 0) {
      return {
        exists: [],
        not_exists: ids
      }
    }

    const exists_id = new Set<EntityId>()
    const not_exists_id = new Set<EntityId>()
    ids.forEach((id) => {
      const item = this.items.find((entity) => entity.entityId.equals(id))
      item ? exists_id.add(id) : not_exists_id.add(id)
    })
    return {
      exists: Array.from(exists_id.values()),
      not_exists: Array.from(not_exists_id.values())
    }
  }
}
