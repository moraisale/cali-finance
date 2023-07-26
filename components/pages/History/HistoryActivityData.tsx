/* eslint-disable no-nested-ternary */
import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Box,
	Flex,
	Grid,
	GridItem,
	Icon,
	Img,
	Text,
} from '@chakra-ui/react';
import { useAuth, usePicasso, useProfile } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { IActivitiesData } from 'types';
import {
	truncateWallet,
	getLogo,
	handleLogoImage,
	dateHandler,
	notificationsData,
} from 'utils';
import { useAccount } from 'wagmi';

export const HistoryActivityData: React.FC<IActivitiesData> = ({
	activities,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('history-page');
	const { getProfileData } = useProfile();
	const { isConnected } = useAccount();
	const { locale } = useRouter();
	const { session } = useAuth();

	const { data: profileData } = useQuery(
		'profile-data',
		() => getProfileData(activities.wallet as `0x${string}`),
		{
			enabled: !!isConnected && !!session,
		}
	);

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			<Grid
				display={activities.event.name === 'user_withdraw' ? 'flex' : 'none'}
				templateColumns="repeat(2, 1fr)"
				w="full"
				justifyContent="space-between"
				alignItems="center"
				bg="gray.50"
				px="3"
			>
				<GridItem
					display="flex"
					flexDirection="row"
					alignItems="center"
					gap="2"
				>
					<Img
						src={notificationsData[activities.event.name].icon}
						boxSize="4"
					/>
					<Flex direction="column">
						<Text fontSize="sm" color={theme.text.black}>
							{activities.event.description}
						</Text>
						<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
							{locale && dateHandler(activities.created_at, locale)}
						</Text>
					</Flex>
				</GridItem>
				<GridItem
					display="flex"
					flexDirection="column"
					alignItems="center"
					gap="2"
				>
					<Flex direction="column" align="end">
						<Text fontSize="xs" color={theme.text.black}>
							{Number(activities.meta.data.amount).toFixed(2)} USDT
						</Text>
						<Text color="green.400 " fontSize="xs" whiteSpace="nowrap">
							Completed
						</Text>
					</Flex>
				</GridItem>
			</Grid>
			{activities.event.name !== 'team_member_added' &&
				activities.event.name !== 'user_added_to_company' &&
				activities.event.name !== 'user_added_to_team' && (
					<Flex
						bg="white"
						px="3"
						py="2"
						minH="3.25rem"
						borderRadius="base"
						align="center"
						gap={{ md: '0', lg: '7' }}
						display={
							activities.event.name === 'user_withdraw' ? 'none' : 'flex'
						}
					>
						<Grid
							templateColumns="repeat(4, 1fr)"
							gap={6}
							display="flex"
							w="full"
							justifyContent="space-between"
							alignItems="center"
						>
							<GridItem display="flex" alignItems="center" gap="2" flex="2.5">
								{activities.event.name !== 'user_updated' &&
								activities.event.name !== 'user_settings_updated' &&
								activities.meta.data.companyLogo ? (
									<Img
										src={getLogo(activities.meta.data.companyLogo)}
										boxSize="6"
										borderRadius="base"
									/>
								) : activities.event.name === 'user_updated' ||
								  activities.event.name === 'team_member_updated' ? (
									<Flex
										boxSize="6"
										borderRadius="full"
										align="center"
										justify="center"
										fontSize="xs"
										fontWeight="bold"
										bg={theme.bg.white2}
										color={theme.text.primary}
									>
										<Img
											src={
												profileData?.picture === null
													? '/images/avatar.png'
													: getLogo(profileData?.picture)
											}
											borderRadius="full"
											boxSize="6"
											objectFit="cover"
										/>
									</Flex>
								) : (
									<Flex
										boxSize="6"
										borderRadius="full"
										align="center"
										justify="center"
										fontSize="xs"
										fontWeight="bold"
										bg={theme.bg.white2}
										color={theme.text.primary}
									>
										{handleLogoImage(activities.meta.data.companyName)}
									</Flex>
								)}
								{activities.event.name === 'user_updated' ||
								activities.event.name === 'team_member_updated' ||
								activities.event.name === 'user_settings_updated' ? (
									<Accordion allowToggle w="full">
										<AccordionItem w="full">
											{({ isExpanded }) => (
												<>
													<AccordionButton
														p="0"
														w="full"
														justifyContent="space-between"
													>
														<Box
															as="span"
															fontSize="sm"
															textAlign="left"
															color={theme.text.primary}
															fontWeight="bold"
														>
															{truncateWallet(activities.wallet)}
														</Box>
														{isExpanded ? (
															<Icon
																as={AiOutlineArrowUp}
																color="black"
																boxSize="4"
															/>
														) : (
															<Icon
																as={AiOutlineArrowDown}
																color="black"
																boxSize="4"
															/>
														)}
													</AccordionButton>
													<AccordionPanel
														p="0"
														color={theme.text.primary}
														fontSize="sm"
													>
														{activities.meta.description[locale!]}
													</AccordionPanel>
												</>
											)}
										</AccordionItem>
									</Accordion>
								) : (
									<Text
										fontSize="sm"
										color={theme.text.primary}
										fontWeight="bold"
									>
										{activities.meta.data.companyName}
									</Text>
								)}
							</GridItem>
							<GridItem display="flex" flex="2.5" gap="2">
								<Img
									src={getLogo(profileData?.picture)}
									borderRadius="full"
									boxSize="6"
									objectFit="cover"
								/>

								{activities.event.name === 'user_updated' ||
								activities.event.name === 'company_updated' ||
								activities.event.name === 'team_member_updated' ||
								activities.event.name === 'company_created' ||
								activities.event.name === 'user_settings_updated' ? (
									<Text
										h="max-content"
										fontSize="sm"
										fontWeight="normal"
										whiteSpace="nowrap"
										color={theme.text.primary}
									>
										{truncateWallet(activities.wallet)}
									</Text>
								) : (
									<Text
										h="max-content"
										fontSize="sm"
										fontWeight="normal"
										whiteSpace="nowrap"
										color={theme.text.primary}
									>
										{activities.event.name !== 'company_created' &&
											truncateWallet(activities.meta.data?.userAddedWallet)}
									</Text>
								)}
							</GridItem>
							<GridItem flex="2.5">
								<Flex align="center" gap="2">
									<Img
										src={notificationsData[activities.event.name].icon}
										boxSize="4"
									/>
									<Flex direction="column">
										<Text
											fontSize="sm"
											fontWeight="normal"
											color={theme.text.primary}
										>
											{activities &&
												translate(
													notificationsData[activities.event.name]?.text
												)}
										</Text>
										<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
											{locale && dateHandler(activities.created_at, locale)}
										</Text>
									</Flex>
								</Flex>
							</GridItem>
						</Grid>
					</Flex>
				)}
		</>
	);
};

export default HistoryActivityData;
