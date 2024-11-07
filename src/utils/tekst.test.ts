import { describe, expect, test } from 'vitest';
import { ordetNavIStoreBokstaverSkalKunStarteMedStorBokstav } from './tekst';

describe('Tester at ordetNavIStoreBokstaverSkalKunStarteMedStorBokstav kun endrer ordet NAV', () => {
  test('Det er kun ordet NAV som skal endres', () => {
    expect(
      ordetNavIStoreBokstaverSkalKunStarteMedStorBokstav('NAV er NAVTEST')
    ).toBe('Nav er NAVTEST');

    expect(ordetNavIStoreBokstaverSkalKunStarteMedStorBokstav('NAVN')).toBe(
      'NAVN'
    );
  });

  test('Skal endre ordet NAV hvis det er i starten av av setning', () => {
    const tekst = 'NAV test';
    expect(ordetNavIStoreBokstaverSkalKunStarteMedStorBokstav(tekst)).toBe(
      'Nav test'
    );
  });

  test('Skal endre ordet NAV når det er før eller etter bindestrek', () => {
    expect(
      ordetNavIStoreBokstaverSkalKunStarteMedStorBokstav('Test NAV-Test')
    ).toBe('Test Nav-Test');

    expect(ordetNavIStoreBokstaverSkalKunStarteMedStorBokstav('Test-NAV')).toBe(
      'Test-Nav'
    );
  });

  test('Skal ikke endre noe hvis ordet NAV ikke er i setningen.', () => {
    const tekst = 'Dette er en test med ordet Nav';
    expect(ordetNavIStoreBokstaverSkalKunStarteMedStorBokstav(tekst)).toBe(
      tekst
    );
  });
});
