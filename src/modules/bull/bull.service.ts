import { Queue, Job } from 'bull'
import { Process, Processor, InjectQueue } from '@nestjs/bull/dist/decorators'

@Processor('audio')
export class BullService {
	constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}

	async createdBull(audioName: string): Promise<string> {
		await this.audioQueue.add('llc', audioName)
		return 'add sucess!'
	}

	@Process('llc')
	async logAudioName(job: Job<string>) {
		console.log('Processing', job.id, 'for 2 seconds')
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve('')
			}, 2 * 1000)
		})
		console.log('Processing done', job.id)
	}
}
