<template>
  <f7-app :params="f7params" >

  <!-- Left panel with cover effect-->
  <f7-panel left cover theme-dark swipe visibleBreakpoint="1200">
    <f7-view>
    <f7-page name="panel left">
      <f7-block style="margin-bottom:0px">
        <img src="static/icons/128x128.png" style="width:64px; border-radius:0%"/>
      </f7-block>
      <f7-block-footer style="margin-top:0px; font-size:0.8em">
        Version {{ version }}<br>  
      </f7-block-footer>

      <f7-block v-for="(item, key) in plants" :key="key">
        <f7-block-title medium>{{ key }}</f7-block-title>
          <f7-list>
            <f7-list-item 
              v-for="(item, index) in units"
              :key="index"
              v-if="item.plant === key"
              link="#" 
              :title="item.title"
              :footer="$f7.data.dev ? item.id : ''"
              panel-close="left" 
              @click="setId(item.id)"
              :class="{ 'unit-active': item.id === unit_id }"
            ></f7-list-item> 
          </f7-list>
        </f7-block>

        <f7-block>
          <f7-list>
            <f7-list-button title="Login" panel-close="left" login-screen-open="#xsmart-login" @click="addId()">
              <f7-icon ios="f7:plus_circle" aurora="f7:plus_circle" md="material:add"></f7-icon>
            </f7-list-button>
            <!-- <f7-list-button title="Install" panel-close="left" @click="installApp()"></f7-list-button> -->
          </f7-list>
        </f7-block>        


        <f7-block style="width:60%">  
          <f7-segmented>
            <f7-button @click="setLanguage('it')" :fill="$i18n.locale==='it'" style="background:none">IT</f7-button>
            <f7-button @click="setLanguage('de')" :fill="$i18n.locale==='de'" style="background:none">DE</f7-button>
            <f7-button @click="setLanguage('en')" :fill="$i18n.locale==='en'" style="background:none">EN</f7-button>
          </f7-segmented>
        </f7-block>
      </f7-page>
    </f7-view>  
  </f7-panel>

  <!-- Right panel -->
  <f7-panel right cover theme-dark swipe>
    <f7-view url="/panel-right/"></f7-view>
  </f7-panel>


  <!-- Views/Tabs container -->
  <f7-views tabs class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <f7-toolbar tabbar labels bottom >
      <f7-link tab-link="#view-home" tab-link-active icon-ios="f7:house_fill" icon-aurora="f7:house_fill" icon-md="material:home" :text="$t('message.home')"></f7-link>
      <f7-link tab-link="#view-zones" icon-ios="f7:rectangle_stack" icon-aurora="f7:rectangle_stack" icon-md="f7:rectangle_stack" :text="$t('message.zones')"></f7-link>
      <f7-link tab-link="#view-settings" icon-ios="f7:gear_alt_fill" icon-aurora="f7:gear_alt_fill" icon-md="material:settings" :text="$t('message.settings')"></f7-link>
    </f7-toolbar>

    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view id="view-home" main view-main view-init tab tab-active url="/"></f7-view>

    <!-- Zones View -->
    <f7-view id="view-zones" name="zones" tab url="/zones/"></f7-view>

    <!-- Settings View -->
    <f7-view id="view-settings" name="settings" tab url="/settings/"></f7-view>

  </f7-views>


  <!-- Popup -->
  <f7-login-screen id="xsmart-login">
    <f7-view>
      <f7-page name="login-screen" login-screen>

        <f7-block style="text-align:center; margin-bottom:0px">
          <img src="static/icons/256x256.png" style="width:128px; border-radius:0%"/>
        </f7-block>
        <f7-block-footer style="margin:0 auto; font-size:0.8em">
          Version {{ version }}<br>  
        </f7-block-footer>

        <f7-list form style="width:280px">
          <f7-list-input
            :label="$t('message.name_plant')"
            type="text"
            name="plant"
            maxlength="18"
            :value="plant"
            @input="plant = $event.target.value"
            inputStyle="text-align:center; font-size:1.2em"
          ></f7-list-input>
          <f7-list-input
            :label="$t('message.id_code')"
            type="text"
            name="unit_id"
            placeholder="bb000000"
            maxlength="8"
            pattern="^[b]{2}[0-9,a-f]{6}$"
            :value="unit_id"
            @input="unit_id = $event.target.value"
            inputStyle="text-align:center; font-size:1.2em"
            :disabled="disable"
          ></f7-list-input>
          <f7-list-button :title="$t('message.connect')" @click="loginData()" color="blue" style="margin-top:10px"></f7-list-button>
        </f7-list>

      </f7-page>
    </f7-view>
  </f7-login-screen>


  </f7-app>
