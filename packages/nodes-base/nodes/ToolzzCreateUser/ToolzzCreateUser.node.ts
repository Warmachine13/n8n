import { IExecuteFunctions } from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodePropertyTypes,
} from 'n8n-workflow';

import { OptionsWithUri } from 'request';

export class ToolzzCreateUser implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Toolzz Create User',
		name: 'toolzzCreateUser',
		icon: 'file:toolzzCreateUser.svg',
		group: ['transform'],
		version: 1,
		description: 'Create User Toolzz API',
		defaults: {
			name: 'ToolzzCreateUser',
			color: '#1A82e2',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [],
		properties: [
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
				displayName: 'AccessToken',
				name: 'accessToken',
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
				displayName: 'Email',
				name: 'email',
				type: 'string' as NodePropertyTypes,
				default: '',
			},
			{
				displayName: 'Senha',
				name: 'password',
				type: 'string' as NodePropertyTypes,
				default: '',
			},
			{
				displayName: 'Escola ID',
				name: 'escola_id',
				type: 'string' as NodePropertyTypes,
				default: '',
			},
			{
				displayName: 'Instituição ID',
				name: 'instituicao_id',
				type: 'string' as NodePropertyTypes,
				default: '',
			},
			{
				displayName: 'Confirme sua senha',
				name: 'password_confirmation',
				type: 'string' as NodePropertyTypes,
				default: '',
			},
			{
				displayName: 'Data de nascimento',
				name: 'birth_date',
				type: 'string' as NodePropertyTypes,
				default: '',
			},
			{
				displayName: 'Código da institutição',
				name: 'institutionCode',
				type: 'string' as NodePropertyTypes,
				default: '',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let responseData;

		const name = this.getNodeParameter('name', 0) as string;
		const email = this.getNodeParameter('email', 0) as string;
		const birth_date = this.getNodeParameter('birth_date', 0) as string;
		const institutionCode = this.getNodeParameter('institutionCode', 0) as string;
		const instituicao_id = this.getNodeParameter('instituicao_id', 0) as string;
		const escola_id = this.getNodeParameter('escola_id', 0) as string;
		const password_confirmation = this.getNodeParameter('password_confirmation', 0) as string;
		const password = this.getNodeParameter('password', 0) as string;

		const accessToken = this.getNodeParameter('accessToken', 0) as string;
		const uri = this.getNodeParameter('url', 0) as string;

		const data: IDataObject = {
			name,
			email,
			password,
			birth_date,
			institutionCode,
			password_confirmation,
			instituicao_id,
			escola_id,
		};

		const options: OptionsWithUri = {
			method: 'POST',
			body: data,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			uri: `${uri}/api/users/new`,
			json: true,
		};

		responseData = await this.helpers.request(options);

		return [this.helpers.returnJsonArray(responseData)];
	}
}
