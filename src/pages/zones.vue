<template>
  <f7-page v-if="$f7.data.id" name="zones">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-nav-title>{{ $f7.data.input.t20001 }}</f7-nav-title>      
      <f7-nav-right v-if="$f7.data.input.t12000">
        <f7-link icon-ios="material:notifications" icon-aurora="material:notifications" icon-md="material:notifications" panel-open="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block style="margin-top: 12px">
      <f7-row no-gap style="justify-content: left;">
        <f7-col width="100" small="50" medium="33" large="25" v-for="n in rooms" :key="n" v-if="room(n-1,$f7.data.input).type>0"> 
          <!-- v-if="room(n-1,$f7.data.input).type>0" -->

            <f7-card class="demo-card-header-pic card">              
              <f7-card-header v-bind:class="'no-border radial-gradient'+(room(n-1,$f7.data.input).gradient)" valign="bottom"> <!-- v-bind:style="{ backgroundImage: 'radial-Gradient(ellipse at bottom, #005fff, purple '+room(n-1,$f7.data.input).output/2+'%, red)' }"> -->
                <f7-icon v-if="room(n-1,$f7.data.input).error>0" f7="exclamationmark_triangle"></f7-icon>   
                <span v-if="$f7.data.dev">{{ n+10 }} ({{ room(n-1,$f7.data.input).output }}%)</span>

                <span v-bind:class="'icon-symbol'+room(n-1,$f7.data.input).symbol" style="position:absolute; bottom:15px; left:20px; font-size: 2.8em"></span>
                <span class="temp" style="position:absolute; top:5px; right:20px; font-size: 2.8em">{{ room(n-1,$f7.data.input).temp }}</span>               
                <span v-if="room(n-1,$f7.data.input).type>5" class="humi" style="position:absolute; top:60px; right:20px; font-size: 1.5em">{{ room(n-1,$f7.data.input).humidity }}</span>

                <f7-progressbar v-if="room(n-1,$f7.data.input).gradient == 0" color="red" :progress="room(n-1,$f7.data.input).output" style="position:absolute; bottom:0px; left: 0px"></f7-progressbar>
                <f7-progressbar v-else-if="room(n-1,$f7.data.input).gradient == 1" color="blue" :progress="room(n-1,$f7.data.input).output" style="position:absolute; bottom:0px; left: 0px"></f7-progressbar>
                <f7-progressbar v-else :progress="room(n-1,$f7.data.input).output" style="position:absolute; bottom:0px; left: 0px"></f7-progressbar>

              </f7-card-header>
              <f7-card-content>
                <h2 class="clkAction" @click="setName(n)" @taphold="setName(n)">{{ room(n-1-(n>8)*2-(n>18)*2-(n>28)*2,$f7.data.input).name }}</h2>
                <span class="set temp" style="font-size:1.5em">{{ room(n-1,$f7.data.input).set }}</span>

                <span style="float:right; font-size:2em" v-bind:class="icon(room(n-1,$f7.data.input).mode)"></span>
                <span v-if="room(n-1,$f7.data.input).mode === 0" class="clkAction" @click="setScheduleNr(n)" style="float:right; font-size:1.5em; margin-right:5px">{{ room(n-1,$f7.data.input).schedule }}</span>
              </f7-card-content>
              <f7-card-footer>
                <f7-link v-if="room(n-1,$f7.data.input).type>5" popup-open="#set-value-room" @click="setIndex(n)">{{ $t('message.set') }}</f7-link>
                <f7-link v-if="room(n-1,$f7.data.input).type<6"></f7-link>
                <f7-link v-if="room(n-1,$f7.data.input).mode===0" popup-open="#set-schedule-room" @click="setIndex(n)">{{ $t('message.schedule') }}</f7-link>
                <!-- <f7-link v-if="room(n-1,$f7.data.input).mode===0" :href="'/schedule/'+room(n-1,$f7.data.input).schedule+'/'" style="text-align:center">{{ $t('message.schedule') }}</f7-link> -->
                <f7-link v-if="room(n-1,$f7.data.input).type<6"></f7-link>
                <f7-link v-if="room(n-1,$f7.data.input).type>5" popup-open="#set-mode-room" @click="setIndex(n)">{{ $t('message.mode') }}</f7-link>
              </f7-card-footer>
            </f7-card>

        </f7-col>
      </f7-row>
    </f7-block>

    <!-- Popup -->
    <f7-popup id="set-value-room">
      <f7-view>
        <f7-page name="set-value-room">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.set') }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>
          
          <f7-block-title large style="text-align:center">{{ room(n-1-(n>8)*2-(n>16)*2-(n>24)*2,$f7.data.input).name }}</f7-block-title>
          <f7-block style="text-align:center; font-size:5em;">
              <span class="temp">{{ (setv+corr/10).toFixed(1) }}</span>
          </f7-block>

          <f7-block style="margin:0 auto; width:80%">  
            <f7-range :min="-40" :max="40" :step="5" :value="corr" @range:change="setRangeValue"></f7-range>
          </f7-block>

          <f7-block style="margin:20px auto; width:90%">
            <f7-row tag="p">
              <f7-col tag="span">
                <f7-button large raised round @click="setValue(-5)"><span class="icon-minus"></span></f7-button>
              </f7-col>
              <f7-col tag="span">
                <f7-button large raised round @click="setValue(5)"><span class="icon-plus"></span></f7-button>
              </f7-col>
            </f7-row>            
          </f7-block>

          <f7-block style="margin:0 auto; width:80%">
            <f7-button large raised fill round popup-close @click="writeValue(n)">OK</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-popup id="set-schedule-room" class="schedule">
      <f7-view>
        <f7-page name="set-schedule-room">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.schedule') }} {{ room(n-1,$f7.data.input).schedule }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>
          
          <f7-block style="margin:20px auto; width:80%">

            <f7-row v-for="n in 6" :key="n" @click="openPopup(n)" style="margin-bottom:5px; height:32px; cursor:pointer">
              <f7-block-title style="margin:0 0 5px">{{ $t("message.dows["+n+"]") }}</f7-block-title>
              <f7-range class="sched1 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true" 
                :value="[ tsc[n][0]/100, tsc[n][1]/100 ]" :disabled="true">
              </f7-range>
              <f7-range class="sched2 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true" 
                :value="[ tsc[n][2]/100, tsc[n][3]/100 ]" :disabled="true">
              </f7-range>
              <f7-range class="sched3 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true"
                :value="[ tsc[n][4]/100, tsc[n][5]/100 ]" :disabled="true">
              </f7-range>
            </f7-row>

            <f7-row @click="openPopup(7)" style="height:32px; cursor:pointer">
              <f7-block-title style="margin:0 0 5px">{{ $t("message.dows[7]") }}</f7-block-title>
              <f7-range class="sched1 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true" :scale="true" :scale-steps="4" :scale-sub-steps="0" 
                :value="[ tsc[0][0]/100, tsc[0][1]/100 ]" :disabled="true">
              </f7-range>
              <f7-range class="sched2 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true" 
                :value="[ tsc[0][2]/100, tsc[0][3]/100 ]" :disabled="true">
              </f7-range>
              <f7-range class="sched3 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true"
                :value="[ tsc[0][4]/100, tsc[0][5]/100 ]" :disabled="true">
              </f7-range>
            </f7-row>

          </f7-block>  

          <f7-block style="margin:40px auto; width:80%">
            <f7-button large raised fill round popup-close @click="writeSchedule(n)">OK</f7-button>
          </f7-block>

        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-popup id="set2-schedule-room" class="schedule">
      <f7-view>
        <f7-page name="set2-schedule-room">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.schedule') }} {{ room(n-1,$f7.data.input).schedule }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close="#set2-schedule-room"  @click="$forceUpdate()"><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>
         
          <f7-block style="margin-top: 12px; padding: 5px 10%; background:white">

            <f7-row>
              <f7-col>
                <f7-list no-hairlines-md>
                  <f7-list-input type="text" outline floating-label label="on" placeholder="0:00"
                    :value="parseInt(on1/100)+(on1%100 ? ':30' : ':00')" @blur="on1 = ($event.target.value).replace(':','')" @focus="$event.target.select(),ts1=false; ts2=true; ts3=true">
                  </f7-list-input>
                </f7-list>
              </f7-col>
              <f7-col>
                <f7-list no-hairlines-md>
                  <f7-list-input type="text" outline floating-label label="off" placeholder="0:00" 
                    :value="parseInt(off1/100)+(off1%100 ? ':30' : ':00')" @blur="off1 = ($event.target.value).replace(':','')" @focus="$event.target.select(),ts1=false; ts2=true; ts3=true">
                  </f7-list-input>
                </f7-list>
              </f7-col>
            </f7-row>

            <f7-row>
              <f7-col>
                <f7-list no-hairlines-md>
                  <f7-list-input type="text" outline floating-label label="on" placeholder="0:00" 
                    :value="parseInt(on2/100)+(on2%100 ? ':30' : ':00')" @blur="on2 = ($event.target.value).replace(':','')" @focus="$event.target.select(),ts1=true; ts2=false; ts3=true">
                  </f7-list-input>
                </f7-list>
              </f7-col>
              <f7-col>
                <f7-list no-hairlines-md>
                  <f7-list-input type="text" outline floating-label label="off" placeholder="0:00" 
                    :value="parseInt(off2/100)+(off2%100 ? ':30' : ':00')" @blur="off2 = ($event.target.value).replace(':','')" @focus="$event.target.select(),ts1=true; ts2=false; ts3=true">
                  </f7-list-input>
                </f7-list>
              </f7-col>
            </f7-row>

            <f7-row>
              <f7-col>
                <f7-list no-hairlines-md>
                  <f7-list-input type="text" outline floating-label label="on" placeholder="0:00" 
                    :value="parseInt(on3/100)+(on3%100 ? ':30' : ':00')" @blur="on3 = ($event.target.value).replace(':','')" @focus="$event.target.select(),ts1=true; ts2=true; ts3=false">
                  </f7-list-input>
                </f7-list>
              </f7-col>
              <f7-col>
                <f7-list no-hairlines-md>
                  <f7-list-input type="text" outline floating-label label="off" placeholder="0:00" 
                    :value="parseInt(off3/100)+(off3%100 ? ':30' : ':00')" @blur="off3 = ($event.target.value).replace(':','')" @focus="$event.target.select(),ts1=true; ts2=true; ts3=false">
                  </f7-list-input>
                </f7-list>
              </f7-col>
            </f7-row>

          </f7-block>


          <f7-block style="margin:20px auto; width:80%">

            <f7-row>
              <f7-range class="sched1 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true" :scale="true" :scale-steps="4" :scale-sub-steps="0" 
                :value="[on1/100, off1/100]" @range:change="onRangeChange1" :disabled="ts1">
              </f7-range>
              <f7-range class="sched2 color-blue"
                :min="0" :max="24" :step="0.5" :dual="true"
                :value="[on2/100, off2/100]" @range:change="onRangeChange2" :disabled="ts2">
              </f7-range>
              <f7-range class="sched3 color-blue"
                :min="0" :max="24" :step="0.5" :dual="true"
                :value="[on3/100, off3/100]" @range:change="onRangeChange3" :disabled="ts3">
              </f7-range>
            </f7-row>

          </f7-block>

          <f7-block style="text-align:center; margin:30px auto">
            <span v-for="n in 7" :key="n" style="margin:9px">
              <f7-checkbox name="checkbox" :value="n" :checked="SelectDays[n]" @change="checkDay">{{ $t("message.dows["+n+"]") }}</f7-checkbox>
              <!-- <f7-radio name="radio" :value="n" :checked="SelectDays[n]" @change="checkDay">{{ $t("message.dows["+n+"]") }}</f7-radio> -->
            </span>
          </f7-block>

          <f7-block style="margin:20px auto; width:80%">
            <f7-button large raised fill round @click="setSchedule()">OK</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-popup id="set-schedule-nr-room">
      <f7-view>
        <f7-page name="set-schedule-nr-room">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.schedule') }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>

          <f7-block-title large style="text-align:center">{{ room(n-1-(n>8)*2-(n>16)*2-(n>24)*2,$f7.data.input).name }}</f7-block-title>
          <f7-block>
            <f7-list>
              <f7-list-item color="blue" radio :title="$t('message.schedule')+ ' 1'" name="schednrroom" value="1" :checked="schedule === 1" @change="schedule = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio :title="$t('message.schedule')+ ' 2'" name="schednrroom" value="2" :checked="schedule === 2" @change="schedule = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio :title="$t('message.schedule')+ ' 3'" name="schednrroom" value="3" :checked="schedule === 3" @change="schedule = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio :title="$t('message.schedule')+ ' 4'" name="schednrroom" value="4" :checked="schedule === 4" @change="schedule = $event.target.value"></f7-list-item>
            </f7-list>
          </f7-block>

          <f7-block style="margin:0 auto; width:80%">
            <f7-button large raised fill round popup-close @click="writeScheduleNr(n)">OK</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>


    <f7-popup id="set-mode-room">
      <f7-view>
        <f7-page name="set-mode-room">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.mode') }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>

          <f7-block-title large style="text-align:center">{{ room(n-1-(n>8)*2-(n>16)*2-(n>24)*2,$f7.data.input).name }}</f7-block-title>
          <f7-block>
            <f7-list>
              <f7-list-item color="blue" radio title="AUTO" name="mode2" value="0" :checked="mode === 0" @change="mode = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio title="COMFORT" name="mode2" value="1" :checked="mode === 1" @change="mode = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio title="ECO" name="mode2" value="2" :checked="mode === 2" @change="mode = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio title="OFF" name="mode2" value="3" :checked="mode === 3" @change="mode = $event.target.value"></f7-list-item>
            </f7-list>
          </f7-block>

          <f7-block style="margin:0 auto; width:80%">
            <f7-button large raised fill round popup-close @click="writeMode(n)">OK</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-popup id="set-name-room">
      <f7-view>
        <f7-page name="set-name-room">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.description') }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>

          <f7-list inset>
            <f7-list-input
              type="text"
              :value="name"
              @input="name = $event.target.value"
              @focus="$event.target.select()"
              inputStyle="text-align:center; font-size:36px; height:44px; padding-bottom:6px"
              maxlength="12"
              size="80px"
            >
            </f7-list-input>
          </f7-list>

          <f7-block style="margin: 0 auto; margin-top:40px; width:90%">
            <f7-row>
              <f7-col v-for="n in 5" :key="n">
                <f7-button large raised round style="width:48px; font-size:24px" :fill="symbol === n" @click="changeSymbol(n)"> 
                  <span :class="'icon-symbol'+n"></span>
                </f7-button>
              </f7-col>
            </f7-row>
          </f7-block>
          <f7-block style="margin: 10px auto; width:90%">
            <f7-row>
              <f7-col v-for="n in 5" :key="n">
                <f7-button large raised round style="width:48px; font-size:24px" :fill="symbol === n+5" @click="changeSymbol(n+5)"> 
                  <span :class="'icon-symbol'+(n+5)"></span>
                </f7-button>
              </f7-col>
            </f7-row>
          </f7-block>
          <f7-block style="margin: 0 auto; margin-bottom:40px; width:90%">
            <f7-row>
              <f7-col v-for="n in 5" :key="n">
                <f7-button large raised round style="width:48px; font-size:24px" :fill="symbol === n+10" @click="changeSymbol(n+10)"> 
                  <span :class="'icon-symbol'+(n+10)"></span>
                </f7-button>
              </f7-col>
            </f7-row>
          </f7-block>    

          <f7-block style="margin:0 auto; width:80%">
            <f7-button large raised fill round popup-close @click="writeName(n)">OK</f7-button>
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
        n: 0, setv: 0, corr: 0, mode: 0, name: "", symbol: 0, schedule: 1,
        
        day: 1, SelectDays: [], 
        tsc: { 
          "0": [0,0,0,0,0,0],
          "1": [0,0,0,0,0,0],
          "2": [0,0,0,0,0,0],
          "3": [0,0,0,0,0,0],
          "4": [0,0,0,0,0,0],
          "5": [0,0,0,0,0,0],
          "6": [0,0,0,0,0,0],
        },        
        on1: "", off1: "", on2: "", off2: "", on3: "", off3: "",
        ts1: true, ts2: true, ts3: true,
        
        rooms:[1,2,3,4,5,6,7,8,11,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28,31,32,33,34,35,36,37,38],
        
        room: function(n){
          return {
            name: $f7.data.input['t'+(20201+n*7)],
            type: $f7.data.input['t'+(11021+n*10)],
            temp: ($f7.data.input['t'+(11022+n*10)]/10).toFixed(1),
            set: ($f7.data.input['t'+(11023+n*10)]/10).toFixed(1),
            error: $f7.data.input['t'+(11024+n*10)],
            output: $f7.data.input['t'+(11025+n*10)],
            mode: $f7.data.input['t'+(11026+n*10)],
            humidity: ($f7.data.input['t'+(11027+n*10)]/10).toFixed(1),
            corr: $f7.data.input['t'+(17621+n*10)],
            symbol: $f7.data.input['t'+(17624+n*10)],
            schedule: $f7.data.input['t'+(17623+n*10)],
            gradient: $f7.data.input.t10042*1*(1+((($f7.data.input['t'+(17625+n*10)])===0) || (($f7.data.input['t'+(11026+n*10)])===3)*1)),
          }
        },
        icon: function(mode){
          let icon;
          switch (mode) {
            case 0: icon = "icon-clock"; break;
            case 1: icon = "icon-sun"; break;
            case 2: icon = "icon-moon"; break;
            case 3: icon = "icon-off"; break;
          }
          return icon
        },

      };
    },
    methods: {
      setIndex(n) {
        this.n = n;
        this.corr = this.room(n-1,$f7.data.input).corr;
        this.setv = this.room(n-1,$f7.data.input).set-this.corr/10;
        this.mode = this.room(n-1,$f7.data.input).mode;
        let j = (this.room(n-1,$f7.data.input).schedule-1)*42;
        for (let i = 0; i <= 6; i++) {  
          this.tsc[i][0] = $f7.data.input['t'+(19001+i*6+j)];
          this.tsc[i][1] = $f7.data.input['t'+(19002+i*6+j)];
          this.tsc[i][2] = $f7.data.input['t'+(19003+i*6+j)];
          this.tsc[i][3] = $f7.data.input['t'+(19004+i*6+j)];
          this.tsc[i][4] = $f7.data.input['t'+(19005+i*6+j)];
          this.tsc[i][5] = $f7.data.input['t'+(19006+i*6+j)];        
        }
        this.schedule = this.room(n-1,$f7.data.input).schedule;
      },
      setValue(corr){
        if ((corr>0 && this.corr<40) || (corr<0 && this.corr>-40)){
          this.corr = this.corr+corr;
        }
      },
      setRangeValue(corr){
        this.corr = corr;
      },
      writeValue(n){
        $f7.methods.writeData('t'+(17621+(n-1)*10)+'='+this.corr);  
      },
      writeMode(n){
        $f7.methods.writeData('t'+(17622+(n-1)*10)+'='+this.mode);
      },
      setName(n){
        this.n = n;
        this.name = this.room(n-1-(n>8)*2-(n>18)*2-(n>28)*2,$f7.data.input).name;
        this.symbol = this.room(n-1,$f7.data.input).symbol;
        $f7.popup.open("#set-name-room");
      },
      changeSymbol(n){
        if (n === this.symbol){
          this.symbol = 0;
        }else{
          this.symbol = n;
        }
      },
      writeName(n){
        this.name = (this.name+"            ").slice(0,11);
        $f7.methods.writeData('t'+(20201+(n-1-(n>8)*2-(n>18)*2-(n>28)*2)*7)+'='+this.name+'&'+(17624+(n-1)*10)+'='+this.symbol);
      },

      // schedule
      onRangeChange1(values) {
        this.on1 = values[0]*100;
        this.off1 = values[1]*100;
      },
      onRangeChange2(values) {
        this.on2 = values[0]*100;
        this.off2 = values[1]*100;
      },
      onRangeChange3(values) {
        this.on3 = values[0]*100;
        this.off3 = values[1]*100;
      },
      changeSchedule(n){
        this.schedule = n;
      },
      openPopup(n){
        for (let i = 1; i <= 7; i++) {
          if (i === n)
            this.SelectDays[i] = true;
          else
            this.SelectDays[i] = false;
        }
        this.day = n;
        
        if (n==7) n=0;
        this.on1 = this.tsc[n][0]; this.off1 = this.tsc[n][1];
        this.on2 = this.tsc[n][2]; this.off2 = this.tsc[n][3];
        this.on3 = this.tsc[n][4]; this.off3 = this.tsc[n][5];

        this.$forceUpdate();
        $f7.popup.open('#set2-schedule-room');
      },
      checkDay(){
        // console.log(event.target.value + ' = ' + event.target.checked);
        this.SelectDays[event.target.value] = event.target.checked;
        this.day = event.target.value;
      },
      setSchedule(){
        for (let i = 1; i <= 7; i++) {
          let n = i;
          if (this.SelectDays[i]) {            
            if (n==7) n=0;
            this.tsc[n][0] = parseInt(this.on1); this.tsc[n][1] = parseInt(this.off1);
            this.tsc[n][2] = parseInt(this.on2); this.tsc[n][3] = parseInt(this.off2);
            this.tsc[n][4] = parseInt(this.on3); this.tsc[n][5] = parseInt(this.off3);
          }
        }
        this.$forceUpdate();
        $f7.popup.close('#set2-schedule-room');
      },
      writeSchedule(n){
        let data = '';        
        let j = (this.room(n-1,$f7.data.input).schedule-1)*42;
        for (let i = 0; i <= 6; i++) {
          if (i<1) 
            data += 't';
          for (let k = 0; k < 6; k++) {
            data += (19001+k+i*6+j)+'='+this.tsc[i][k];
          if (i<6 || k<5) 
            data +='&';
          }      
        }
        $f7.methods.writeData(data);
      },
      setScheduleNr(n){
        if (this.room(n-1,$f7.data.input).type>5){
          this.setIndex(n);
          $f7.popup.open("#set-schedule-nr-room");
        }
        else {
          clearInterval($f7.data.polling);
          $f7.dialog.alert(this.$t('dialog.schedule'), '', function () {
            $f7.methods.pollData();
          });
        }
      },
      writeScheduleNr(n){
        $f7.methods.writeData('t'+(17623+(n-1)*10)+'='+this.schedule);
      },
    },      
  };


</script>
