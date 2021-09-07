import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Area {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: '' })
  address!: string;

  @Column('double')
  longitude!: number;

  @Column('double')
  latitude!: number;
}

export default Area;
