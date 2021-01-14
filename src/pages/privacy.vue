<template>
  <f7-login-screen id="privacy">
    <f7-view>
      <f7-page name="privacy" login-screen>
        
        <f7-block v-if="$i18n.locale!=='de'">
          <h2>Informativa sulla protezione dei dati</h2>

          <p><strong>Generalità</strong><br>
          LOEX Srl ha sviluppato questa informativa sulla protezione dei dati al fine di conformare la propria attività a quella di soggetto fidato
          che assicura, rispetta e mantiene il diritto alla protezione dati degli utilizzatori dell’accesso remoto del sistema di regolazione LOEX
          Xsmart.<br>
          Alberto Morelli è il titolare del trattamento dei dati personali eventualmente raccolti attraverso sito web secondo quanto definito dal
          Regolamento Europeo GDPR 679/2016. Il titolare tratterà i dati eventualmente raccolti attraverso questo sito web (xsmart.loex.it) per
          finalità, con modalità e secondo quanto specificamente illustrato nel seguito.</p>

          <p><strong>Raccolta dei dati personali e finalità del trattamento</strong><br>
          LOEX Srl raccoglierà e tratterà solamente dati personali volontariamente forniti dagli utilizzatori. Gli utilizzatori sono in grado di usare
          l’accesso remoto al sistema di regolazione anche senza rivelare informazioni e dati personali. Ciascun utilizzatore del sito può
          scegliere di fornire a LOEX Srl limitati dati personali secondo quanto richiesto al fine di ottenere informazioni sui nostri servizi. Una
          volta registrati, i dati personali raccolti saranno utilizzati solamente per i servizi indicati nell’informativa disponibile.<br>
          Gli utilizzatori possono fornire i loro dati per:
          <ul>
            <li>richiedere informazioni sui servizi e supporto tecnico</li>
          </ul></p>

          <p><strong>Comunicazione a terzi</strong><br>
          I dati personali non saranno oggetto di comunicazione ad altre società senza un Vostro esplicito consenso. I dati personali potranno
          però essere inviati agli Enti ed Istituti per l’espletamento degli obblighi di legge. LOEX Srl non raccoglie deliberatamente, attraverso
          il sito web, dati personali sensibili o giudiziari. I Dati sensibili, ai sensi dell’art. 4 del Regolamento Europeo GDPR 679/2016, includono
          i dati personali idonei a rivelare l'origine razziale ed etnica, le convinzioni religiose, filosofiche o di altro genere, le opinioni politiche,
          l'adesione a partiti, sindacati, associazioni od organizzazioni a carattere religioso, filosofico, politico o sindacale, nonché i dati
          personali idonei a rivelare lo stato di salute e la vita sessuale. I dati giudiziari, sempre ai sensi dell’art. 4 del Regolamento Europeo
          GDPR 679/2016, includono i dati personali idonei a rivelare provvedimenti di cui all'articolo 3, comma 1, lettere da a) a o) e da r) a
          u), del D.P.R. 14 novembre 2002, n. 313, in materia di casellario giudiziale, di anagrafe delle sanzioni amministrative dipendenti da
          reato e dei relativi carichi pendenti, o la qualità di imputato o di indagato ai sensi degli articoli 60 e 61 del codice di procedura penale.
          </p>
          
          <p><strong>Conservazione e cancellazione dei dati</strong><br>
          Le informazioni e i dati personali degli utilizzatori raccolti, ivi inclusi i dati liberamente forniti al fine di ottenere informazioni sui servizi
          e per usufruire del supporto tecnico, saranno conservati al solo fine di fornire il servizio richiesto e per la durata necessaria al
          medesimo fine. Una volta completato il servizio, tutti i dati personali saranno distrutti in aderenza alle policy in materia di
          conservazione dei dati di LOEX Srl, salvo diversa richiesta dell’autorità e salvo esigenze di conservazione stabilite dalla legge o
          secondo sue esplicite richieste.
          </p>

          <p><strong>Esercizio dei diritti dell’interessato</strong><br>
          In qualsiasi momento, ai sensi dell'art. 15 e seguenti del Regolamento Europeo GDPR 679/2016, sarà possibile verificare i propri
          dati personali raccolti attraverso questo sito ed eventualmente farli correggere, aggiornare o cancellare, o esercitare gli altri diritti
          riconosciuti per legge, scrivendo o contattando il titolare del trattamento al seguente indirizzo.
          </p>

          <p><strong>Sicurezza dei dati</strong><br>
          Vengono applicate le misure di sicurezza tecniche e organizzative necessarie per proteggere i dati personali dalla perdita e dall'uso
          improprio. LOEX Srl protegge i dati personali attraverso l’applicazione di livelli di sicurezza riconosciuti a livello internazionale, nonché
          attraverso procedure di sicurezza che proteggono I dati personali contro:
          <ul>
            <li>L’accesso non autorizzato</li>
            <li>L’utilizzo improprio o la divulgazione</li>
            <li>La modifica non autorizzata</li>
            <li>La perdita o la distruzione accidentale o causata da atto illecito</li>
          </ul></p>

          <p><strong>Utilizzo specifico dei dati personali</strong><br>
          Riportiamo di seguito i dati che vengono raccolti per poter fornire il servizio di gestione remota e per analizzare il funzionamento del
          sistema di regolazione LOEX Xsmart:
          <ul>
            <li>Indirizzo IP pubblico di accesso del sistema di regolazione</li>
            <li>Nome identificativo dell’impianto inserito nel momento di attivazione del servizio</li>
            <li>Indirizzo MAC del dispositivo collegato</li>
            <li>Credenziali di accesso al sistema di regolazione</li>
            <li>Versione software e hardware del sistema di regolazione</li>
          </ul></p>

          <f7-list>  
            <f7-list-button title="Consento" color="blue" @click="accept()"></f7-list-button>
          </f7-list>
        </f7-block>

        <f7-block v-if="$i18n.locale==='de'">
          <h2>Datenschutzerklärung</h2>

          <p><strong>Allgemeine Angaben</strong><br>
          LOEX GmbH hat die vorliegenden Internet-Datenschutzrichtlinien ausgearbeitet, um dem Besucher der Website als
          vertrauenswürdiger Partner, der das persönliche Recht auf Vertraulichkeit respektiert und gewährleistet, entgegenzutreten.<br>
          Im Sinne des DSGVO 2016/679 ist Morelli Alberto Rechtsinhaber der Verwaltung bzw. Verarbeitung der personenbezogenen Daten,
          die eventuell über die Website erhoben werden. Der Rechtsinhaber verwaltet bzw. verarbeitet diese über die Website (xsmart.loex.it)
          eventuell erhobenen Daten unter den im Folgenden genannten Bedingungen.</p>

          <p><strong>Art der Datenerhebung und Zweck der Verarbeitung</strong><br>
          LOEX GmbH verarbeitet ausschließlich Daten, die der Besucher der Website aus freien Stücken angibt. Das Navigieren auf der
          Website ist auch ohne Angabe personenbezogener Daten und Informationen möglich. Jedem Besucher steht es frei, LOEX GmbH
          eingeschränkt personenbezogene Daten zur Verfügung zu stellen, um nur bestimmte Dienstleistungen in Anspruch zu nehmen.
          Erhobene und gespeicherte personenbezogene Daten werden ausschließlich für die im verfügbaren Informationsschreiben
          genannten Dienstleistungen verwendet<br>
          Die Besucher der Website können ihre Daten übermitteln, um:
          <ul>
            <li>Informationen zu Dienstleistungen und technischer Unterstützung einzuholen</li>
          </ul></p>

          <p><strong>Weitergabe der Daten an Dritte</strong><br>
          Die personenbezogenen Daten werden nicht an andere Unternehmen weitergegeben. Zudem werden die personenbezogenen Daten
          weitergegeben, falls dies gesetzliche Bestimmungen vorsehen oder die Gerichtsbehörde oder andere Körperschaften und Institute
          es einfordern. LOEX GmbH bezweckt nicht, über die eigene Website sensible oder gerichtlich relevante personenbezogene Daten
          zu erheben. Im Sinne des Art. 4 des DSGVO 2016/679 handelt es sich bei sensiblen Daten um persönliche Angaben zum Geschlecht,
          zur ethnischen Herkunft, zu religiösen, philosophischen oder anderweitigen Anschauungen, zur politischen Einstellung, zur
          Mitgliedschaft in Parteien, Gewerkschaften, Vereinen oder Organisationen mit religiösem, philosophischem, politischem oder
          gewerkschaftlichem Hintergrund sowie um Angaben zum Gesundheitszustand oder zur sexuellen Orientierung. Im Sinne des Art. 4
          des DSGVO 2016/679 umfassen gerichtlich relevante Daten jene persönlichen Angaben, die auf Maßnahmen basierend auf Art. 3,
          Absatz 1, Buchstaben von a) bis o) und von r) bis u), des D.P.R. Nr. 313 vom 14. November 2002 zum Strafregister, dem Register
          der Verwaltungsstrafen infolge strafbarer Handlungen oder der diesbezüglich anhängenden Verfahren, oder auf die Stellung als
          Angeklagter oder Verdächtigter im Sinne der Artikel 60 und 61 der Strafprozessordnung schließen lassen.
          </p>
          
          <p><strong>Aufbewahrung und Löschung der Daten</strong><br>
          Die über diese Website erhobenen Informationen und personenbezogenen Daten, inklusive jener, die der Besucher zum Erhalt von
          Informationen zu Dienstleistungen und technischer Unterstützung freiwillig angibt, werden ausschließlich zur Erbringung der
          gewünschten Leistung und nur für den dafür unbedingt nötigen Zeitraum aufbewahrt. Nach Erbringung der Dienstleistung werden
          alle personenbezogenen Daten gemäß Datenschutzerklärung LOEX GmbH, vorbehaltlich anders lautender behördlicher
          Aufforderungen oder der gesetzlich geforderten Aufbewahrung, gelöscht.
          </p>

          <p><strong>Ausübung zustehender Rechte</strong><br>
          Der Dateninhaber hat laut Art. 15 des DSGVO 2016/679 zu jeder Zeit das Recht, Auskunft zum Inhalt seiner personenbezogenen,
          über diese Website erhobenen Daten zu erhalten, diese eventuell richtig stellen, aktualisieren oder löschen zu lassen oder andere
          Rechte, die ihm gesetzlich zuerkannt sind, geltend zu machen. Dazu ist es notwendig, den Verantwortlichen für die Datenverarbeitung
          oder den Datenschutzbeauftragten über die E-Mail zu kontaktieren.
          </p>

          <p><strong>Datensicherheit</strong><br>
          Alle notwendigen technischen und organisatorischen Sicherheitsmaßnahmen, um die personenbezogenen Daten vor Verlust und
          Missbrauch zu schützen, werden von LOEX GmbH getroffen. LOEX GmbH schützt die personenbezogenen Daten über international
          anerkannte Sicherheitsstandards sowie über Verfahren, die
          <ul>
            <li>den unbefugten Zugriff</li>
            <li>die unerlaubte Benutzung und Verbreitung</li>
            <li>die unerlaubte Änderung</li>
            <li>den Verlust sowie unbeabsichtigtes oder rechtswidriges Zerstören unmöglich machen</li>
          </ul></p>

          <p><strong>Spezifische Verwendung der personenbezogenen Daten</strong><br>
          Im Folgenden werden die Daten angegeben, welche für die Nutzung der Fernsteuerung und für die Analyse der Regelung LOEX
          Xsmart gesammelt werden:
          <ul>
            <li>Öffentliche IP Adresse der Regelung</li>
            <li>Identifikationsname der Anlage</li>
            <li>MAC Adresse des angeschlossenen Geräts</li>
            <li>Zugangsdaten der Regelung</li>
            <li>Erfasste Temperaturen, Einstellungen und Nutzungszeiten der Regelung</li>
          </ul></p>

          <f7-list>  
            <f7-list-button title="Zustimmen" color="blue" @click="accept()"></f7-list-button>
          </f7-list>
        </f7-block>

      </f7-page>
    </f7-view>
  </f7-login-screen>
</template>
<script>
  export default {
    methods:{
      accept(){
        localStorage.setItem('privacy', true);
        this.$f7.loginScreen.close('#privacy');
      }
    },
    mounted() {
      this.$f7.loginScreen.open('#privacy');
    }
  }
</script>
<style scoped>
  .block{
    text-align: justify;
    font-size: 0.8em;
  }
  ul{
    margin-top: 0;
    padding-left: 15px;
  }

</style>

