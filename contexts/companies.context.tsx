/* eslint-disable react-hooks/exhaustive-deps */
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
	ICompanyTest,
	IActivities,
	INotificationList,
	IEditedCompany,
	IEmployee,
	IHistoryNotification,
	ISocialMedia,
} from 'types';
import { historyNotifications } from 'components';
import { mainClient } from 'utils';
import { ICompany } from 'types/interfaces/main-server/ICompany';

interface ICompanysContext {
	companies: ICompanyTest[];
	activities: IActivities[];
	totalFunds: string;
	totalTeams: string;
	totalMembers: string;
	notificationsList: INotificationList[];
	setNotificationsList: Dispatch<SetStateAction<INotificationList[]>>;
	setSelectedCompany: Dispatch<SetStateAction<ICompanyTest>>;
	setSelectedCompanyEmployees: Dispatch<SetStateAction<IEmployee[]>>;
	selectedCompanyEmployees: IEmployee[];
	selectedCompany: ICompanyTest;
	setEditedInfo: Dispatch<SetStateAction<IEditedCompany>>;
	editedInfo: IEditedCompany;
	displayMissingFundsWarning: string;
	setDisplayMissingFundsWarning: Dispatch<SetStateAction<string>>;
	displayNeedFundsCard: string;
	setDisplayNeedFundsCard: Dispatch<SetStateAction<string>>;
	companiesWithMissingFunds: ICompanyTest[];
	filteredNotifications: IHistoryNotification[];
	setFilteredNotifications: Dispatch<SetStateAction<IHistoryNotification[]>>;
	createCompany: (company: ICompany) => Promise<void>;
	socialMediasData: ISocialMedia[];
	setSocialMediasData: Dispatch<SetStateAction<ISocialMedia[]>>;
	createdCompanyPicture: string;
	setCreatedCompanyPicture: Dispatch<SetStateAction<string>>;
	newCreatedCompanyId: number;
}

export const CompaniesContext = createContext({} as ICompanysContext);

