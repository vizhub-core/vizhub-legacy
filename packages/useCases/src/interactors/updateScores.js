import { toDate } from 'vizhub-entities';
import decay from 'decay';

const wilsonScore = decay.wilsonScore();
const redditHotScore = decay.redditHot();
const hackerHotScore = decay.hackerHot();

export class UpdateScores {
  constructor(gateways) {
    this.visualizationGateway = gateways.visualizationGateway;
  }

  async execute() {
    const vizInfos = await this.visualizationGateway.getAllVisualizationInfos();
    const n = vizInfos.length;

    const updateScore = async (info) => {
      const { id, createdTimestamp, lastUpdatedTimestamp, upvotes } = info;

      const createdDate = toDate(createdTimestamp);
      const lastUpdatedDate = toDate(lastUpdatedTimestamp);
      const upvotesCount = upvotes ? upvotes.length : 0;

      const scores = {
        scoreWilson: wilsonScore(upvotesCount, 0),
        scoreRedditHotCreated: redditHotScore(upvotesCount, 0, createdDate),
        scoreHackerHotCreated: hackerHotScore(upvotesCount, createdDate),
        scoreRedditHotLastUpdated: redditHotScore(
          upvotesCount,
          0,
          lastUpdatedDate
        ),
        scoreHackerHotLastUpdated: hackerHotScore(
          upvotesCount,
          lastUpdatedDate
        ),
      };

      return await this.visualizationGateway.updateScores({ id, scores });
    };

    const step = 100;
    await vizInfos.reduce(async (accumulator, info, i) => {
      await accumulator;
      if (i % step === 0) {
        console.log(
          `computed score for ${i} vizzes of ${n}. ${
            Math.round((i / n) * 1000) / 10
          }% done.`
        );
      }
      return await updateScore(info);
    }, {});

    return 'success';
  }
}
