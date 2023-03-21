import React from 'react';
import renderer from 'react-test-renderer';
import dayResult from './findMaxDay';


describe('leapYearDay component', () => {
  test('2024 is leap year', () => {
    expect(dayResult.IsLeapYear(2024)).toBe(true)
  });

  test('2023 is leap year', () => {
    expect(dayResult.IsLeapYear(2023)).toBe(false)
  });
});

