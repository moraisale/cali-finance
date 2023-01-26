import {
	Box,
	Button,
	Flex,
	Icon,
	Img,
	Link,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { usePath, usePicasso, useProfile } from 'hooks';
import Router, { useRouter } from 'next/router';
import {
	DashboardIcon,
	OrganizationIcon,
	EditProfileIcon,
	HistoryIcon,
	ConnectWalletButton,
	ChangeNetworkButton,
	NetworkModal,
} from 'components';
import { navigationPaths, socialMediaLinks } from 'utils';
import { INetwork } from 'types';
import useTranslation from 'next-translate/useTranslation';

interface IMenuItem {
	icon: typeof Icon;
	route: string;
	option: () => void;
}

const networks: INetwork[] = [
	{
		name: 'Ethereum',
		icon: '/images/eth.png',
	},
	{
		name: 'Polygon',
		icon: '/images/polygon.png',
	},
	{
		name: 'BNB Chain',
		icon: '/images/bnbchain.png',
	},
];
type ILanguage = 'pt-BR' | 'en-US';

export const Sidebar: React.FC = () => {
	const { t: translate } = useTranslation('sidebar');
	const menuOptions: IMenuItem[] = [
		{
			icon: DashboardIcon,
			route: navigationPaths.dashboard.home,
			option: translate('dashboard'),
		},
		{
			icon: OrganizationIcon,
			route: navigationPaths.dashboard.organizations.home,
			option: translate('companies'),
		},

		{
			icon: EditProfileIcon,
			route: navigationPaths.dashboard.editProfile,
			option: translate('editProfile'),
		},
		{
			icon: HistoryIcon,
			route: navigationPaths.dashboard.history,
			option: translate('history'),
		},
	];
	const theme = usePicasso();
	const { isSamePath } = usePath();
	const { userProfile, isConnected } = useProfile();
	const { locale, pathname } = useRouter();
	const languages: ILanguage[] = ['en-US', 'pt-BR'];
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [networkData, setNetworkData] = useState<INetwork>({
		name: 'Ethereum',
		icon: '/images/eth.png',
	} as INetwork);

	const changeLanguage = (lang: ILanguage) => {
		Router.push(`/${pathname}`, `/${pathname}`, { locale: lang });
	};

	return (
		<>
			<NetworkModal
				networks={networks}
				isOpen={isOpen}
				onClose={onClose}
				setNetworkData={setNetworkData}
			/>
			<Flex
				flexDirection="column"
				display={{ base: 'none', sm: 'flex' }}
				bg={theme.bg.primary}
				align="center"
				color="white"
				minW={{ md: '44', xl: '13.7rem', '2xl': '16.3rem' }}
				h="100%"
			>
				<Flex
					justify="center"
					pt="3"
					direction="column"
					align="center"
					gap="2"
					px="8"
				>
					<Link href={navigationPaths.dashboard.home} pb="6">
						<Img
							src="/images/cali-logo.svg"
							h={{ md: '8', '2xl': '10' }}
							w={{ md: '20', '2xl': '24' }}
							cursor="pointer"
						/>
					</Link>
					{isConnected === false && <ConnectWalletButton />}
					<Flex
						h="max-content"
						py="2"
						fontSize="sm"
						color="black"
						borderRadius="base"
						bg="white"
						_hover={{ background: 'white' }}
						_focus={{ background: 'white' }}
						display={isConnected === true ? 'flex' : 'none'}
					>
						<Flex align="center" gap="2" px="4" w={{ md: '8rem', xl: '9rem' }}>
							<Img
								src={userProfile?.picture}
								borderRadius="full"
								boxSize="6"
								objectFit="cover"
							/>
							<Text fontWeight="medium" fontSize={{ md: 'xs', lg: 'sm' }}>
								{userProfile?.wallet}
							</Text>
						</Flex>
					</Flex>

					{isConnected === true && (
						<ChangeNetworkButton
							onClick={onOpen}
							networkIcon={networkData.icon}
							networkName={networkData.name}
						/>
					)}
				</Flex>
				<Flex direction="column" gap="7" w="full" pb="36" pt="12">
					{menuOptions.map((item, index) => {
						const comparedPath = isSamePath(item.route);
						return (
							<Link
								href={item.route}
								key={+index}
								display="flex"
								_hover={{
									textDecoration: 'none',
								}}
							>
								<Button
									justifyContent="flex-start"
									alignItems="center"
									w="full"
									p="0"
									bgColor="transparent"
									fontSize="sm"
									borderRadius="none"
									boxShadow={comparedPath ? theme.branding.blue : 'none'}
									color={comparedPath ? theme.branding.blue : 'white'}
								>
									{comparedPath && (
										<Box
											bgColor={theme.branding.blue}
											h="full"
											w="2"
											borderLeftRadius="none"
											borderRightRadius="sm"
										/>
									)}
									<Flex
										align="center"
										justify="center"
										gap={{ md: '1', lg: '3' }}
										fontWeight="normal"
										fontSize={{ md: 'sm', xl: 'md', '2xl': 'xl' }}
									>
										<>
											<Icon
												as={item.icon}
												boxSize={{ md: '5', xl: '6' }}
												ml={{ md: '2', lg: '4', xl: '6' }}
											/>
											{item.option}
										</>
									</Flex>
									<Flex
										display={comparedPath ? 'flex' : 'none'}
										w="full"
										borderTop="1rem solid transparent"
										borderBottom="1rem solid transparent"
										borderRight="1.5rem solid"
									/>
								</Button>
							</Link>
						);
					})}
				</Flex>
				<Flex
					direction="column"
					align="flex-start"
					gap="3"
					px={{ md: '2', lg: '4', xl: '6' }}
					py="10"
					w="full"
				>
					<Flex gap="4">
						{languages.map((lang, index) => (
							<Text
								key={+index}
								cursor="pointer"
								boxSize="max-content"
								onClick={() => changeLanguage(lang)}
								fontSize={{ md: 'xs', lg: 'sm', '2xl': 'md' }}
								fontWeight="semibold"
								color={locale === lang ? theme.branding.blue : 'white'}
							>
								{locale === lang
									? `[${lang.toUpperCase()}]`
									: lang.toUpperCase()}
							</Text>
						))}
					</Flex>
					<Link
						fontSize={{ md: 'sm', lg: 'md', '2xl': 'xl' }}
						href={navigationPaths.help}
						_hover={{
							textDecoration: 'none',
							opacity: 0.8,
						}}
					>
						{translate('help')}
					</Link>
					<Link
						fontSize={{ md: 'sm', lg: 'md', '2xl': 'xl' }}
						href={navigationPaths.docs}
						_hover={{
							textDecoration: 'none',
							opacity: 0.8,
						}}
					>
						{translate('docs')}
					</Link>
				</Flex>

				<Flex flexDirection="row" px="2" w="full" alignItems="flex-start">
					<Link href={socialMediaLinks.discord} isExternal>
						<Button bg="transparent" borderRadius="full">
							<Icon
								as={FaDiscord}
								boxSize={{ md: '6', '2xl': '8' }}
								color={theme.branding.blue}
							/>
						</Button>
					</Link>
					<Link href={socialMediaLinks.twitter} isExternal>
						<Button bg="transparent" borderRadius="full">
							<Icon
								as={FaTwitter}
								boxSize={{ md: '6', '2xl': '8' }}
								color={theme.branding.blue}
							/>
						</Button>
					</Link>
				</Flex>
			</Flex>
		</>
	);
};
