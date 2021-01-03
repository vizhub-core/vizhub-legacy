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
      const { id, createdTimestamp, lastUpdatedTimestamp, upvotesCount } = info;

      const createdDate = toDate(createdTimestamp);
      const lastUpdatedDate = toDate(lastUpdatedTimestamp);
      const upVotes = upvotesCount || 0;

      const scores = {
        wilson: wilsonScore(upVotes, 0),
        redditHotCreated: redditHotScore(upVotes, 0, createdDate),
        hackerHotCreated: hackerHotScore(upVotes, createdDate),
        redditHotLastUpdated: redditHotScore(upVotes, 0, lastUpdatedDate),
        hackerHotLastUpdated: hackerHotScore(upVotes, lastUpdatedDate),
      };
      console.log(scores);

      return await this.visualizationGateway.updateScores({ id, scores });
    };

    const sleep = (n) => new Promise((res) => setTimeout(res, n));

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
      await sleep(1000);
      return await updateScore(info);
    }, {});

    return 'success';
  }
}
