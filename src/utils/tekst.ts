export const ordetNavIStoreBokstaverSkalKunStarteMedStorBokstav = (
  tekst: string
): string => {
  return tekst.replace(/\bNAV\b/g, 'Nav');
};
