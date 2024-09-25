import { Test, TestingModule } from '@nestjs/testing';
import { RecivesController } from '../recives.controller';

describe('RecivesController', () => {
  let controller: RecivesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecivesController],
    }).compile();

    controller = module.get<RecivesController>(RecivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
