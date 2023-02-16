import { Flex, FormControl } from '@chakra-ui/react';
import {
	NavigationBack,
	EditCompanyComponent,
	EditCompanyLink,
} from 'components';
import { AppLayout, CompanyWhiteBackground } from 'layouts';
import { navigationPaths } from 'utils';
import { IEditCompany } from 'types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCompanies, useSchema } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import router from 'next/router';

export const EditCompany = () => {
	const { t: translate } = useTranslation('create-company');
	const { editCompanySchema } = useSchema();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IEditCompany>({
		resolver: yupResolver(editCompanySchema),
	});
	const { data: session } = useSession();

	useEffect(() => {
		if (!session) router.push('/app/companies');
	}, [session]);

	const handleEditCompany = (editedCompanyData: IEditCompany) => {
		console.log(editedCompanyData);
	};
	const { selectedCompany } = useCompanies();
	return (
		<form onSubmit={handleSubmit(handleEditCompany)}>
			<FormControl>
				<AppLayout
					right={
						<EditCompanyLink control={control} company={selectedCompany} />
					}
				>
					<CompanyWhiteBackground />
					<Flex direction="column" gap="10" zIndex="docked" pt="6" w="100%">
						<Flex w="100%">
							<NavigationBack href={navigationPaths.dashboard.companies.home}>
								{translate('backToCompanies')}
							</NavigationBack>
						</Flex>
						<EditCompanyComponent
							errors={errors}
							control={control}
							company={selectedCompany}
						/>
					</Flex>
				</AppLayout>
			</FormControl>
		</form>
	);
};
