<i18n>
{
  "it": {
      "errors": "Messaggi d'errore",
      "0": "Errore sonda mandata", 
      "1": "Errore sonda ritorno", 
      "2": "Errore sonda interna", 
      "3": "Errore sonda umidità", 
      "4": "Errore sensore CO2", 
      "5": "Errore sonda esterna", 
      "6": "Errore sonda primario", 
      "7": "Errore sonda acs", 
      "8": "Errore USB", 
      "9": "Errore orologio", 
      "10": "Errore sonda TU 1x", 
      "11": "Errore sonda TU 2x",  
      "12": "Errore sonda TU 3x",  
      "13": "Errore sonda TU 4x",  
      "14": "Blocco caldaia",  
      "15": "Blocco pompa di calore",  
      "16": "Errore communicazione Xsmart Room 10",  
      "17": "Errore communicazione Xsmart Room 20",  
      "18": "Errore communicazione Xsmart Room 30",  
      "19": "Errore communicazione Xsmart Room 40",  
      "20": "Errore communicazione Climate 161",  
      "21": "Errore communicazione Climate 162",  
      "22": "Errore communicazione Climate 163",  
      "23": "Errore communicazione Climate 164",  
      "24": "Errore communicazione ClimAir 160",
      "25": "Allarme ClimAir"
  },
  "de": {
      "errors": "Fehlermeldungen",
      "0": "Fehler Vorlauffühler",
      "1": "Fehler Rücklauffühler", 
      "2": "Fehler Raumtemperaturfühler", 
      "3": "Fehler Raumfeuchtefühler", 
      "4": "Fehler CO2 Sensor", 
      "5": "Fehler Aussenfühler", 
      "6": "Fehler Primärtemperaturfühler", 
      "7": "Fehler Warmwasserfühler", 
      "8": "Fehler USB", 
      "9": "Fehler Uhr", 
      "10": "Fehler Raumfühler TF 1x", 
      "11": "Fehler Raumfühler TF 2x",  
      "12": "Fehler Raumfühler TF 3x",  
      "13": "Fehler Raumfühler TF 4x",  
      "14": "Störung Heizkessel",  
      "15": "Störung Wärmepumpe",  
      "16": "Fehler Kommunikation <br>Xsmart Room 10",  
      "17": "Fehler Kommunikation <br>Xsmart Room 20",  
      "18": "Fehler Kommunikation <br>Xsmart Room 30",  
      "19": "Fehler Kommunikation <br>Xsmart Room 40",  
      "20": "Fehler Kommunikation <br>Climate 161",  
      "21": "Fehler Kommunikation <br>Climate 162",  
      "22": "Fehler Kommunikation <br>Climate 163",  
      "23": "Fehler Kommunikation <br>Climate 164",  
      "24": "Fehler Kommunikation <br>ClimAir 160",
      "25": "Störung ClimAir"
  },
  "en": {
      "errors": "Errors Messages",
      "0": "Error supply sensor",
      "1": "Error return sensor", 
      "2": "Error room temperature sensor", 
      "3": "Error room humidity sensor", 
      "4": "Error sensor CO2", 
      "5": "Error outside sensor", 
      "6": "Error primary sensor", 
      "7": "Error dhw sensor", 
      "8": "Error USB", 
      "9": "Error clock", 
      "10": "Error roomsensor TH 1x", 
      "11": "Error roomsensor TH 2x",  
      "12": "Error roomsensor TH 3x",  
      "13": "Error roomsensor TH 4x",  
      "14": "Error Boiler",  
      "15": "Error Heatpump",  
      "16": "Error comunication <br>Xsmart Room 10",  
      "17": "Error comunication <br>Xsmart Room 20",  
      "18": "Error comunication <br>Xsmart Room 30",  
      "19": "Error comunication <br>Xsmart Room 40",  
      "20": "Error comunication <br>Climate 161",  
      "21": "Error comunication <br>Climate 162",  
      "22": "Error comunication <br>Climate 163",  
      "23": "Error comunication <br>Climate 164",  
      "24": "Error comunication <br>ClimAir 160",
      "25": "Error ClimAir" 
  }
}
</i18n>


<template>
  <f7-page  name="panel right">
    <f7-navbar :title="$t('errors')"></f7-navbar>
    <f7-block>
      <span v-for="(item, index) in ($f7.data.input.t12001).toString(2).split('').reverse()" :key="index">
        <p v-if="item>0" class="vertical-flex">
          <f7-icon ios="material:notifications" aurora="material:notifications" md="material:notifications"></f7-icon>
          <span v-html="$t(index.toString())"></span>
        </p>
      </span>
    </f7-block>
    <f7-block>
      <span v-for="(item, index) in ($f7.data.input.t12002).toString(2).split('').reverse()" :key="index">
        <p v-if="item>0" class="vertical-flex">
          <f7-icon ios="material:notifications" aurora="material:notifications" md="material:notifications"></f7-icon>
          <span v-html="$t(index+16)"></span>
        </p>
      </span>
    </f7-block>
  </f7-page>
</template>


<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block, f7List, f7ListItem, f7Link } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
      f7List,
      f7ListItem,
      f7Link,
    }
  };
</script>

<style scoped>
  .vertical-flex {
    height: 40px;
    display: flex;
    align-items: center;
  }
  .vertical-flex span{
    margin-left:10px;
  }
</style>