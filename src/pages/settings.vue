<template>
  <f7-page v-if="$f7.data.id" name="settings">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-nav-title>{{ $t('message.settings') }}</f7-nav-title>      
      <f7-nav-right v-if="$f7.data.input.t12000">
        <f7-link icon-ios="material:notifications" icon-aurora="material:notifications" icon-md="material:notifications" panel-open="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-row>
      <f7-col width="100" small="50" medium="33" large="25">

        <f7-list no-hairlines-md>
          <f7-list-item :header="$t('message.name_plant')" :title="$f7.data.units[$f7.data.id].plant"></f7-list-item>
          <f7-list-item :header="$t('message.id_code')" :title="$f7.data.input.t16620" popup-open="#set-access-data" @click="setAccessData()" link="#">
            <f7-icon f7="lock_shield"></f7-icon>
          </f7-list-item>
        </f7-list>

        <f7-block>
          <f7-row>
            <f7-button class="col-50" @click="deleteID({ remove: $t('message.remove'), cancel: $t('message.cancel') })" raised>{{ $t('message.remove') }}</f7-button>
            <f7-button class="col-50" login-screen-open="#xsmart-login" raised>{{ $t('message.edit') }}</f7-button>
          </f7-row>
        </f7-block>

        <f7-list no-hairlines-md>
          <f7-row>
            <f7-col>
              <f7-list-item header="Software" :title="$f7.data.input.t08960" :footer="$f7.data.input.t08975+'.'+$f7.data.input.t08976" style="list-style:none"></f7-list-item>
            </f7-col>
            <f7-col>
              <f7-list-item header="Unit ID" :title="$f7.data.input.t16601" style="list-style:none">
                <img src="static/img/Xsmart28.png" style="height:34px" />                  
              </f7-list-item> 
            </f7-col>
          </f7-row>
        </f7-list>

        <!-- <f7-list no-hairlines-md>    
          <f7-list-item title="Developer options">
            <f7-toggle 
              :checked="$f7.data.dev"
              @change="$f7.data.dev = $event.target.checked"
            ></f7-toggle>
          </f7-list-item>
        </f7-list> -->

      </f7-col>
    </f7-row>

    <!-- Popup -->
    <f7-popup id="set-access-data">
      <f7-view>
        <f7-page name="set-access-data">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.access_data') }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>

          <f7-block>
            <f7-list no-hairlines-md>
              <f7-list-input
                :label="$t('message.username')"
                type="text"
                :value="username"
                @input="username = $event.target.value"
                @focus="$event.target.select()"
                maxlength="16"
              ></f7-list-input>
              <f7-list-input
                :label="$t('message.password')"
                :type="pwType"
                :value="password"
                @input="password = $event.target.value"
                @focus="$event.target.select()"
                maxlength="16"
              ></f7-list-input>
              <!-- <i class="icon f7-icons" style="margin-top:-40px; margin-right:16px; float:right;" @click="(pwType==='password') ? pwType = 'text' : pwType = 'password'">eye_fill</i> -->
            </f7-list>
          </f7-block>

          <f7-block style="margin:0 auto; width:80%">
            <f7-button large raised fill round popup-close @click="writeAccessData()">OK</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

  </f7-page>
</template>

<script>
  export default {
    data: function () {
      return {
        username: '',
        password: '',
        pwType: 'password',
      };
    },
    methods: {
      deleteID(message){
        clearInterval(window.$f7.data.polling);
        $f7.params.dialog.buttonCancel = message.cancel;
        $f7.dialog.confirm( message.remove+'?', '<strong>'+$f7.data.units[$f7.data.id].plant+'</strong><br><small>'+$f7.data.id+'</small>', function(){
          delete($f7.data.units[$f7.data.id]);
          localStorage.setItem('units', JSON.stringify($f7.data.units));
          localStorage.removeItem('unit_id');
          window.location = self.location;
          }, function(){
            $f7.dialog.close();
            $f7.methods.pollData();
          }
        )        
      },
      setAccessData(){
        this.username = $f7.data.input.t20101;
        this.password = $f7.data.input.t20109;
      },
      writeAccessData(){
        $f7.methods.writeData('t20101='+this.username+'&20109='+this.password+'&08970=0');
      }
    },
  };
</script>