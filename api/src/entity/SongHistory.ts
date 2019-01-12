import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Song } from './Song';

@Entity()
export class SongHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(_type => Song)
    @JoinTable()
    songs: Song[];
}
