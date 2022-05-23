import { Entity }          from 'typeorm'
import { Column }          from 'typeorm'
import { PrimaryColumn }   from 'typeorm'
import { OneToOne }        from 'typeorm'

import { DocumentType }    from '@verification/domain-module'

import { ApplicantEntity } from './applicant.entity'

@Entity()
export class IdDocumentEntity {
  @PrimaryColumn('uuid')
  id!: string

  @Column('enum', {
    enum: DocumentType,
    default: DocumentType.PASSPORT,
  })
  type!: DocumentType

  @Column('bytea')
  frontSide!: Buffer

  @Column('bytea')
  backSide!: Buffer

  @OneToOne(() => ApplicantEntity, (applicant) => applicant.idDocument)
  applicant!: ApplicantEntity
}
