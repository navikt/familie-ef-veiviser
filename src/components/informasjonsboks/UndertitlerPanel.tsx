import React from 'react';
import { IUndertittel, IBrodtekst } from '../../models/Informasjonsboks';
import MarkdownViewer from '../utils/MarkdownViewer';
import { Heading } from '@navikt/ds-react';
import { ordetNavIStoreBokstaverSkalKunStarteMedStorBokstav } from '../../utils/tekst';

interface IUndertitlerPanelProps {
  undertitler: IUndertittel[];
  antall_undertitler_totalt?: number;
  className?: string;
}

const UndertitlerPanel: React.FC<IUndertitlerPanelProps> = ({
  undertitler,
  antall_undertitler_totalt,
  className,
}) => {
  const undertitlerIPanel = undertitler.filter(
    (undertittel) => undertittel.tekst_i_panel
  );

  const undertittelClass = className
    ? className
    : !undertitlerIPanel.length
      ? 'bare-brodtekst'
      : antall_undertitler_totalt && antall_undertitler_totalt > 1
        ? 'undertittel-flere'
        : 'undertittel-singel';

  const undertitlerMedInnhold = undertitler.filter(
    (undertittel) =>
      undertittel.tekst_i_panel ||
      (undertittel.brodtekster && undertittel.brodtekster.length) ||
      undertittel.knapp
  );

  const visKnapp = (undertittel: IUndertittel) => {
    return (
      undertittel.knapp && undertittel.knapp.tekst && undertittel.knapp.lenke
    );
  };

  return (
    <>
      {undertitlerMedInnhold.map((undertittel: IUndertittel, i: number) => {
        return (
          <div
            className={
              i === 0 && undertittel.ikke_rett_til
                ? `${undertittelClass}-0`
                : undertittelClass
            }
            key={i}
          >
            {undertittel.tekst_i_panel ? (
              <Heading size="small">{undertittel.tekst_i_panel}</Heading>
            ) : null}
            {undertittel.brodtekster &&
              undertittel.brodtekster.map(
                (brodtekst: IBrodtekst, i: number) => {
                  return (
                    <div
                      className={
                        i === undertittel.brodtekster.length - 1 ? 'siste' : ''
                      }
                      key={i}
                    >
                      <MarkdownViewer
                        key={i}
                        markdown={ordetNavIStoreBokstaverSkalKunStarteMedStorBokstav(
                          brodtekst.body
                        )}
                      />
                    </div>
                  );
                }
              )}
            {visKnapp(undertittel) ? (
              <a
                href={undertittel.knapp.lenke}
                target="_blank"
                rel="noopener noreferrer"
                className="knapp"
              >
                {undertittel.knapp.tekst}
              </a>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default UndertitlerPanel;
