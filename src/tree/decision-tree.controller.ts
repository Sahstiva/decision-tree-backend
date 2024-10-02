import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DecisionTreeService } from './decision-tree.service';
import { DecisionResponse } from './interfaces/response.interface';

@Controller('decision-tree')
export class DecisionTreeController {
  constructor(private readonly decisionTreeService: DecisionTreeService) {}

  @Post('execute')
  @HttpCode(HttpStatus.OK)
  async executeTree(@Body() tree: any): Promise<DecisionResponse> {
    try {
      const state = await this.decisionTreeService.executeTree(tree);
      return { status: 'Decision Tree Executed', logs: state.getLogs() };
    } catch (error) {
      console.error('Error executing decision tree', error);
      throw new BadRequestException(error.message);
    }
  }
}
