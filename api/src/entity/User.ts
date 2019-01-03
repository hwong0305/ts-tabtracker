import { Entity, PrimaryGeneratedColumn, Generated, Column } from 'typeorm';
import { IsAlpha, IsEmail, IsNotEmpty, Matches } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Generated('uuid')
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
}
