import { IExecuteFunctions } from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodePropertyTypes,
} from 'n8n-workflow';

import { OptionsWithUri } from 'request';

export class ToolzzCreateStudentOnInstitution implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Toolzz Create Studant on Institution',
		name: 'toolzzCreateStudentOnInstitution',
		icon: 'file:toolzzShowSchoolAndClasses.svg',
		group: ['transform'],
		version: 1,
		description: 'Get School and Classes of Toolzz API',
		defaults: {
			name: 'ToolzzCreateStudentOnInstitution',
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
				displayName: 'E-mail',
				name: 'email',
				type: 'string' as NodePropertyTypes,
				default: '',
			},
			{
				displayName: 'Nome',
				name: 'name',
				type: 'string' as NodePropertyTypes,
				default: '',
			},
			{
				displayName: 'ID da Escola',
				name: 'schoo_id',
				type: 'string' as NodePropertyTypes,
				default: '',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let responseData;
		const accessToken = this.getNodeParameter('accessToken', 0) as string;

		const uri = this.getNodeParameter('url', 0) as string;

		const name = this.getNodeParameter('name', 0) as string;
		const email = this.getNodeParameter('email', 0) as string;
		const birth_date = this.getNodeParameter('birth_date', 0) as string;
		const institutionCode = this.getNodeParameter('institutionCode', 0) as string;
		const password_confirmation = this.getNodeParameter('password_confirmation', 0) as string;
		const password = this.getNodeParameter('password', 0) as string;

		const data: IDataObject = {
			name,
			email,
			password,
			birth_date,
			institutionCode,
			password_confirmation,
		};

		const options: OptionsWithUri = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: data,
			uri: `${uri}/api/users`,
			json: true,
		};

		responseData = await this.helpers.request(options);

		return [this.helpers.returnJsonArray(responseData)];
	}
}
