import {
	Flex,
	Grid,
	GridItem,
	Link,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import {
	NavigationBack,
	NotificationPopover,
	OrganizationsHeader,
	RecentActivities,
	TeamsCard,
	WithdrawalsBanner,
} from 'components';
import { OrganizationsProvider } from 'contexts';
import { usePicasso } from 'hooks';
import { AppLayout } from 'layouts';
import { navigationPaths } from 'utils';
import { INotificationList } from 'types';
import { useState } from 'react';

const teams = [
	{
		name: 'Marketing',
		logo: '/images/team1.png',
		funds: '2,234.05',
		members: 27,
	},
	{
		name: 'Sales',
		logo: '/images/team2.png',
		funds: '92,234.11',
		members: 170,
	},
	{
		name: 'Finance',
		logo: '/images/team3.png',
		funds: '5,234.11',
		members: 13,
	},
];

const layoutLimit = 800;

export const OverviewTab = () => {
	const [notificationsList, setNotificationsList] = useState<
		INotificationList[]
	>([
		{
			type: 'You made a deposit of $23,456.02',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: 'You created Kylie Cosmetics',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: '0x6856...BF99 added to Kylie Baby',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: 'Marketing Team created Kylie Skin',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: 'Marketing Team created Kylie Skin',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: 'Marketing Team created Kylie Skin',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
	]);
	const { onClose, isOpen, onOpen } = useDisclosure();
	const theme = usePicasso();

	return (
		<OrganizationsProvider>
			<AppLayout right={<WithdrawalsBanner />}>
				<Flex
					w="100%"
					bg="white"
					h="64"
					position="absolute"
					borderRadius="base"
				/>
				<Flex
					color="black"
					pt="6"
					zIndex="docked"
					direction="column"
					align="start"
					maxW={layoutLimit}
				>
					<Flex w="100%" justify="space-between" pr="2">
						<NavigationBack href={navigationPaths.dashboard.organizations.home}>
							Back to Organizations
						</NavigationBack>
						<NotificationPopover
							setNotificationsList={setNotificationsList}
							onClose={onClose}
							isOpen={isOpen}
							onOpen={onOpen}
							notificationNumber={notificationsList.length}
							notificationsList={notificationsList}
						/>
					</Flex>
					<OrganizationsHeader />
				</Flex>
				<Flex p="6" direction="column" gap="4" maxW={layoutLimit} w="100%">
					<Flex flexDir="column" w="full">
						<Flex justify="space-between">
							<Text color={theme.text.primary} fontWeight="medium">
								Teams
							</Text>
							<Link
								href={navigationPaths.dashboard.organizations.teams}
								color="gray.500"
								fontWeight="medium"
								fontSize="xs"
								cursor="pointer"
							>
								See all
							</Link>
						</Flex>
						<Grid gap="4" w="full" templateColumns="repeat(3, 1fr)">
							{teams.map((team, index) => (
								<GridItem key={+index} w="max-content">
									<TeamsCard team={team} />
								</GridItem>
							))}
							{teams.slice(0, 3).map((team, index) => (
								<GridItem key={+index} w="max-content">
									<TeamsCard team={team} />
								</GridItem>
							))}
						</Grid>
					</Flex>
					<RecentActivities />
				</Flex>
			</AppLayout>
		</OrganizationsProvider>
	);
};
