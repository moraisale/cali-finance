import { Flex } from '@chakra-ui/react';
import {
	CompaniesHeader,
	EmployeesDashboard,
	RecentActivities,
} from 'components';
import { useCompanies } from 'hooks';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect } from 'react';

export const OverviewComponent = () => {
	const { selectedCompany } = useCompanies();
	const { data: session } = useSession();

	useEffect(() => {
		if (!session) Router.push('/app/companies');
	}, []);

	return (
		<Flex direction="column">
			<Flex w="100%" bg="white" position="absolute" h="14.4rem" left="0" />
			<Flex
				color="black"
				pt="6"
				zIndex="docked"
				direction="column"
				align="start"
			>
				<CompaniesHeader company={selectedCompany} />
			</Flex>
			<Flex py="6" direction="column" gap="9">
				<Flex pt="6">
					<EmployeesDashboard
						employees={selectedCompany.employees!}
						isGeneral={false}
					/>
				</Flex>
				<RecentActivities />
			</Flex>
		</Flex>
	);
};
