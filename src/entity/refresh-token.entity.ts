import { User, UserInterface } from './user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

export interface RefreshTokenInterface {
    getToken(): string;
}

@Entity()
export class RefreshToken implements RefreshTokenInterface {
    @PrimaryGeneratedColumn()
    id?: number;

    @OneToOne(type => User)
    @JoinColumn({
        name: 'user_id'
    })
    user: UserInterface;

    @Column()
    token: string;

    constructor(
        user: UserInterface,
        token: string
    ) {
        this.user = user;
        this.token = token;
    }

    getToken(): string {
        return this.token;
    }
}
