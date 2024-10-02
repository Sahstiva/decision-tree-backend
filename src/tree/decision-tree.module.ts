import { Module } from '@nestjs/common';
import { DecisionTreeService } from './decision-tree.service';
import { DecisionTreeController } from './decision-tree.controller';

@Module({
  controllers: [DecisionTreeController],
  providers: [DecisionTreeService],
})
export class DecisionTreeModule {}
