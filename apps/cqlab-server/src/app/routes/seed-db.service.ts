import { seedFlowDefinitions } from '@cqlab/cqexamples';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { FlowDefinitionEntity } from '../models/flow-definition.entity';
// import { Repository } from 'typeorm';

@Injectable()
export class SeedDBService {
  constructor() {
    // Temporarily commenting out repository injection
    // @InjectRepository(FlowDefinitionEntity)
    // private flowDefRepo: Repository<FlowDefinitionEntity>
  }

  async runSeed() {
    // Temporarily returning mock data without database interaction
    console.log('Seed would normally add these flow definitions:', seedFlowDefinitions.length);
    return { success: true };

    // for (const flowDef of seedFlowDefinitions) {
    //   const foundFlow = await this.flowDefRepo.findOne({
    //     where: { bindId: flowDef.bindId },
    //   });

    //   if (foundFlow) {
    //     console.log('Flow already exists: ', flowDef.bindId);
    //     continue;
    //   }

    //   const flowDefEntity = new FlowDefinitionEntity();
    //   flowDefEntity.bindId = flowDef.bindId || '';
    //   flowDefEntity.nodes = flowDef.nodes;

    //   try {
    //     await this.flowDefRepo.save(flowDefEntity);
    //   } catch (err) {
    //     console.error('Error saving flowDef', err);
    //   }
    // }

    // return { success: true };
  }
}
