import { IExecuteFunctions } from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodePropertyTypes,
} from 'n8n-workflow';

import { OptionsWithUri } from 'request';

export class ToolzzAttachStudents implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Toolzz Attach Students',
		name: 'toolzzAttachStudents',
		icon: 'file:toolzzShowCourse.svg',
		group: ['transform'],
		version: 1,
		description: 'Attach Students Toolzz API',
		defaults: {
			name: 'ToolzzAttachStudents',
			color: '#1A82e2',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [],
		properties: [
			{
				displayName: 'AccessToken',
				name: 'accessToken',
				type: 'string' as NodePropertyTypes,
				default: '',
			},
			{
				displayName: 'Ambiente',
				name: 'url',
				type: 'options',
				options: [
					{
						name: 'prod',
						value: 'https://kong.api.toolzz.com.br',
					},
					{
						name: 'homol',
						value: 'http://homol.playapp.edulabzz.com.br:8000',
					},
					{
						name: 'release',
						value: 'http://release.edulabzz.com.br:8000',
					},
				],
				default: 'https://kong.api.toolzz.com.br', // The initially selected option
				description: 'Selecione o ambiente',
			},
			{
				displayName: 'ID da Turma',
				name: 'class_id',
				type: 'string' as NodePropertyTypes,
				default: '',
			},
			{
				displayName: 'IDs dos Alunos',
				name: 'users_ids',
				type: 'string' as NodePropertyTypes,
				default: '',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let responseData;
		const accessToken = this.getNodeParameter('accessToken', 0) as string;

		const uri = this.getNodeParameter('url', 0) as string;
		const class_id = this.getNodeParameter('class_id', 0) as string;
		const users_ids = this.getNodeParameter('users_ids', 0) as string;

		let data = {
			users: users_ids.split(','),
		};

		const options: OptionsWithUri = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: data,
			uri: `${uri}/api/classes/${class_id}/attach`,
			json: true,
		};

		responseData = await this.helpers.request(options);

		return [this.helpers.returnJsonArray(responseData)];
	}
}
