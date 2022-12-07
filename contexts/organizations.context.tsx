import {
	createContext,
	Dispatch,
	SetStateAction,
	useMemo,
	useState,
} from 'react';
import { IOrganization, IActivities, INotificationList } from 'types';

interface IOrganizationsContext {
	organizations: IOrganization[];
	activities: IActivities[];
	totalFunds: string;
	totalTeams: string;
	totalMembers: string;
	notificationsList: INotificationList[];
	setNotificationsList: Dispatch<SetStateAction<INotificationList[]>>;
}

export const OrganizationsContext = createContext({} as IOrganizationsContext);

export const OrganizationsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [organizations, setOrganizations] = useState<IOrganization[]>([
		{
			name: 'Kylie Cosmetics',
			type: 'DAO',
			email: 'kyliecosmetics@gmail.com',
			members: 2,
			teams: ['marketing'],
			description: 'sahudahsadsa',
			logo: '',
			socialMedia: [
				{
					instagram: '@kyliecosmetics',
					telegram: 't/kyliecosmetics',
					twitter: 'twitter.com/kyliecosmetics',
					website: 'kyliecosmetics.net',
				},
			],
			funds: 2234.05,
		},
		{
			name: 'Kylie Skin',
			type: 'DAO',
			email: 'kylieskin@gmail.com',
			funds: 92234.11,
			members: 170,
			teams: ['marketing'],
			description: 'sahudahsadsa',
			logo: '',
			socialMedia: [
				{
					instagram: '@kylieskin',
					telegram: 't/kylieskin',
					twitter: 'twitter.com/kylieskin',
					website: 'kylieskin.net',
				},
			],
		},
		{
			name: 'Kylie Baby',
			type: 'DAO',
			email: 'kyliebaby@gmail.com',
			funds: 5234.11,
			members: 13,
			teams: ['marketing'],
			description: 'sahudahsadsa',
			logo: '',
			socialMedia: [
				{
					instagram: '@kyliebaby',
					telegram: 't/kyliebaby',
					twitter: 'twitter.com/kyliebaby',
					website: 'kyliebaby.net',
				},
			],
		},
	]);
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
	const [activities, setActivities] = useState<IActivities[]>([
		{
			name: 'Kylie Cosmetics',
			type: 'Deposit',
			coin: 'USDT',
			date: '08 Aug 22, 20:57',
			status: 'Completed',
			value: 100063.0,
		},
		{
			name: 'Kylie Skin',
			type: 'Withdrawal',
			coin: 'USDT',
			date: '08 Aug 22, 20:57',
			status: 'Completed',
			value: 19.636,
		},
		{
			name: 'Kylie Baby',
			type: 'Team Created',
			coin: 'USDT',
			date: '08 Aug 22, 20:57',
			status: 'Completed',
			value: 10.0,
		},
	]);
	const totalFunds = organizations
		.reduce((total: number, org: IOrganization) => total + org.funds, 0)
		.toLocaleString('en-US');

	const totalTeams = organizations
		.reduce(
			(total: number, org: IOrganization) => total + Number(org.members),
			0
		)
		.toString();
	const totalMembers = organizations
		.reduce((total: number, org: IOrganization) => total + org.teams.length, 0)
		.toString();

	const contextStates = useMemo(
		() => ({
			organizations,
			activities,
			totalFunds,
			totalTeams,
			totalMembers,
			notificationsList,
			setNotificationsList,
		}),
		[
			organizations,
			activities,
			totalFunds,
			totalTeams,
			totalMembers,
			notificationsList,
			setNotificationsList,
		]
	);
	return (
		<OrganizationsContext.Provider value={contextStates}>
			{children}
		</OrganizationsContext.Provider>
	);
};
