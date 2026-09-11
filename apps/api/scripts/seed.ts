import { Db, MongoClient } from 'mongodb';

import Plant, { plantSchema } from '@/db/schemas/plant.schema';

const uri: string | undefined = process.env.MONGODB_URI;

if (!uri) throw new Error('ERR [mongo client]: MONGODB_URI is not set ');

const plants: Plant[] = [
  {
    slug: 'monstera-deliciosa',
    commonName: 'Monstera Deliciosa',
    latinName: 'Monstera deliciosa',
    type: 'Indoor plant',
    tags: ['decor'],
    care: {
      water: 70,
      sunlight: 'Bright indirect',
      temperature: 'Warm',
      humidity: 'High',
      soil: 'Well-draining',
    },
    careTips: [
      'Water when top soil is dry, roughly weekly',
      'Wipe leaves monthly to keep pores clear',
      'Rotate the pot occasionally for even growth',
    ],
    growthStages: [
      {
        name: 'Seedling',
        order: 0,
        durationDaysMin: 14,
        durationDaysMax: 21,
        requirements: { water: 'Keep soil evenly moist', sunlight: 'Bright indirect' },
        milestones: ['First split leaf appears'],
      },
      {
        name: 'Vegetative',
        order: 1,
        durationDaysMin: 30,
        durationDaysMax: 60,
        requirements: { water: 'Water when top soil dries', sunlight: 'Bright indirect' },
        milestones: ['Rapid leaf growth', 'May need a moss pole'],
      },
      {
        name: 'Mature',
        order: 2,
        durationDaysMin: 90,
        durationDaysMax: 180,
        requirements: { water: 'Water when top soil dries', sunlight: 'Bright indirect' },
        milestones: ['Growth slows', 'Ready for a larger pot if rootbound'],
      },
    ],
  },
  {
    slug: 'snake-plant',
    commonName: 'Snake Plant',
    latinName: 'Dracaena trifasciata',
    type: 'Indoor plant',
    tags: ['decor'],
    care: { water: 20, sunlight: 'Full sun', temperature: 'Dry', humidity: 'Dry', soil: 'Sandy' },
    careTips: [
      'Let soil dry out fully between waterings',
      'Tolerates low light but prefers bright spots',
      'Repot only every 2-3 years',
    ],
    growthStages: [
      {
        name: 'Seedling',
        order: 0,
        durationDaysMin: 21,
        durationDaysMax: 30,
        requirements: { water: 'Sparse, let soil dry fully', sunlight: 'Bright indirect' },
        milestones: ['First upright leaf'],
      },
      {
        name: 'Vegetative',
        order: 1,
        durationDaysMin: 60,
        durationDaysMax: 90,
        requirements: { water: 'Sparse, let soil dry fully', sunlight: 'Full sun' },
        milestones: ['New leaves emerge from base'],
      },
      {
        name: 'Mature',
        order: 2,
        durationDaysMin: 180,
        durationDaysMax: 365,
        requirements: { water: 'Sparse, let soil dry fully', sunlight: 'Full sun' },
        milestones: ['Growth plateaus', 'May produce offsets'],
      },
    ],
  },
  {
    slug: 'aloe-vera',
    commonName: 'Aloe Vera',
    latinName: 'Aloe vera',
    type: 'Succulent',
    tags: ['decor'],
    care: { water: 15, sunlight: 'Full sun', temperature: 'Warm', humidity: 'Dry', soil: 'Sandy' },
    careTips: [
      'Water deeply, then let soil dry completely',
      'Give it the sunniest spot you have',
      'Use a well-draining cactus mix',
    ],
    growthStages: [
      {
        name: 'Seedling',
        order: 0,
        durationDaysMin: 21,
        durationDaysMax: 30,
        requirements: { water: 'Sparse', sunlight: 'Bright, indirect at first' },
        milestones: ['First thick leaf forms'],
      },
      {
        name: 'Vegetative',
        order: 1,
        durationDaysMin: 45,
        durationDaysMax: 75,
        requirements: { water: 'Sparse, deep soak then dry', sunlight: 'Full sun' },
        milestones: ['Rosette fills out'],
      },
      {
        name: 'Mature',
        order: 2,
        durationDaysMin: 120,
        durationDaysMax: 240,
        requirements: { water: 'Sparse, deep soak then dry', sunlight: 'Full sun' },
        milestones: ['Produces offset pups'],
      },
    ],
  },
  {
    slug: 'areca-palm',
    commonName: 'Areca Palm',
    latinName: 'Dypsis lutescens',
    type: 'Indoor plant',
    tags: ['decor', 'pet'],
    care: {
      water: 80,
      sunlight: 'Bright indirect',
      temperature: 'Warm',
      humidity: 'High',
      soil: 'Peaty',
    },
    careTips: [
      'Keep soil lightly moist, never soggy',
      'Mist leaves in dry indoor air',
      'Feed monthly during spring and summer',
    ],
    growthStages: [
      {
        name: 'Seedling',
        order: 0,
        durationDaysMin: 14,
        durationDaysMax: 21,
        requirements: { water: 'Lightly moist', sunlight: 'Bright indirect' },
        milestones: ['First frond unfurls'],
      },
      {
        name: 'Vegetative',
        order: 1,
        durationDaysMin: 45,
        durationDaysMax: 60,
        requirements: { water: 'Lightly moist', sunlight: 'Bright indirect' },
        milestones: ['New fronds emerge steadily'],
      },
      {
        name: 'Mature',
        order: 2,
        durationDaysMin: 90,
        durationDaysMax: 150,
        requirements: { water: 'Lightly moist', sunlight: 'Bright indirect' },
        milestones: ['Clumping fuller canopy'],
      },
    ],
  },
  {
    slug: 'bonsai-tree',
    commonName: 'Bonsai Tree',
    latinName: 'Ficus retusa',
    type: 'Indoor plant',
    tags: ['decor'],
    care: {
      water: 55,
      sunlight: 'Full sun',
      temperature: 'Moderate',
      humidity: 'Moderate',
      soil: 'Well-draining',
    },
    careTips: [
      'Check soil moisture daily, small pots dry fast',
      'Prune new shoots to keep its shape',
      'Keep near a bright, cool window',
    ],
    growthStages: [
      {
        name: 'Seedling',
        order: 0,
        durationDaysMin: 30,
        durationDaysMax: 45,
        requirements: {
          water: 'Check daily, small pot dries fast',
          sunlight: 'Bright, some direct',
        },
        milestones: ['First trunk thickening'],
      },
      {
        name: 'Vegetative',
        order: 1,
        durationDaysMin: 90,
        durationDaysMax: 180,
        requirements: { water: 'Check daily, small pot dries fast', sunlight: 'Full sun' },
        milestones: ['Responds well to first pruning'],
      },
      {
        name: 'Mature',
        order: 2,
        durationDaysMin: 365,
        durationDaysMax: 730,
        requirements: { water: 'Check daily, small pot dries fast', sunlight: 'Full sun' },
        milestones: ['Shape holds after styling'],
      },
    ],
  },
  {
    slug: 'birds-nest-fern',
    commonName: "Bird's Nest Fern",
    latinName: 'Asplenium nidus',
    type: 'Indoor plant',
    tags: ['decor', 'pet'],
    care: {
      water: 85,
      sunlight: 'Low light',
      temperature: 'Warm',
      humidity: 'High',
      soil: 'Peaty',
    },
    careTips: [
      'Keep soil consistently moist',
      'Avoid direct sun, which scorches fronds',
      'Boost humidity with a pebble tray',
    ],
    growthStages: [
      {
        name: 'Seedling',
        order: 0,
        durationDaysMin: 14,
        durationDaysMax: 21,
        requirements: { water: 'Consistently moist', sunlight: 'Low light' },
        milestones: ['First rippled frond'],
      },
      {
        name: 'Vegetative',
        order: 1,
        durationDaysMin: 30,
        durationDaysMax: 45,
        requirements: { water: 'Consistently moist', sunlight: 'Low light' },
        milestones: ['Rosette nest shape forms'],
      },
      {
        name: 'Mature',
        order: 2,
        durationDaysMin: 60,
        durationDaysMax: 120,
        requirements: { water: 'Consistently moist', sunlight: 'Low light' },
        milestones: ['Fronds reach full size'],
      },
    ],
  },
  {
    slug: 'jade-plant',
    commonName: 'Jade Plant',
    latinName: 'Crassula ovata',
    type: 'Succulent',
    tags: ['decor'],
    care: {
      water: 20,
      sunlight: 'Bright indirect',
      temperature: 'Warm',
      humidity: 'Dry',
      soil: 'Sandy',
    },
    careTips: [
      'Water sparingly, more in summer',
      'Give bright, indirect light daily',
      'Sturdy stems tolerate light neglect well',
    ],
    growthStages: [
      {
        name: 'Seedling',
        order: 0,
        durationDaysMin: 21,
        durationDaysMax: 30,
        requirements: { water: 'Sparse', sunlight: 'Bright indirect' },
        milestones: ['First coin-shaped leaf pair'],
      },
      {
        name: 'Vegetative',
        order: 1,
        durationDaysMin: 60,
        durationDaysMax: 90,
        requirements: { water: 'Sparse, more in summer', sunlight: 'Bright indirect' },
        milestones: ['Branching begins'],
      },
      {
        name: 'Mature',
        order: 2,
        durationDaysMin: 180,
        durationDaysMax: 365,
        requirements: { water: 'Sparse, more in summer', sunlight: 'Bright indirect' },
        milestones: ['Woody stem develops'],
      },
    ],
  },
  {
    slug: 'peace-lily',
    commonName: 'Peace Lily',
    latinName: 'Spathiphyllum wallisii',
    type: 'Blooming',
    tags: ['blooming', 'decor'],
    care: {
      water: 75,
      sunlight: 'Medium light',
      temperature: 'Warm',
      humidity: 'High',
      soil: 'Peaty',
    },
    careTips: [
      'Water when leaves start to droop slightly',
      'Keep away from direct, harsh sun',
      'Wipe leaves to help it bloom fully',
    ],
    growthStages: [
      {
        name: 'Seedling',
        order: 0,
        durationDaysMin: 14,
        durationDaysMax: 21,
        requirements: { water: 'Water before it droops', sunlight: 'Medium light' },
        milestones: ['First glossy leaf'],
      },
      {
        name: 'Vegetative',
        order: 1,
        durationDaysMin: 30,
        durationDaysMax: 45,
        requirements: { water: 'Water before it droops', sunlight: 'Medium light' },
        milestones: ['Leaf clump fills in'],
      },
      {
        name: 'Mature',
        order: 2,
        durationDaysMin: 60,
        durationDaysMax: 120,
        requirements: { water: 'Water before it droops', sunlight: 'Medium light' },
        milestones: ['First white bloom appears'],
      },
    ],
  },
];

async function seed(): Promise<void> {
  const client: MongoClient = new MongoClient(uri!);
  await client.connect();

  const db: Db = client.db();
  const collection = db.collection<Plant>('plant_species');

  const validated: Plant[] = plants.map((plant: Plant) => plantSchema.parse(plant));

  /** set idempotent collection into db */
  await collection.deleteMany({});
  await collection.insertMany(validated);

  console.log(`Seeded: ${validated.length} plants intro plant_species`);
  await client.close();
}

seed().catch((error) => {
  console.error('ERR seed: ', error);
  process.exit(1);
});
