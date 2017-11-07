import store from '../src/store';

const mockState = {
  "down": false,
  "left": false,
  "right": false,
  "up": false
};

test('getState returns state', () => {
  expect(store.getState()).toEqual(mockState);
});

test('getState is immutable', () => {
  expect(() => {
    store.getState().down = true;
  }).toThrowError(/Cannot assign to read only property/);
});
