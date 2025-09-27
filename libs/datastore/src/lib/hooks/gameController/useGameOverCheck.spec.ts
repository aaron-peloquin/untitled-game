import { useGameOverCheck } from './useGameOverCheck';
import { renderHook } from '@testing-library/react-hooks';

// Mock the dependencies
jest.mock('../gameData/useGetBand');
jest.mock('../gameData/useGetLocation');
jest.mock('../gameData/useListLocationsById');
jest.mock('../gameData/useListMercenariesById');
jest.mock('./useGetGameSetting');

const mockUseGetBand = require('../gameData/useGetBand').useGetBand;
const mockUseGetLocation = require('../gameData/useGetLocation').useGetLocation;
const mockUseListLocationsById = require('../gameData/useListLocationsById').useListLocationsById;
const mockUseListMercenariesById = require('../gameData/useListMercenariesById').useListMercenariesById;
const mockUseGetGameSetting = require('./useGetGameSetting').useGetGameSetting;

describe('useGameOverCheck', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock for hp_per_end setting
    mockUseGetGameSetting.mockReturnValue({ value: '1' });
  });

  it('should return not game over when band has mercenaries', () => {
    mockUseGetBand.mockReturnValue({ 
      mercenaryIds: [1, 2], 
      gold: 100,
      currentLocationId: 1 
    });
    mockUseGetLocation.mockReturnValue({ 
      relatedLocationIds: [2, 3], 
      mercenaryIds: [10, 11] 
    });
    mockUseListLocationsById.mockReturnValue([]);
    mockUseListMercenariesById.mockReturnValue([]);

    const { result } = renderHook(() => useGameOverCheck());

    expect(result.current.isGameOver).toBe(false);
  });

  it('should return not game over when no mercenaries but can afford hire', () => {
    mockUseGetBand.mockReturnValue({ 
      mercenaryIds: [], 
      gold: 100,
      currentLocationId: 1 
    });
    mockUseGetLocation.mockReturnValue({ 
      relatedLocationIds: [2, 3], 
      mercenaryIds: [10, 11] 
    });
    mockUseListLocationsById.mockReturnValue([]);
    // Mock mercenaries with low hire cost
    mockUseListMercenariesById.mockReturnValue([
      { level: 1, ethnicity: 'human', profession: 'farmer', personality: 'brave' }
    ]);

    const { result } = renderHook(() => useGameOverCheck());

    expect(result.current.isGameOver).toBe(false);
  });

  it('should return not game over when no mercenaries, cannot hire, but can afford travel', () => {
    mockUseGetBand.mockReturnValue({ 
      mercenaryIds: [], 
      gold: 10, // Low gold
      currentLocationId: 1 
    });
    mockUseGetLocation.mockReturnValue({ 
      relatedLocationIds: [2], 
      mercenaryIds: [] 
    });
    // Mock cheap travel location
    mockUseListLocationsById.mockReturnValue([
      { level: 1 } // Travel cost would be Math.round(1 * 1.5) = 2
    ]);
    mockUseListMercenariesById.mockReturnValue([]);

    const { result } = renderHook(() => useGameOverCheck());

    expect(result.current.isGameOver).toBe(false);
  });

  it('should return game over when all conditions are met', () => {
    mockUseGetBand.mockReturnValue({ 
      mercenaryIds: [], // No mercenaries
      gold: 1, // Very low gold
      currentLocationId: 1 
    });
    mockUseGetLocation.mockReturnValue({ 
      relatedLocationIds: [2], 
      mercenaryIds: [] // No mercenaries to hire
    });
    // Mock expensive travel location
    mockUseListLocationsById.mockReturnValue([
      { level: 10 } // Travel cost would be Math.round(10 * 1.5) = 15
    ]);
    mockUseListMercenariesById.mockReturnValue([]);

    const { result } = renderHook(() => useGameOverCheck());

    expect(result.current.isGameOver).toBe(true);
    expect(result.current.reason).toContain('No mercenaries');
  });

  it('should return not game over when data is still loading', () => {
    mockUseGetBand.mockReturnValue(undefined);
    mockUseGetLocation.mockReturnValue(undefined);
    mockUseListLocationsById.mockReturnValue([]);
    mockUseListMercenariesById.mockReturnValue([]);

    const { result } = renderHook(() => useGameOverCheck());

    expect(result.current.isGameOver).toBe(false);
  });
});