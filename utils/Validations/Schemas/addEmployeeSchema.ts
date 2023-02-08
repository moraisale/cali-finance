import * as yup from 'yup';
import { ethAddressRegex } from '../regex';

export const addEmployeeSchema = yup.object().shape({
	walletAddress: yup
		.string()
		.required('Required')
		.matches(ethAddressRegex, `This wallet does not exist`)
		.min(40),
	amount: yup
		.number()
		.required('Required')
		.positive('Amount must be positive')
		.typeError('Amount must be a number'),
});
