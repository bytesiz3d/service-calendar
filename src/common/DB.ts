import { DynamoDBClient, BatchExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { accessKeyId, secretAccessKey, region } from "@/common/aws.config.json";

export class DB {
	private client: DynamoDBClient;

	constructor() {
		this.client = new DynamoDBClient({
			credentials: { accessKeyId, secretAccessKey },
			region
		})
	}

	async getStartDate() : Promise<Date> {
		let command = new BatchExecuteStatementCommand({
			Statements: [
				{ Statement: `SELECT start_date FROM "service-calendar" WHERE _id = 0` }
			]
		})

		let dateString: string | undefined = undefined;
		let { Responses } = await this.client.send(command);
		if (Responses)
		{
			const { Item } = Responses[0];
			dateString = Item?.start_date?.S;
		}

		return new Date(dateString ?? new Date().toISOString());
	}
}