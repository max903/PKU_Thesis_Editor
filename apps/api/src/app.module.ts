import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './modules/auth/auth.module';
// import { ThesisModule } from './modules/thesis/thesis.module';
// import { TemplateModule } from './modules/template/template.module';
// import { PluginModule } from './modules/plugin/plugin.module';
// import { PaymentModule } from './modules/payment/payment.module';
// import { AIModule } from './modules/ai/ai.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Database - uncomment when ready
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url: process.env.DATABASE_URL,
    //   autoLoadEntities: true,
    //   synchronize: process.env.NODE_ENV !== 'production',
    // }),

    // Feature modules - uncomment as implemented
    // AuthModule,
    // ThesisModule,
    // TemplateModule,
    // PluginModule,
    // PaymentModule,
    // AIModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
