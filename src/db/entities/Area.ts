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

  @Column('double', { default: 0 })
  sinLongitude!: number;

  @Column('double', { default: 0 })
  cosLongitude!: number;

  @Column('double', { default: 0 })
  sinLatitude!: number;

  @Column('double', { default: 0 })
  cosLatitude!: number;
}

export default Area;
