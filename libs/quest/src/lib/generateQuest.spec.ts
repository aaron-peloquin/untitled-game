import {generateQuest} from './generateQuest';

describe('generateQuest', () => {
  it('should return a string', () => {
    expect(typeof generateQuest()).toEqual('string');
  });
});
