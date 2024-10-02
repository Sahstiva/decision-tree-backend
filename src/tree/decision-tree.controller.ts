import { Controller, Post, Body, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { DecisionTreeService } from './decision-tree.service';

@Controller('decision-tree')
export class DecisionTreeController {
  constructor(private readonly decisionTreeService: DecisionTreeService) {}

  @Post('execute')
  @HttpCode(HttpStatus.OK)
  async executeTree(@Body() tree: any): Promise<string> {
    try {
      await this.decisionTreeService.executeTree(tree);
      return 'Decision Tree Executed';
    } catch (error) {
      console.error('Error executing decision tree', error);
      throw new BadRequestException(error.message);
    }
  }
}
