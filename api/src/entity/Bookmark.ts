import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Song } from './Song';

@Entity()
export class Bookmark {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(_type => Song, { cascade: true })
    @JoinTable()
    songs: Song[];
}
