import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface AppInterface {
    getId(): number;
    getApiKey(): string;
    getTitle(): string;
}

@Entity()
export class App implements AppInterface {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        unique: true
    })
    title: string;

    @Column()
    apiKey: string;

    constructor(
        title: string,
        apiKey: string
    ) {
        this.title = title;
        this.apiKey = apiKey;
    }

    getApiKey(): string {
        return this.apiKey;
    }

    getTitle(): string {
        return this.title;
    }

    getId(): number {
        return this.id;
    }
}
