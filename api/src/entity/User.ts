import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { IsAlpha, IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Bookmark } from './Bookmark';
import { SongHistory } from './SongHistory';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9._@]+$/)
    username: string;

    @Column()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]{6,24}$/)
    password: string;

    @Column({ unique: true })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    @IsAlpha()
    firstName: string;

    @Column()
    @IsNotEmpty()
    @IsAlpha()
    lastName: string;

    @ManyToMany(_type => Bookmark, { cascade: true })
    @JoinTable()
    bookmarks: Bookmark[];

    @OneToOne(_type => SongHistory)
    @JoinColumn()
    history: SongHistory;
}
