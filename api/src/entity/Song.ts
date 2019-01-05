import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    title: string;

    @Column()
    @IsNotEmpty()
    album: string;

    @Column()
    @IsNotEmpty()
    artist: string;

    @Column()
    @IsNotEmpty()
    albumImg: string;

    @Column()
    @IsNotEmpty()
    youtubeID: string;
}
