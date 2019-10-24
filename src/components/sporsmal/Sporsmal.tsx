import React, { useState, SyntheticEvent, useRef } from 'react';
import { ISporsmal, ISvar } from '../../models/Sporsmal';
import { RadioPanel } from 'nav-frontend-skjema';
import Informasjonsboks from '../informasjonsboks/Informasjonsboks';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { scrollTilRef } from '../../utils/utils';

interface ISporsmalProps {
  steg: number;
  setSteg: (active: number) => void;
  setFerdig: (ferdig: boolean) => void;
  ferdig: boolean;
  sporsmalListe: ISporsmal[];
  infoMapping: any;
}

interface ISporsmalState {
  sporsmalSti: [];
  svarSti: [];
}

const Sporsmal: React.FC<ISporsmalProps> = ({
  sporsmalListe,
  steg,
  setSteg,
  setFerdig,
  ferdig,
  infoMapping,
}) => {
  const [state, setState] = useState<any>({
    sporsmalSti: [],
    svarSti: [],
  });

  const scrollPunkt = useRef(null);

  const detteSporsmalet = sporsmalListe.find(
    (sporsmal: ISporsmal) => sporsmal.sporsmal_id === steg
  );

  if (!ferdig && !state.sporsmalSti.includes(detteSporsmalet)) {
    state.sporsmalSti.push(detteSporsmalet);
  }

  const handleNesteKlikk = (
    e: SyntheticEvent<EventTarget>,
    sporsmal: ISporsmal,
    svar: ISvar
  ): void => {
    if (svar.done) {
      setFerdig(true);
    } else {
      setFerdig(false);
    }

    const sporsmalIndeks = state.sporsmalSti.findIndex(
      (s: ISporsmal) => s.sporsmal_id === sporsmal.sporsmal_id
    );

    state.sporsmalSti.length = sporsmalIndeks + 1;

    const nySporsmalSti = state.sporsmalSti.map((s: ISporsmal) => {
      if (s.sporsmal_id === sporsmal.sporsmal_id) {
        const nySvarliste = s.svarliste.map((sv: ISvar) => {
          if (sv._id === svar._id) {
            return { ...sv, checked: true };
          } else {
            return { ...sv, checked: false };
          }
        });

        return { ...sporsmal, svarliste: nySvarliste };
      }

      return s;
    });

    setState((prevState: any) => ({
      ...prevState,
      sporsmalSti: nySporsmalSti,
    }));

    if (svar.done_complete) {
      const svarListe = state.sporsmalSti
        .map((sporsmal: ISporsmal) => {
          return sporsmal.svarliste.find((svar: ISvar) => svar.checked);
        })
        .filter((svar: ISvar) => svar);

      setState((prevState: any) => ({
        ...prevState,
        svarSti: svarListe,
      }));

      const svarIder = svarListe.map((svar: ISvar) => svar._id);

      let lengsteMatchId = null;
      let lengsteMatchLengde = 0;

      for (let i = 0; i < infoMapping.length; i++) {
        const mapping = infoMapping[i];

        if (!mapping.svarsti || !mapping.svarsti.length) continue;

        const svarstiIder = mapping.svarsti.map((svar: ISvar) => svar._id);

        if (svarstiIder.every((val: string) => svarIder.includes(val))) {
          if (svarstiIder.length > lengsteMatchLengde) {
            lengsteMatchLengde = svarstiIder.length;
            lengsteMatchId = mapping.information_id;
          }
        }
      }

      setSteg(lengsteMatchId);
    } else {
      setSteg(svar.goto);
    }

    setTimeout(() => scrollTilRef(scrollPunkt), 120);
  };

  return (
    <div>
      {state.sporsmalSti.map((sporsmal: ISporsmal) => {
        return (
          <div key={sporsmal._id} className="sporsmal-element">
            <span className="sporsmal-tekst">{sporsmal.sporsmal_tekst}</span>
            {sporsmal && sporsmal.hjelpetekst_overskrift ? (
              <Lesmerpanel
                className="hjelpetekst"
                apneTekst={sporsmal.hjelpetekst_overskrift}
              >
                <p>{sporsmal.hjelpetekst}</p>
              </Lesmerpanel>
            ) : null}
            {sporsmal.svarliste.map((svar: ISvar) => {
              return (
                <div key={svar._id} className="radioknapp-wrapper">
                  <RadioPanel
                    value={svar.tekst}
                    label={svar.tekst}
                    name={sporsmal._id}
                    checked={svar.checked ? svar.checked : false}
                    onChange={(e) => handleNesteKlikk(e, sporsmal, svar)}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      <div ref={scrollPunkt} />
      {ferdig ? <Informasjonsboks steg={steg} /> : null}
    </div>
  );
};

export default Sporsmal;
