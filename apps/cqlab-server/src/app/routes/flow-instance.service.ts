import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
// import { MockDbService } from './mock-db.service';
import {
  IFlowStepAnswer,
  InteractiveFlowState,
  CQFlowExecutorStateEnum,
  InteractiveFlowContextOptions,
  LazyFlowDefinitionRetriever,
  IFlowDefinition,
} from '@cqlab/cqflow-core';
import { FlowInstanceEntity } from '../models/flow-instance.entity';
import { FlowDefinitionEntity } from '../models/flow-definition.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlowService } from './flow.service';
import { flowRepository } from '@cqlab/cqexamples';

@Injectable()
export class FlowInstanceService {
  constructor(
    private readonly flowService: FlowService,

    // Temporarily commenting out repository injection
    // @InjectRepository(FlowInstanceEntity)
    // private flowInstanceRepo: Repository<FlowInstanceEntity>
  ) {}

  async getFlowInstancesByFlowDefinitionId(
    flowDefinitionId: string
  ): Promise<FlowInstanceEntity[]> {
    // Temporarily returning mock data
    return [];
    // return this.flowInstanceRepo.find({
    //   where: { flowDefinition: { id: flowDefinitionId } },
    // });
  }

  async createFlowInstance({
    flowDefinitionId,
    initialData,
  }: {
    flowDefinitionId: string;
    initialData: any;
  }) {
    // Temporarily returning mock data
    const flowInstance = new FlowInstanceEntity();
    flowInstance.id = 'mock-id';
    flowInstance.answers = [];
    flowInstance.initialData = initialData;
    flowInstance.status = CQFlowExecutorStateEnum.Initiated;
    flowInstance.actionsTaken = {};
    return flowInstance;

    // const flowDef = await this.flowService.getDefinitionById(flowDefinitionId);
    // if (!flowDef) {
    //   throw new HttpException(
    //     `FlowDefinition not found with id: ${flowDefinitionId}`,
    //     HttpStatus.NOT_FOUND
    //   );
    // }

    // const flowInstance = new FlowInstanceEntity();
    // flowInstance.answers = [];

    // flowInstance.flowDefinition = flowDef;
    // flowInstance.initialData = initialData;
    // flowInstance.status = CQFlowExecutorStateEnum.Initiated;
    // flowInstance.actionsTaken = {};
    // await this.flowInstanceRepo.save(flowInstance);
    // return flowInstance;
  }

  async getFlowInstanceActiveSteps(flowInstanceId: string) {
    // Temporarily returning mock data
    const flowInstance = new FlowInstanceEntity();
    flowInstance.id = flowInstanceId;
    flowInstance.answers = [];
    flowInstance.initialData = {};
    flowInstance.status = CQFlowExecutorStateEnum.Initiated;
    flowInstance.actionsTaken = {};

    // const flowInstance = await this.flowInstanceRepo.findOne({
    //   where: { id: flowInstanceId },
    //   relations: {
    //     flowDefinition: true,
    //   },
    // });

    // // const flowDefinition = findFlowDefinitionByBindId(flowInstance.flowId);

    // if (!flowInstance) {
    //   throw new HttpException(
    //     `Unable to find flowInstance by id: ${flowInstanceId}`,
    //     HttpStatus.NOT_FOUND
    //   );
    //   // throw new Error('Unable to find flow definition: ' + flowInstance.flowId);
    // }

    // Temporarily using a mock bindId
    const mockBindId = 'mock-bind-id';
    const module = flowRepository.getInteractiveModule(mockBindId);
    // const module = flowRepository.getInteractiveModule(
    //   flowInstance.flowDefinition.bindId
    // );

    if (!module) {
      throw new Error(
        'Unable to find module for flow definition: ' + mockBindId
      );
    }

    const onUpdate = async (nextFlowInstance: InteractiveFlowState<any>) => {
      // TODO: should this update the DB when an action is triggered??
      return nextFlowInstance;
    };

    const flowServiceLocal = this.flowService;

    class FlowDefinitionRetriever extends LazyFlowDefinitionRetriever {
      data: Record<string, IFlowDefinition> = {};

      async loadFlowDefinitionById(id: string): Promise<IFlowDefinition> {
        // Temporarily returning mock data
        return {
          id: id,
          bindId: 'mock-bind-id',
          nodes: {},
          createdAt: new Date().toISOString(),
          version: '0.0.1'
        };

        // if (!this.data[id]) {
        //   const flowDef = await flowServiceLocal.getDefinitionById(id);
        //   if (!flowDef) {
        //     throw new Error(`No flow definition for id: ${id}`);
        //   }
        //   this.data[id] = flowDef;
        // }
        // return this.data[id];
      }
    }

    const opts: InteractiveFlowContextOptions<any, string> = {
      flowDefinitionId: 'mock-flow-definition-id', // Temporarily using mock ID
      initialData: flowInstance.initialData,
      flowDefinitionRetriever: new FlowDefinitionRetriever(),
      interactiveFlowState: flowInstance,
      onUpdateInteractiveState: onUpdate,
    };

    // Add a mock flowDefinition to the flowInstance
    flowInstance.flowDefinition = {
      id: 'mock-flow-definition-id',
      bindId: mockBindId,
      nodes: {},
      createdAt: new Date().toISOString()
    } as FlowDefinitionEntity;

    const activeSteps = await module.execute(opts, flowRepository);

    return {
      status: CQFlowExecutorStateEnum.Initiated,
      steps: activeSteps,
    };
  }

  async addFlowInstanceAnswer(
    flowInstanceId: string,
    answer: { stepId: string; answer: IFlowStepAnswer }
  ) {
    // Temporarily returning mock data
    const flowInstance = new FlowInstanceEntity();
    flowInstance.id = flowInstanceId;
    flowInstance.answers = [];
    flowInstance.initialData = {};
    flowInstance.status = CQFlowExecutorStateEnum.Initiated;
    flowInstance.actionsTaken = {};

    // const flowInstance = await this.flowInstanceRepo.findOne({
    //   where: { id: flowInstanceId },
    // });

    // if (!flowInstance) {
    //   throw new HttpException(
    //     `Unable to find flowInstance by id: ${flowInstanceId}`,
    //     HttpStatus.NOT_FOUND
    //   );
    // }

    flowInstance.answers.push(answer);

    // Commenting out database save
    // await this.flowInstanceRepo.save(flowInstance);

    // const nextFlowInstance = {
    //   ...flowInstance,
    //   answers: [...flowInstance.answers, answer],
    // };
    // this.mockDbService.updateFlowInstance(nextFlowInstance);
    return flowInstance;
  }

  removeFlowInstanceById(flowInstanceId: string) {
    // Temporarily returning a mock result
    return { affected: 1, raw: {} };
    // return this.flowInstanceRepo.delete({ id: flowInstanceId });
  }
}
