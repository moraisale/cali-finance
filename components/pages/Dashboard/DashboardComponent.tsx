import { Flex } from '@chakra-ui/react';
import {
	DashboardHeader,
	Coins,
	CreateOrganizationCard,
	SwapToken,
	HaveProblemCard,
	TeamsList,
	MyAssets,
	RecentActivities,
	ErrorAlert,
} from 'components';
import { usePicasso } from 'hooks';
import React from 'react';
import { IRecentActivitiesList } from 'types';
import useTranslation from 'next-translate/useTranslation';

export const DashboardComponent: React.FC = () => {
	const { t: translate } = useTranslation('dashboard');

	const recentActivitiesList: IRecentActivitiesList[] = [
		{
			type: translate('deposit'),
			date: '08 Aug 22, 20:57',
			value: '10,000 USDT',
			status: translate('completed'),
		},
		{
			type: translate('deposit'),
			date: '08 Aug 22, 20:57',
			value: '10,000 USDT',
			status: translate('completed'),
		},
		{
			type: translate('deposit'),
			date: '08 Aug 22, 20:57',
			value: '10,000 USDT',
			status: translate('completed'),
		},
		{
			type: translate('deposit'),
			date: '08 Aug 22, 20:57',
			value: '10,000 USDT',
			status: translate('completed'),
		},
	];

	const isLogged = true;
	const error = false;
	const shouldNotDisplayError = error ? 'none' : 'flex';
	const shouldDisplayError = error ? 'flex' : 'none';
	const shouldNotDisplayDash = isLogged ? 'none' : 'flex';
	const shouldDisplayDash = isLogged ? 'flex' : 'none';
	const theme = usePicasso();
	return (
		<Flex
			bg="white"
			w="full"
			h="95vh"
			m="auto"
			borderLeft="0.25rem solid"
			borderColor={theme.branding.blue}
		>
			<Flex direction="column" px="8" gap="4" display={shouldNotDisplayError}>
				<DashboardHeader />
				<Coins />
				<Flex display={shouldNotDisplayDash}>
					<CreateOrganizationCard />
				</Flex>
				<Flex display={shouldDisplayDash}>
					<TeamsList />
				</Flex>
				<Flex display={shouldDisplayDash} gap="6">
					<MyAssets />
					<RecentActivities recentActivitiesList={recentActivitiesList} />
				</Flex>
			</Flex>
			<Flex direction="column" gap="2" display={shouldNotDisplayError}>
				<SwapToken />
				<HaveProblemCard />
			</Flex>
			<Flex
				align="center"
				w="full"
				justify="center"
				display={shouldDisplayError}
			>
				<ErrorAlert />
			</Flex>
		</Flex>
	);
};

export default DashboardComponent;
