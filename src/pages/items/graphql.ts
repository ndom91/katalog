import gql from 'graphql-tag'

export const UpdateItemMutation = gql`
  mutation UpdateItemMutation(
    $id: Int!
    $title: String!
    $qty: Int
    $desc: String
    $location: Int
    $updated_by: String!
    $type: String
    $status: Int
    $currency: String
    $purchase_price: String
    $serialNo: String
    $inventarNr: String
    $kontoNr: String
    $date_updated: DateTime
    $ahk_date: DateTime
    $ahk_wj_ende: String
    $buchw_wj_ende: String
    $n_afa_wj_ende: String
    $sonder_abs_wj_ende: String
    $nutzungsdauer: String
    $afa_art: String
    $afa_percent: String
    $kost1: Int
    $kost2: Int
    $filiale: String
    $lieferantNr: String
    $anlag_lieferant: String
    $ahk_wj_beginn: String
    $buchwert_wj_beginn: String
    $n_afa_wj_beginn: String
    $sonder_abs_wj_beginn: String
    $sonder_abs_art: String
    $sonder_abs_percent: String
    $restbeguenstigung: String
    $sonder_abs_verteil: Boolean
    $abgang: DateTime
    $lebenslaufakte: Boolean
    $bestelldatum: DateTime
    $erl_afa_art: String
    $herkunftsart: String
    $wkn_isin: String
    $erfassungsart: String
  ) {
    updateOneItem(
      data: {
        title: $title
        qty: $qty
        description: $desc
        updated_by: $updated_by
        type: $type
        serialNo: $serialNo
        inventarNr: $inventarNr
        currency: $currency
        purchase_price: $purchase_price
        status: { connect: { id: $status } }
        kontoNr: $kontoNr
        date_updated: $date_updated
        ahk_date: $ahk_date
        ahk_wj_ende: $ahk_wj_ende
        buchw_wj_ende: $buchw_wj_ende
        n_afa_wj_ende: $n_afa_wj_ende
        sonder_abs_wj_ende: $sonder_abs_wj_ende
        nutzungsdauer: $nutzungsdauer
        afa_art: $afa_art
        afa_percent: $afa_percent
        kost1: $kost1
        kost2: $kost2
        filiale: $filiale
        lieferantNr: $lieferantNr
        anlag_lieferant: $anlag_lieferant
        ahk_wj_beginn: $ahk_wj_beginn
        buchwert_wj_beginn: $buchwert_wj_beginn
        n_afa_wj_beginn: $n_afa_wj_beginn
        sonder_abs_wj_beginn: $sonder_abs_wj_beginn
        sonder_abs_art: $sonder_abs_art
        sonder_abs_percent: $sonder_abs_percent
        restbeguenstigung: $restbeguenstigung
        sonder_abs_verteil: $sonder_abs_verteil
        abgang: $abgang
        lebenslaufakte: $lebenslaufakte
        bestelldatum: $bestelldatum
        erl_afa_art: $erl_afa_art
        herkunftsart: $herkunftsart
        wkn_isin: $wkn_isin
        erfassungsart: $erfassungsart
        location: { connect: { id: $location } }
      }
      where: { id: $id }
    ) {
      id
      qty
      title
      description
      type
      serialNo
      currency
      inventarNr
      kontoNr
      purchase_price
      status {
        id
        name
      }
      date_added
      date_updated
      updated_by
      ahk_date
      ahk_wj_ende
      buchw_wj_ende
      n_afa_wj_ende
      sonder_abs_wj_ende
      nutzungsdauer
      afa_art
      afa_percent
      kost1
      kost2
      filiale
      lieferantNr
      anlag_lieferant
      ahk_wj_beginn
      buchwert_wj_beginn
      n_afa_wj_beginn
      sonder_abs_wj_beginn
      sonder_abs_art
      sonder_abs_percent
      restbeguenstigung
      sonder_abs_verteil
      abgang
      lebenslaufakte
      bestelldatum
      erl_afa_art
      herkunftsart
      wkn_isin
      erfassungsart
      images {
        id
        title
        url
      }
      locationId
    }
  }
`

export const getItemQuery = gql`
  query getItem($id: Int!) {
    item(where: { id: $id }) {
      id
      qty
      title
      description
      type
      serialNo
      inventarNr
      kontoNr
      ahk_wj_ende
      purchase_price
      currency
      date_added
      date_updated
      updated_by
      ahk_date
      buchw_wj_ende
      n_afa_wj_ende
      sonder_abs_wj_ende
      nutzungsdauer
      afa_art
      afa_percent
      kost1
      kost2
      filiale
      lieferantNr
      anlag_lieferant
      ahk_wj_beginn
      buchwert_wj_beginn
      n_afa_wj_beginn
      sonder_abs_wj_beginn
      sonder_abs_art
      sonder_abs_percent
      restbeguenstigung
      sonder_abs_verteil
      abgang
      lebenslaufakte
      bestelldatum
      erl_afa_art
      herkunftsart
      wkn_isin
      erfassungsart
      images {
        id
        title
        url
      }
      locationId
      statusId
    }
    allLocations {
      id
      description
    }
    allStatuses {
      id
      name
    }
  }
`