export const CompaniesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { t: translate } = useTranslation('companies');
	const [displayMissingFundsWarning, setDisplayMissingFundsWarning] =
		useState('none');
	const [displayNeedFundsCard, setDisplayNeedFundsCard] = useState('none');
	const [socialMediasData, setSocialMediasData] = useState<ISocialMedia[]>([]);

	const companiesWithMissingFunds: ICompanyTest[] = [];

	const [filteredNotifications, setFilteredNotifications] =
		useState<IHistoryNotification[]>(historyNotifications);

	const [companies, setCompanies] = useState<ICompanyTest[]>([
		{
			name: 'Kylie Cosmetics',
			type: 'DAO',
			email: 'kyliecosmetics@gmail.com',
			members: 2,
			teams: ['marketing'],
			description: 'Hello',
			selectedNetwork: 'Ethereum',
			picture: '',
			socialMedias: {
				instagram: '@kyliecosmetics',
				telegram: 't/kyliecosmetics',
				twitter: 'twitter.com/kyliecosmetics',
				website: 'kyliecosmetics.net',
			},
			funds: 999,
			neededFunds: 2,
		},
		{
			name: 'Kylie Skin',
			type: 'DAO',
			email: 'kylieskin@gmail.com',
			members: 170,
			teams: ['marketing'],
			description: 'Hello',
			selectedNetwork: 'Ethereum',
			picture: '',
			socialMedias: {
				instagram: '@kylieskin',
				telegram: 't/kylieskin',
				twitter: 'twitter.com/kylieskin',
				website: 'kylieskin.net',
			},
			funds: 999,
			neededFunds: 2,
		},
		{
			name: 'Kylie Baby',
			type: 'DAO',
			email: 'kyliebaby@gmail.com',
			members: 13,
			teams: ['marketing'],
			description: 'Hello',
			selectedNetwork: 'Ethereum',
			picture: '',
			socialMedias: {
				instagram: '@kyliebaby',
				telegram: 't/kyliebaby',
				twitter: 'twitter.com/kyliebaby',
				website: 'kyliebaby.net',
			},
			funds: 5234.11,
			neededFunds: 1,
		},
	]);

	const [selectedCompanyEmployees, setSelectedCompanyEmployees] = useState<
		IEmployee[]
	>([
		{
			name: 'Kim Kardashian',
			wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36B4CFE',
			photo: '/images/avatar.png',
			amount: 10000,
			coin: 'USDT',
			team: 'General',
		},
		{
			name: 'Kylie Jenner',
			wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36Z9EXD',
			photo: '/images/avatar.png',
			amount: 1000,
			coin: 'USDT',
			team: 'Marketing',
		},
		{
			name: 'Kloe Kardashian',
			wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
			photo: '/images/avatar.png',
			amount: 800,
			coin: 'USDT',
			team: 'Finance',
		},
		{
			name: 'Kloe Kardashian',
			wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
			photo: '/images/avatar.png',
			amount: 800,
			coin: 'USDT',
			team: 'Finance',
		},
		{
			name: 'Kloe Kardashian',
			wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
			photo: '/images/avatar.png',
			amount: 8030,
			coin: 'USDT',
			team: 'Finance',
		},
	]);

	const [selectedCompany, setSelectedCompany] = useState<ICompanyTest>({
		name: 'kylie skin',
		type: 'DAO',
		email: 'kylieskin@gmail.com',
		funds: 67986.09,
		members: 170,
		teams: ['marketing'],
		description: 'Hello',
		selectedNetwork: 'Ethereum',
		picture: '/images/kylie-cosmetics-logo.png',
		socialMedias: {
			instagram: '@kylieskin',
			telegram: 't/kylieskin',
			twitter: 'twitter.com/kylieskin',
			website: 'kylieskin.net',
		},
		neededFunds: 2235,
		employees: selectedCompanyEmployees,
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
			employees: selectedCompanyEmployees,
		}));
	}, [selectedCompanyEmployees]);

	const totalFunds = companies
		.reduce((total: number, org: ICompanyTest) => total + org.funds, 0)
		.toLocaleString('en-US');

	const totalTeams = companies
		.reduce(
			(total: number, org: ICompanyTest) => total + Number(org.members),
			0
		)
		.toString();
	const totalMembers = companies
		.reduce((total: number, org: ICompanyTest) => total + org.teams.length, 0)
		.toString();

	// eslint-disable-next-line array-callback-return
	companies.map(companie => {
		if (companie.funds < companie.neededFunds) {
			companiesWithMissingFunds.push(companie);
		}
	});

	const showMissingFundsWarning = () => {
		if (companiesWithMissingFunds.length) {
			setDisplayMissingFundsWarning('flex');
			setDisplayNeedFundsCard('flex');
		} else {
			setDisplayMissingFundsWarning('none');
			setDisplayNeedFundsCard('none');
		}
	};
	useEffect(() => {
		showMissingFundsWarning();
	}, []);

	const [createdCompanyPicture, setCreatedCompanyPicture] = useState('');
	const [newCreatedCompanyId, setNewCreatedCompanyId] = useState(0);

	const createCompany = async (company: ICompany) => {
		await mainClient
			.post('/company/', {
				company,
			})
			.then(id => setNewCreatedCompanyId(id.data));
	};

	const contextStates = useMemo(
		() => ({
			companies,
			activities,
			totalFunds,
			totalTeams,
			totalMembers,
			notificationsList,
			setNotificationsList,
			setSelectedCompany,
			selectedCompany,
			setEditedInfo,
			editedInfo,
			displayMissingFundsWarning,
			setDisplayMissingFundsWarning,
			displayNeedFundsCard,
			setDisplayNeedFundsCard,
			companiesWithMissingFunds,
			setSelectedCompanyEmployees,
			selectedCompanyEmployees,
			filteredNotifications,
			setFilteredNotifications,
			createCompany,
			socialMediasData,
			setSocialMediasData,
			createdCompanyPicture,
			setCreatedCompanyPicture,
			newCreatedCompanyId,
		}),
		[
			selectedCompany,
			companies,
			activities,
			totalFunds,
			totalTeams,
			totalMembers,
			notificationsList,
			setSelectedCompany,
			setNotificationsList,
			setEditedInfo,
			editedInfo,
			displayMissingFundsWarning,
			setDisplayMissingFundsWarning,
			displayNeedFundsCard,
			setDisplayNeedFundsCard,
			companiesWithMissingFunds,
			setSelectedCompanyEmployees,
			selectedCompanyEmployees,
			filteredNotifications,
			setFilteredNotifications,
			createCompany,
			socialMediasData,
			setSocialMediasData,
			createdCompanyPicture,
			setCreatedCompanyPicture,
			newCreatedCompanyId,
		]
	);
	return (
		<CompaniesContext.Provider value={contextStates}>
			{children}
		</CompaniesContext.Provider>
	);
};
