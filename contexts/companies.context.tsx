import useTranslation from 'next-translate/useTranslation';
import {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	ICompany,
	IActivities,
	INotificationList,
	IEditedCompany,
} from 'types';

interface ICompanysContext {
	companies: ICompany[];
	activities: IActivities[];
	totalFunds: string;
	totalTeams: string;
	totalMembers: string;
	notificationsList: INotificationList[];
	setNotificationsList: Dispatch<SetStateAction<INotificationList[]>>;
	selectedCompany: ICompany;
	setSelectedCompanyLogo: Dispatch<SetStateAction<string>>;
	selectedCompanyLogo: string;
	setEditedInfo: Dispatch<SetStateAction<IEditedCompany>>;
	editedInfo: IEditedCompany;
	displayMissingFundsWarning: string;
	setDisplayMissingFundsWarning: Dispatch<SetStateAction<string>>;
}

export const CompaniesContext = createContext({} as ICompanysContext);

export const CompaniesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { t: translate } = useTranslation('companies');
	const [displayMissingFundsWarning, setDisplayMissingFundsWarning] =
		useState('none');

	const [companies, setCompanies] = useState<ICompany[]>([
		{
			name: 'Kylie Cosmetics',
			type: 'DAO',
			email: 'kyliecosmetics@gmail.com',
			members: 2,
			teams: ['marketing'],
			description: 'Hello',
			selectedNetwork: 'Ethereum',
			logo: '',
			socialMedias: {
				instagram: '@kyliecosmetics',
				telegram: 't/kyliecosmetics',
				twitter: 'twitter.com/kyliecosmetics',
				website: 'kyliecosmetics.net',
			},

			funds: 2234.05,
		},
		{
			name: 'Kylie Skin',
			type: 'DAO',
			email: 'kylieskin@gmail.com',
			funds: 92234.11,
			members: 170,
			teams: ['marketing'],
			description: 'Hello',
			selectedNetwork: 'Ethereum',
			logo: '',
			socialMedias: {
				instagram: '@kylieskin',
				telegram: 't/kylieskin',
				twitter: 'twitter.com/kylieskin',
				website: 'kylieskin.net',
			},
		},
		{
			name: 'Kylie Baby',
			type: 'DAO',
			email: 'kyliebaby@gmail.com',
			funds: 5234.11,
			members: 13,
			teams: ['marketing'],
			description: 'Hello',
			selectedNetwork: 'Ethereum',
			logo: '',
			socialMedias: {
				instagram: '@kyliebaby',
				telegram: 't/kyliebaby',
				twitter: 'twitter.com/kyliebaby',
				website: 'kyliebaby.net',
			},
		},
	]);

	const showMissingFundsWarning = () => {
		// eslint-disable-next-line no-unused-expressions
		companies[0].funds < 10000
			? setDisplayMissingFundsWarning('flex')
			: setDisplayMissingFundsWarning('none');
	};
	useEffect(() => {
		showMissingFundsWarning();
	});
	console.log(displayMissingFundsWarning);

	const [selectedCompanyLogo, setSelectedCompanyLogo] = useState(
		'/images/kylie-cosmetics-logo.png'
	);

	const [selectedCompany, setSelectedCompany] = useState<ICompany>({
		name: 'kylie skin',
		type: 'DAO',
		email: 'kylieskin@gmail.com',
		funds: 67986.09,
		members: 170,
		teams: ['marketing'],
		description: 'Hello',
		selectedNetwork: 'Ethereum',
		logo: selectedCompanyLogo,
		socialMedias: {
			instagram: '@kylieskin',
			telegram: 't/kylieskin',
			twitter: 'twitter.com/kylieskin',
			website: 'kylieskin.net',
		},

		employees: [
			{
				name: 'Kim Kardashian',
				wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36B4CFE',
				photo: '/images/avatar.png',
				amount: 10.0,
				coin: 'USDT',
				team: 'General',
			},
			{
				name: 'Kylie Jenner',
				wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36Z9EXD',
				photo: '/images/avatar.png',
				amount: 100.0,
				coin: 'USDT',
				team: 'Marketing',
			},
			{
				name: 'Kloe Kardashian',
				wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
				photo: '/images/avatar.png',
				amount: 80.0,
				coin: 'USDT',
				team: 'Finance',
			},
			{
				name: 'Kloe Kardashian',
				wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
				photo: '/images/avatar.png',
				amount: 80.0,
				coin: 'USDT',
				team: 'Finance',
			},
			{
				name: 'Kloe Kardashian',
				wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
				photo: '/images/avatar.png',
				amount: 80.0,
				coin: 'USDT',
				team: 'Finance',
			},
		],
	});

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
			status: translate('completed'),
			value: 100063,
		},
		{
			name: 'Kylie Skin',
			type: 'Withdrawal',
			coin: 'USDT',
			date: '08 Aug 22, 20:57',
			status: translate('completed'),
			value: 19636,
		},
		{
			name: 'Kylie Baby',
			type: 'Team Created',
			coin: 'USDT',
			date: '08 Aug 22, 20:57',
			status: translate('completed'),
			value: 10,
		},
	]);

	const [editedInfo, setEditedInfo] = useState<IEditedCompany>(
		{} as IEditedCompany
	);

	useEffect(() => {
		setSelectedCompany(prevState => ({
			...prevState,
			logo: selectedCompanyLogo,
		}));
	}, [selectedCompanyLogo]);

	const totalFunds = companies
		.reduce((total: number, org: ICompany) => total + org.funds, 0)
		.toLocaleString('en-US');

	const totalTeams = companies
		.reduce((total: number, org: ICompany) => total + Number(org.members), 0)
		.toString();
	const totalMembers = companies
		.reduce((total: number, org: ICompany) => total + org.teams.length, 0)
		.toString();

	const contextStates = useMemo(
		() => ({
			companies,
			activities,
			totalFunds,
			totalTeams,
			totalMembers,
			notificationsList,
			setNotificationsList,
			selectedCompany,
			setSelectedCompanyLogo,
			selectedCompanyLogo,
			setEditedInfo,
			editedInfo,
			displayMissingFundsWarning,
			setDisplayMissingFundsWarning,
		}),
		[
			selectedCompany,
			companies,
			activities,
			totalFunds,
			totalTeams,
			totalMembers,
			notificationsList,
			setNotificationsList,
			setSelectedCompanyLogo,
			selectedCompanyLogo,
			setEditedInfo,
			editedInfo,
			displayMissingFundsWarning,
			setDisplayMissingFundsWarning,
		]
	);
	return (
		<CompaniesContext.Provider value={contextStates}>
			{children}
		</CompaniesContext.Provider>
	);
};
