import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "children_songs" })
export class ChildrenSong extends BaseEntity {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  key: string;
  @Column({ name: "created_at" })
  createdAt: string;
  @Column({ name: "updated_at" })
  updatedAt: string;
}
