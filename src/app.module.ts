import { Module } from '@nestjs/common';
import { DecisionTreeModule } from './tree/decision-tree.module';

@Module({
  imports: [DecisionTreeModule],
})
export class AppModule {}
