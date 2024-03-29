import { toDate } from 'vizhub-entities';
import decay from 'decay';

const wilsonScore = decay.wilsonScore();
const redditHotScore = decay.redditHot();
const hackerHotScore = decay.hackerHot();

const infinityIfNaN = (number) => (isNaN(number) ? -Infinity : number);

export class UpdateScores {
  constructor(gateways) {
    this.visualizationGateway = gateways.visualizationGateway;
  }

  async execute() {
    const vizInfos = await this.visualizationGateway.getAllVisualizationInfos();
    const n = vizInfos.length;

    const updateScore = async (info) => {
      const {
        id,
        createdTimestamp,
        lastUpdatedTimestamp,
        upvotes,
        forksCount,
      } = info;

      const createdDate = toDate(createdTimestamp);
      const lastUpdatedDate = toDate(lastUpdatedTimestamp);
      let numUpvotes = upvotes ? upvotes.length : 0;
      const numForks = forksCount ? forksCount : 0;

      // Count each fork as half an upvote.
      numUpvotes += numForks / 2;

      // Count Curran's upvote as 10 upvotes.
      const CURRAN = '68416';
      if (upvotes && upvotes.find((d) => d.userId === CURRAN)) {
        numUpvotes += 9;
      }

      // Weighted score of "activity".
      //  * Forking counts as half of an "effective upvote"
      //  * One upvote = one "effective upvote"
      //const effectiveUpvotes = numForks / 2 + numUpvotes;
      const effectiveUpvotes = numUpvotes;

      const scores = {
        scoreWilson: infinityIfNaN(wilsonScore(effectiveUpvotes, 0)),
        scoreRedditHotCreated: infinityIfNaN(
          redditHotScore(effectiveUpvotes, 0, createdDate)
        ),
        scoreHackerHotCreated: infinityIfNaN(
          hackerHotScore(effectiveUpvotes, createdDate)
        ),
        scoreRedditHotLastUpdated: infinityIfNaN(
          redditHotScore(effectiveUpvotes, 0, lastUpdatedDate)
        ),
        scoreHackerHotLastUpdated: infinityIfNaN(
          hackerHotScore(effectiveUpvotes, lastUpdatedDate)
        ),
      };

      return await this.visualizationGateway.updateScores({ id, scores });
    };

    const logProgress = false;
    const step = 100;
    await vizInfos.reduce(async (accumulator, info, i) => {
      await accumulator;
      if (logProgress && i % step === 0) {
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
