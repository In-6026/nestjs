import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

@Injectable()
export class CokieService {
    // 测试 事件 event mitter 跨模块
    @OnEvent('test_mitt_in_cokieService')
    testMitt({ message })  {
        console.log('cokie test mitt and  get a message: ', message)
    }
}
