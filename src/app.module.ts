import { Logger, LoggerService, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { RedisModule } from '@liaoliaots/nestjs-redis';

import { AppService } from './service/app.service';
import { CreateAppCommand } from './command/app/create-app.command';
import { PingController } from './controller/ping.controller';
import { User } from './entity/user.entity';
import { App } from './entity/app.entity';
import { RefreshToken } from './entity/refresh-token.entity';
import { UserService } from './service/user.service';
import { RegisterUserUseCase } from './use-case/register/register-user.use-case';
import { AppRepository } from './repository/app.repository';
import { UserRepository } from './repository/user.repository';
import { PasswordEncoder } from './service/password.encoder';
import { UserConfirmationSender } from './service/user-confirmation.sender';
import { UidGenerator } from './service/uid.generator';
import { ConfirmUserUseCase } from './use-case/register/confirm-user.use-case';
import { RedisService } from './service/redis.service';
import { RegistrationController } from './controller/registration.controller';
import { LoginUseCase } from './use-case/login/login.use-case';
import { LoginController } from './controller/login.controller';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AccessTokenService } from './service/access-token.service';
import { ConfirmUserListener } from './event-listener/user/confirm-user.listener';
import { EventEmitter } from './service/event.emitter';
import { LoginListener } from './event-listener/user/login.listener';
import { AuthenticateUseCase } from './use-case/auth/authenticate.use-case';
import { AuthController } from './controller/auth.controller';

const useCases = [
    RegisterUserUseCase,
    ConfirmUserUseCase,
    LoginUseCase,
    AuthenticateUseCase,
]

const entities = [
    User,
    App,
    RefreshToken
];

const services = [
    AppService,
    UserService,
    UserConfirmationSender,
    AccessTokenService,
];

const commands = [
    CreateAppCommand
];

const repositories = [
    AppRepository,
    UserRepository,
    RefreshTokenRepository,
];

const eventListeners = [
    ConfirmUserListener,
    LoginListener,
];

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'postgres',
            port: 5432,
            username: 'root',
            password: 'root',
            database: 'auth',

            entities,
            synchronize: true,
            // namingStrategy: TODO
        }),
        TypeOrmModule.forFeature(entities),
        RedisModule.forRoot({
            config: {
                host: 'redis',
                port: 6379
            }
        }),
        JwtModule.register({ secret: 'hard!to-guess_secret' }),
        EventEmitterModule.forRoot()
    ],
    controllers: [
        PingController,
        RegistrationController,
        LoginController,
        AuthController,
    ],
    providers: [
        ...services,
        ...commands,
        ...useCases,
        ...repositories,
        ...eventListeners,
        Logger,
        EventEmitter,
        PasswordEncoder,
        UidGenerator,
        RedisService,

    ],
})
export class AppModule {
    static createWinstonLogger(): LoggerService {
        return WinstonModule.createLogger({
            transports: [
                new winston.transports.File({
                    level: 'info',
                    dirname: 'var/log',
                    filename: 'dev.log'
                }),
                new winston.transports.Console({
                    level: 'debug'
                })
            ]
        });
    }
}
