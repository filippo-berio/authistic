import { App, AppInterface } from './app.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export interface UserInterface {
    getId(): number;
    getApp(): AppInterface;
    getLogin(): string;
    getPassword(): string;
    confirm();
    isConfirmed(): boolean;
}

@Entity()
export class User implements UserInterface {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => App)
    app: AppInterface;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    confirmed: boolean;

    constructor(
        app: AppInterface,
        login: string,
        password: string
    ) {
        this.app = app;
        this.login = login;
        this.password = password;
        this.confirmed = false;
    }

    getId(): number {
        return this.id;
    }

    getApp(): AppInterface {
        return this.app;
    }

    confirm() {
        this.confirmed = true;
    }

    getPassword(): string {
        return this.password;
    }

    isConfirmed(): boolean {
        return this.confirmed;
    }

    getLogin(): string {
        return this.login;
    }
}
