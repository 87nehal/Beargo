import { google } from 'googleapis';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const API_KEY = config.perspectiveApiKey;
  const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

  const body = await readBody(event)

  const { text } = body

  try {
    const client = await google.discoverAPI(DISCOVERY_URL);
    const analyzeRequest = {
      comment: {
        text: text,
      },
      languages: ["en"],
      requestedAttributes: {
        TOXICITY: {},
        IDENTITY_ATTACK: {},
        PROFANITY: {},
        THREAT: {},
        SEXUALLY_EXPLICIT: {},
      },
    };

    const response = await client.comments.analyze({
      key: API_KEY,
      resource: analyzeRequest,
    });
    const { TOXICITY, IDENTITY_ATTACK, PROFANITY, THREAT, SEXUALLY_EXPLICIT } = response.data.attributeScores;

    const toxicityScore = TOXICITY.summaryScore.value;
    const identityAttackScore = IDENTITY_ATTACK.summaryScore.value;
    const profanityScore = PROFANITY.summaryScore.value;
    const threatScore = THREAT.summaryScore.value;
    const sexuallyExplicitScore = SEXUALLY_EXPLICIT.summaryScore.value;

    return {
      toxicityScore,
      identityAttackScore,
      profanityScore,
      threatScore,
      sexuallyExplicitScore
    };
  } catch (err) {
    throw err;
  }
});