</template>
<script>
  import routes from '../js/routes.js';
  import input from '../js/input.js';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          name: 'Xsmart', // App name
          theme: 'auto', // Automatic theme detection
          version: '0.8.0',

          iosTranslucentBars: false,
          iosTranslucentModals: false,

          // App root data
          data: function () {
            return {
              id: '',
              units: {},
              input: input,
              dev: false,

              polling: null,
              selectedToolbar: 3,
            };
          },

          // App routes
          routes: routes,

          // Register service worker
          serviceWorker: {
            path: './service-worker.js',
            scope: '/www28/',
          },

          // Event handlers
          on: {
            init: function () {
              console.log('App initialized');
            },
            pageInit: function (event) {
              // console.log('Page initialized:', event.name);
            },

            online: function () {
              console.log('connection established');
              this.methods.pollData();
              this.dialog.preloader();
            },
            offline: function () {
              console.log('lost connection');
              clearInterval(this.data.polling);
              this.data.input.t10042 = 2;
            },

            popupOpened: function () {
              // console.log('popup opened');
              clearInterval(this.data.polling);
            },
            popupClosed: function (evt) {
              // console.log('popup closed');
              if (!(evt.el.id).includes('set2')) {
                this.methods.pollData();
              }
            },
          },

          methods:{
            pollData() {
              this.data.polling = setInterval(function() {
                this.request({
                  url: '/static/web/'+this.data.id+'/input.json',
                  url: '/'+this.data.id+'/input.json',
                  headers: { "authorization" : this.data.units[this.data.id].token },
                  success(data) {
                    window.$f7.data.input = JSON.parse(data);
                    window.$f7.methods.setTabbar();
                    window.$f7.methods.setUnits();
                  },
                  complete() {
                    window.$f7.dialog.close();
                  },
                  error(xhr) {
                    window.$f7.dialog.alert(xhr.statusText, 'error ' + xhr.status);
                    console.log(xhr.status, xhr.statusText);
                    clearInterval(window.$f7.data.polling);
                  },
                });
              }.bind(this), 3000);
            },
            writeData(data) {
              data = data.slice(1);
              console.log(data);
              clearInterval(this.data.polling);
              this.dialog.preloader('Write data...');

              this.request({
                method: 'POST',
                url: '/'+$f7.data.id+'/output.json',
                contentType: 'text/plain',
                data: data,
                error(xhr) {
                  console.log(xhr.responseText);
                },
              });              
              // window.$f7.methods.pollData();
            },

            setTabbar(){
              if (this.data.input.t16607>0 || this.data.input.t16608>1){
                if (this.data.selectedToolbar == 2){
                  this.$('.tab-link')[1].remove();
                  this.$('.toolbar-inner')[0].append(this.tabZones);
                  this.$('.toolbar-inner')[0].append(this.tabSettings);
                  this.$('.tab-link')[1].click(); this.$('.tab-link')[0].click();
                  this.data.selectedToolbar = 3;
                }
              } 
              else {  
                if (this.data.selectedToolbar == 3){
                  this.tabZones = this.$('.tab-link')[1];
                  this.tabSettings = this.$('.tab-link')[2];
                  this.$('.tab-link')[1].remove();
                  this.$('.tab-link')[1].click(); this.$('.tab-link')[0].click();
                  this.data.selectedToolbar = 2;
                }
              }
            },
            setUnits(){
              if (this.data.units[this.data.id].title !== this.data.input.t20001){
                this.data.units[this.data.id].title = this.data.input.t20001;
                localStorage.setItem('units', JSON.stringify(this.data.units));
              }
            },

          },
       
        },
         
        // Login screen data
        unit_id: '',
        unit_title: '',
        plant: 'My Home',
        disable: true,

        // Panel left data
        version: '',
        units: {},
        plants: {},

        // Tabbar
        tabZones: '',
        tabSettings: '',
      }
    },
    methods: {
      setLanguage(lang) {
        this.$i18n.locale = lang;
        localStorage.setItem('lang', lang);
      },
      loginData() {
        this.$f7.data.units[this.unit_id] = { "id" : this.unit_id, "title" : this.unit_id, "plant" : this.plant, "token" : "" };
        this.$f7.data.id = this.unit_id;

        this.$f7.request({
          // url: '/static/web/jwt.txt',
          url: '/jwt?id='+this.unit_id+'&plant='+this.plant,

          statusCode: {
            401: function (xhr) {
              alert(xhr.status+": "+xhr.statusText);
              
              navigator.serviceWorker.getRegistrations().then(
                  function(registrations) {
                      for(let registration of registrations) {  
                          registration.unregister();
                          console.log('Unregister Serviceworker');
                          window.location.reload();
                      }
                  }
              );
            },
            404: function (xhr) {
              alert(xhr.status+": "+xhr.statusText);
              window.location = self.location.origin + self.location.pathname;
            },
            200: function (xhr) {
              window.$f7.data.units[window.$f7.data.id].token = xhr.response;
              localStorage.setItem('units', JSON.stringify(window.$f7.data.units));
              localStorage.setItem('unit_id', window.$f7.data.id);
              window.location = self.location.origin + self.location.pathname;
            },
          },          
          
        });
        
      },

      setId(id) {
        clearInterval(window.$f7.data.polling);

        this.$f7.views['main'].router.back();
        this.$f7.views['zones'].router.back();
        
        this.$f7.data.input = input;
        this.$f7.methods.pollData();
        this.$f7.dialog.preloader();
        this.$f7.data.id = id;
        this.unit_id = id;
        this.disable = true;
        this.plant = this.units[id].plant;
        localStorage.setItem('unit_id', id);
      },
      addId() {
        clearInterval(window.$f7.data.polling);
        this.unit_id = '';
        this.disable = false;
      },

      stopPolling() {
        clearInterval(this.$f7.data.polling);
      },
      startPolling() {
        this.$f7.methods.pollData();
      },
    },

    mounted() {
      this.$f7ready((f7) => {
        console.log('Component mounted');

        let params = new URLSearchParams(location.search);
        let id = params.get('id');

        // Panel left data
        this.version = f7.version;
        
        // Set languages
        if (localStorage.getItem('lang')){
          this.$i18n.locale = localStorage.getItem('lang');
        } else {
          let lang = f7.language.substring(0, 2);
          if (lang==='it' || lang==='de'){
            this.$i18n.locale = lang;
          }
        }
        
        if (localStorage.getItem('privacy') !== 'true'){
          setTimeout(() => {
            f7.views.main.router.navigate('/privacy/');
            console.log('ok');
          }, 1000);       
        }

        // Get units 
        if (localStorage.getItem('units')){
          this.units = JSON.parse(localStorage.getItem('units'));
          f7.data.units = this.units;

          for (let key in this.units){
            if (!this.plants[this.units[key].plant])
              this.plants[this.units[key].plant] = this.units[key].id;
            else
              this.plants[this.units[key].plant] += ', ' + this.units[key].id;

            if (id === this.units[key].id){
              id = '';
              localStorage.setItem('unit_id', key);
            }
            else if (!localStorage.getItem('unit_id')){
              localStorage.setItem('unit_id', key);
            }   
          }
        }

        // Set id
        if (id){
          this.unit_id = id;
          this.disable = false;
          f7.loginScreen.open('#xsmart-login');
        }
        else if (localStorage.getItem('unit_id')){
          f7.data.id = localStorage.getItem('unit_id');
          f7.methods.pollData();
          f7.dialog.preloader();
          this.unit_id = f7.data.id;
          this.plant = this.units[f7.data.id].plant;
        } else {
          this.disable = false;
          f7.loginScreen.open('#xsmart-login');
        }
            
        // Call F7 APIs here
        window.$f7 = f7;
      });
    }
  }
</script>