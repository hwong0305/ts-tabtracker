import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    album: string;

    @Column()
    artist: string;

    @Column()
    albumImg: string;

    @Column()
    youtubeID: string;
}
