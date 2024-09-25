import { Test, TestingModule } from '@nestjs/testing';
import { RecivesService } from '../recives.service';

describe('RecivesService', () => {
  let service: RecivesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecivesService],
    }).compile();

    service = module.get<RecivesService>(RecivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
