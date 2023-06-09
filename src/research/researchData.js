import {
  IncreaseBrandMultiplier,
  AllowMesh,
  AllowAutoSilicon,
  AllowMakeSmartWigs,
  IncreaseFabricatorMultiplier,
  AllowCampaignManager,
  DroneInitiatedDemand,
  AllowAutoInstall,
  UpgradeMachineryWigLevel
} from './researchOutcomes'
import { AllowMakeAlgaeWigs } from '../make/algaeMechanic'
import { allowed, costString } from '../utils/cost'
import { notion, research, milestone, opportunity, campaign } from '../shared/milestones'
import { initMessage, initNews } from '../shared/logData'
import { PowerEfficiencyUpgrade, VoidPower } from '../make/powerMechanic'
import {
  eightMillion, fiftyMillion, fiveBillion, fiveHundredMillion, fiveHundredThousand, fiveMillion, fortyBillion, fortyMillion, fourHundredMillion,
  fourHundredThousand, oneHundredBillion, oneMillion, sevenBillion, sixBillion, tenMillion, thirtyMillion, twentyMillion, twoBillion,
  twoHundredBillion, twoHundredMillion, twoMillion
} from '../shared/bigNumbers'

export default [{
  id: research.wigMakerSwitcher,
  title: 'Wig demand handler',
  description: 'Purchase factory module for automatically switching wig type based on demand',
  duration: 100,
  trigger: ({ wigsMade }) => wigsMade >= 40000,
  allowCost: { cash: 270000 },
  log: initMessage('8d', 'Auto wig switch module now installed')
}, {
  id: research.autoSilicon,
  title: 'Auto-buy silicon',
  description: 'Just in time silicon',
  duration: 120,
  milestones: [research.wigMakerSwitcher],
  trigger: ({ wigsMade }) => wigsMade >= 50000,
  allowCost: { cash: 230000 },
  action: AllowAutoSilicon,
  log: initMessage('8f', 'Silicon auto buy available')
}, {
  id: research.newMarkets,
  title: 'Open up new markets',
  description: 'Drive wig sales into new markets',
  duration: 285,
  allowCost: { cash: 450000, brand: 560000 },
  action: [IncreaseBrandMultiplier, 2],
  log: initMessage('8a', 'New markets open for business')
}, {
  id: research.international,
  title: 'Global expansion',
  description: 'Prestigious offices in key geographic regions around the globe',
  duration: 240,
  milestones: [research.newMarkets, campaign.coiffeur],
  trigger: ({ wigsMade }) => wigsMade >= 110000,
  allowCost: { cash: twoMillion, brand: oneMillion + fiveHundredThousand },
  action: [IncreaseBrandMultiplier, 4],
  log: initMessage('8b', 'Globally influencing wig wearing interests')
}, {
  id: research.distributionNetwork,
  title: 'Wig distribution network',
  description: 'Get wigs to those who need them the most',
  duration: 200,
  milestones: [research.international, research.autoSilicon],
  trigger: ({ wigsMade }) => wigsMade >= 160000,
  allowCost: { cash: 1300000 },
  action: [IncreaseBrandMultiplier, 1],
  log: initNews('8k', 'Same day wig delivery now a reality')
}, {
  id: research.franchise,
  title: 'Franchise outlets',
  description: 'Setup shop throughout the world',
  duration: 300,
  milestones: [research.distributionNetwork, campaign.game],
  trigger: ({ wigsMade }) => wigsMade >= 600000,
  allowCost: { cash: 7000000, brand: 5000000 },
  action: [IncreaseBrandMultiplier, 3],
  log: initMessage('8c', 'Selling wigs has never been easier')
}, {
  id: research.microCompute,
  title: 'Micro Compute pattern',
  description: 'Single use hardware/software units',
  duration: 150,
  milestones: [research.autoSilicon, research.newMarkets, campaign.dogs],
  trigger: ({ wigsMade, brand }) => wigsMade >= 160000 && brand >= 140000,
  allowCost: { cash: 1900000 },
  log: initMessage('8e', 'Micro compute units now available for manufacture')
}, {
  id: research.mesh,
  title: 'The Mesh',
  description: 'Dedicated private network infrastructure',
  duration: 300,
  milestones: [research.microCompute, milestone.warStarted],
  allowCost: { cash: fiftyMillion, micro: 15000 },
  action: AllowMesh,
  log: initMessage('8g', 'Mesh online')
}, {
  id: research.storage,
  title: 'Storage optimization',
  description: 'Accelerated fabricators through Just in Time supply management',
  duration: 130,
  milestones: [research.microCompute],
  trigger: ({ wigsMade }) => wigsMade >= 150000,
  allowCost: { micro: 25 },
  action: [IncreaseFabricatorMultiplier, 3],
  log: initMessage('8m', 'Fabricator performance improved')
}, {
  id: research.powerChaining,
  title: 'Power chaining',
  description: 'Increase power output through collector stepping',
  duration: 80,
  milestones: [research.storage],
  trigger: ({ wigsMade }) => wigsMade >= 300000,
  allowCost: { micro: 250 },
  action: PowerEfficiencyUpgrade,
  log: initMessage('8q', 'Solar and wind collection upgraded')
}, {
  id: research.multiLayered,
  title: 'Multi-layered fabrication',
  description: 'Parallelize the fabrication process',
  duration: 260,
  milestones: [research.powerChaining, research.storage],
  trigger: ({ wigsMade }) => wigsMade >= 200000,
  allowCost: { micro: 500 },
  action: [IncreaseFabricatorMultiplier, 6],
  log: initMessage('8t', 'Fabricator performance improved')
}, {
  id: research.algaeIncubator,
  title: 'Vegan-friendly wigs',
  description: 'Wigs made from all natural algae fibres',
  duration: 160,
  milestones: [research.storage, research.distributionNetwork, campaign.game],
  trigger: ({ wigsMade, brand }) => wigsMade >= 900000 && brand >= 9500000,
  allowCost: { cash: twoMillion, micro: 3500 },
  action: AllowMakeAlgaeWigs,
  log: initMessage('8i', 'Algae wigs are an innovation to behold')
}, {
  id: research.campaignManager,
  title: 'Campaign Manager',
  description: 'Automate campaign implementations',
  duration: 90,
  milestones: [research.powerChaining, campaign.moustacheShaming],
  trigger: ({ brand }) => brand >= eightMillion,
  allowCost: { cash: 1200000, micro: 2000 },
  action: AllowCampaignManager,
  log: initMessage('8s', 'Campaign manager ready to roll')
}, {
  id: research.voidPower,
  title: 'Void',
  description: 'Harness the power of the Void',
  duration: 55,
  milestones: [research.algaeIncubator, research.microCompute],
  trigger: ({ powerDemand }) => powerDemand >= 450000,
  allowCost: { cash: twentyMillion, micro: 10000 },
  action: VoidPower,
  log: initMessage('8r', 'Void power online')
}, {
  id: research.hyperFab,
  title: 'hyperFab',
  description: 'Fabricator performance enhancers',
  duration: 45,
  milestones: [research.mesh, research.voidPower, research.multiLayered, research.campaignManager],
  trigger: ({ dataCenters }) => dataCenters >= 1,
  allowCost: { cash: 38000000, micro: 1000, brand: fiftyMillion },
  log: initMessage('8p', 'hyperFab ready')
}, {
  id: research.smartWigs,
  title: 'Smart wig pattern',
  description: 'Internet connected wigs with voice control',
  duration: 90,
  milestones: [research.hyperFab, campaign.noHairToHide],
  allowCost: { cash: 182000000, micro: 45000 },
  action: AllowMakeSmartWigs,
  log: [
    initNews('8j', 'New smart wigs wipe the floor with “outdated” models'),
    initMessage('8B', 'Algae synaptic putty enhancer idle')
  ]
}, {
  id: research.drone,
  title: 'Drone-based delivery',
  description: 'Auto landing capability for immediate wig placement',
  duration: 70,
  milestones: [research.smartWigs],
  allowCost: { cash: fiveBillion, micro: fiveHundredThousand },
  action: DroneInitiatedDemand,
  log: initMessage('8l', 'Customers go crazy for precision wig drops')
}, {
  id: research.capitalize,
  title: 'Capitalize on investment',
  description: 'Use newfound connectivity to further interests',
  duration: 90,
  milestones: [research.smartWigs, campaign.brandLoyalty],
  trigger: ({ meshNodes, brand }) => meshNodes >= thirtyMillion && brand >= 150000000,
  allowCost: { cash: sixBillion },
  log: initMessage('8u', 'More opportunities forthcoming')
}, {
  id: research.thinair,
  title: 'Efficiency out of thin air',
  description: 'Reduced oxygen levels around fabricators to improve operational efficiency',
  duration: 80,
  milestones: [research.voidPower, research.capitalize],
  trigger: ({ meshNodes, fabricators }) => meshNodes >= fortyMillion && fabricators >= 1000,
  allowCost: { cash: 25000000000, micro: fourHundredThousand },
  action: [IncreaseFabricatorMultiplier, 5000],
  log: initMessage('8y', 'Fabricator oxygen level reduced')
}, {
  id: research.loyaltyByDesign,
  title: 'Brand loyalty by design',
  description: 'Overhaul product design to encourage brand retention',
  duration: 120,
  milestones: [research.thinair],
  trigger: ({ meshNodes }) => meshNodes >= fourHundredMillion,
  allowCost: { cash: 18000000000, micro: eightMillion },
  log: initNews('8w', 'Social media explodes on overhauled designs')
}, {
  id: research.microBio,
  title: 'Micro+Bio compute pattern',
  description: 'Faster and more powerful compute units through organic integration',
  duration: 60,
  milestones: [research.thinair, opportunity.bioResearch],
  allowCost: { cash: twoHundredBillion, micro: fiftyMillion },
  log: initMessage('8n', 'The ultimate blend of organic and inorganic')
}, {
  id: research.subzero,
  title: 'Subzero manufacturing',
  description: 'Fabrication at absolute zero temperatures',
  duration: 60,
  milestones: [opportunity.bioResearch, research.hyperFab, campaign.goldenWig],
  trigger: ({ meshNodes }) => meshNodes >= fiveHundredMillion,
  allowCost: { cash: oneHundredBillion + fortyBillion, micro: twentyMillion },
  action: [IncreaseFabricatorMultiplier, 30000],
  log: initMessage('8v', 'Fabricator performance improved')
}, {
  id: research.autoInstall,
  title: 'Auto install',
  description: 'Install micro compute into data centers automatically',
  duration: 45,
  trigger: ({ meshNodes }) => meshNodes >= twoBillion + twoHundredMillion,
  allowCost: { cash: twoHundredBillion, micro: tenMillion },
  action: AllowAutoInstall,
  log: initMessage('8z', 'Auto compute install available')
}, {
  id: research.demandLinking,
  title: 'Demand-fabrication linking',
  description: 'Order fulfilment streamlining',
  duration: 70,
  milestones: [research.subzero, research.microBio],
  trigger: ({ brand }) => brand >= oneHundredBillion,
  allowCost: { cash: oneHundredBillion, micro: fiveMillion },
  action: [UpgradeMachineryWigLevel, 4],
  log: initMessage('8A', 'Order backlog redundant due to streamlining')
}, {
  id: research.droneSquadrons,
  title: 'Unleash drone squadrons',
  description: 'Harass persistent hat wearers',
  duration: 80,
  milestones: [research.loyaltyByDesign, research.demandLinking, opportunity.wipeAwayCompetitors],
  trigger: ({ meshNodes }) => meshNodes >= sevenBillion,
  allowCost: { free: true },
  log: initMessage('8x', 'Drone squadrons unleashed')
}
].map((r) => ({
  ...r,
  duration: r.duration * 1000,
  milestones: (r.milestones ?? []).concat(notion.research),
  description: `${r.description}.`,
  cost: costString(r.allowCost),
  allowed: (state) => allowed(state, r.allowCost)
}))
