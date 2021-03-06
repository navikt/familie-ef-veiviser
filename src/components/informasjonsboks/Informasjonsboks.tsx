import React, { useEffect, useState } from 'react';
import { client } from '../../utils/sanity';
import NavFrontendSpinner from 'nav-frontend-spinner';
import RettTilListe from './rett-til-liste/RettTilListe';
import { IInformasjonsboks, IUndertittel } from '../../models/Informasjonsboks';
import UndertitlerPanel from './UndertitlerPanel';
import BallIkon from '../../assets/icons/BallIkon';
import BamseIkon from '../../assets/icons/BamseIkon';
import BordIkon from '../../assets/icons/BordIkon';
import BarnIkon from '../../assets/icons/BarnIkon';
import Barn2Ikon from '../../assets/icons/Barn2Ikon';
import BrodskiveIkon from '../../assets/icons/BrodskiveIkon';
import TaateflaskeIkon from '../../assets/icons/TaateflaskeIkon';
import Feilside from '../feilside/Feilside';
import MarkdownViewer from '../utils/MarkdownViewer';
import { hentInformasjonsboksQuery } from '../../utils/sanity';
import {
  StyledAlertstripeAdvarsel,
  InformasjonsboksInnhold,
} from './InformasjonsboksElementer';
import MicroCard from '../../navikt-components/card/MicroCard';
import styled from 'styled-components';
import { device, farge, størrelse } from '../../utils/styles';

interface IInformasjonstekstProps {
  steg: number;
  disclaimer?: string;
  alert?: string;
}

export const MicroCardWrapper = styled.div`
  padding-left: 6rem;
  padding-right: 6rem;

  padding-bottom: 3rem;

  @media @mobile {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Informasjonsboks: React.FC<IInformasjonstekstProps> = ({
  steg,
  disclaimer,
  alert,
}) => {
  const [henter, settHenter] = useState<boolean>(true);
  const [info, settInfo] = useState<any>([]);
  const [feil, settFeil] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = () => {
      client
        .fetch(hentInformasjonsboksQuery, {
          type: 'informasjonsboks',
          id: steg,
        })
        .then((res: IInformasjonsboks) => {
          settInfo(res);
        })
        .catch((err: Error) => {
          console.error('Oh no, feil occured: ', err);
          settFeil(true);
        });

      settHenter(false);
    };

    fetchData();
    // eslint-disable-next-line
  }, [steg]);

  if (henter || !(info && info.undertitler)) {
    return <NavFrontendSpinner className="spinner" />;
  }

  if (feil) {
    return <Feilside />;
  }

  const rett_til_liste = info.undertitler.reduce(
    (tekster: string[], undertittel: IUndertittel) => {
      if (undertittel.tekst_i_liste && !undertittel.ikke_rett_til)
        tekster.push(undertittel.tekst_i_liste);
      return tekster;
    },
    []
  );

  const ikke_rett_til_liste = info.undertitler.reduce(
    (tekster: string[], undertittel: IUndertittel) => {
      if (
        undertittel.tekst_i_liste &&
        typeof undertittel.ikke_rett_til === 'boolean' &&
        undertittel.ikke_rett_til
      )
        tekster.push(undertittel.tekst_i_liste);
      return tekster;
    },
    []
  );

  const rett_til_undertitler = info.undertitler.filter(
    (undertittel: IUndertittel) =>
      !undertittel.ikke_rett_til &&
      (undertittel.tekst_i_panel || undertittel.brodtekster) &&
      !(
        undertittel.tekst_i_panel ===
        'Andre stønader og ordninger som kan være aktuelle for deg som er alene med barn'
      )
  );

  const ikke_rett_til_undertitler = info.undertitler.filter(
    (undertittel: IUndertittel) =>
      typeof undertittel.ikke_rett_til === 'boolean' &&
      undertittel.ikke_rett_til &&
      !(
        undertittel.tekst_i_panel ===
        'Andre stønader og ordninger som kan være aktuelle for deg som er alene med barn'
      )
  );

  return (
    <>
      {alert ? (
        <StyledAlertstripeAdvarsel>{alert}</StyledAlertstripeAdvarsel>
      ) : null}
      <div className="informasjonsboks blur-in" id={`informasjonsboks-${steg}`}>
        <div className="informasjonsboks-header">
          <BallIkon className="ball-ikon" />
          <BamseIkon className="bamse-ikon" />
          <BarnIkon className="barn-ikon" />
          <Barn2Ikon className="barn2-ikon" />
          <BordIkon className="bord-ikon" />
          <BrodskiveIkon className="brodskive-ikon" />
          <TaateflaskeIkon className="taateflaske-ikon" />
        </div>
        <InformasjonsboksInnhold>
          {rett_til_liste.length ? (
            <RettTilListe
              tekster_i_liste={rett_til_liste}
              ikke_rett_til={false}
            />
          ) : null}
          <UndertitlerPanel
            undertitler={rett_til_undertitler}
            antall_undertitler_totalt={info.undertitler.length}
          />
          {ikke_rett_til_liste.length ? (
            <RettTilListe
              tekster_i_liste={ikke_rett_til_liste}
              ikke_rett_til={true}
            />
          ) : null}
          <UndertitlerPanel
            undertitler={ikke_rett_til_undertitler}
            antall_undertitler_totalt={info.undertitler.length}
          />
          {disclaimer ? (
            <div className="disclaimer">
              <MarkdownViewer markdown={disclaimer} />
            </div>
          ) : null}

          <MicroCardWrapper>
            <h3>Mer om hva du kan ha rett til når du</h3>
            <MicroCard href="https://www.nav.no/alene-med-barn">
              Er helt eller delvis alene med barn
            </MicroCard>
          </MicroCardWrapper>
        </InformasjonsboksInnhold>
      </div>
    </>
  );
};

export default Informasjonsboks;
