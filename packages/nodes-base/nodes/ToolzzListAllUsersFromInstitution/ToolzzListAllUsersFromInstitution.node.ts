import { IExecuteFunctions } from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodePropertyTypes,
} from 'n8n-workflow';

import { OptionsWithUri } from 'request';

export class ToolzzListAllUsersFromInstitution implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Toolzz List All Users Institution',
		name: 'ToolzzListAllUsersFromInstitution',
		icon: 'file:toolzzShowSchoolAndClasses.svg',
		group: ['transform'],
		version: 1,
		description: 'Get Users from institution of Toolzz API',
		defaults: {
			name: 'ToolzzListAllUsersFromInstitution',
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
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let responseData;
		const accessToken = this.getNodeParameter('accessToken', 0) as string;

		const uri = this.getNodeParameter('url', 0) as string;

		const options: OptionsWithUri = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			uri: `${uri}/api/users`,
			json: true,
		};

		responseData = await this.helpers.request(options);

		return [this.helpers.returnJsonArray(responseData)];
	}
}
