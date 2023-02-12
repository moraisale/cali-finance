import { Flex, FormControl } from '@chakra-ui/react';
import {
	NewCompanyLinks,
	NavigationBack,
	CreateCompanyComponent,
} from 'components';
import { AppLayout, CompanyWhiteBackground } from 'layouts';
import { navigationPaths } from 'utils';
import { ICreateCompany } from 'types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CompaniesProvider } from 'contexts';
import useTranslation from 'next-translate/useTranslation';
import { useSchema } from 'hooks';

export const CreateCompany = () => {
	const { createCompanySchema } = useSchema();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ICreateCompany>({
		resolver: yupResolver(createCompanySchema),
	});
	const { t: translate } = useTranslation('create-company');

	const handleCreateCompany = (companyData: ICreateCompany) => {
		console.log(companyData);
	};

	return (
		<CompaniesProvider>
			<form onSubmit={handleSubmit(handleCreateCompany)}>
				<FormControl>
					<AppLayout right={<NewCompanyLinks control={control} />}>
						<CompanyWhiteBackground />
						<Flex direction="column" gap="10" zIndex="docked" pt="6" w="100%">
							<Flex w="100%">
								<NavigationBack href={navigationPaths.dashboard.companies.home}>
									{translate('backToCompanies')}
								</NavigationBack>
							</Flex>
							<CreateCompanyComponent errors={errors} control={control} />
						</Flex>
					</AppLayout>
				</FormControl>
			</form>
		</CompaniesProvider>
	);
};
