import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Song } from './Song';

@Entity()
export class SongHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    songs: Song[];
}
