import { I_Quest } from 'TS_Quest';
import {generateQuest} from './generateQuest';

const numberGenerator = () => 0.44;
const questGenerator = generateQuest(numberGenerator);

describe('generateQuest', () => {
  it('should return expected object', () => {
    const expectedReturn: I_Quest = {
      level: expect.any(Number),
      run: expect.any(Function),
      target: {
        ethnicity: expect.any(String),
        name: expect.any(String),
        profession: expect.any(String),
      },
      type: expect.any(String)
    }
    expect(questGenerator()).toEqual(expectedReturn);
  });
});
